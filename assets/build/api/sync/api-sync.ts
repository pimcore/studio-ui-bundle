/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

/**
 * Per-slice API client sync tool.
 *
 *   npm run api:sync -- --schema <file|url> <slice…>   sync the named slices (default: all) from the
 *                                                      given source schema: write the snapshot and
 *                                                      regenerate the slice's client. The schema comes
 *                                                      from the backend export — locally via
 *                                                      pimcore:studio-api:generate-config-json, in CI
 *                                                      via the "Studio API Slice Sync" workflow.
 *   npm run api:check                                  committed .gen.ts == codegen(snapshot)?
 *                                                      exit 1 on drift
 *   npm run api:sync -- --check --schema <src> <slice…>  committed snapshot == source schema?
 *                                                      exit 1 on drift, nothing is written
 *   npm run api:sync -- --affected-by <file>           print the slices affected by the changed files
 *                                                      listed in <file> (one per line); prints '*' when
 *                                                      generator, config or lockfile changed
 *
 * Further flags: --diff (print a unified diff per failing slice), --fix (with --check and
 * no --schema: overwrite a drifted .gen.ts with codegen(snapshot)), --summary-json <file>.
 * Exit codes: 0 ok, 1 drift, 2 usage error (e.g. an unknown slice name).
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { generateEndpoints, parseConfig } from '@rtk-query/codegen-openapi'
import config from '../openapi-config'
import { apiSlices, schemaFileFor, type ApiSlice } from '../slices'
import { affectedSlices, coverageReport, snapshotContent, type OpenApiSpec } from './lib'

interface CliOptions {
  slices: ApiSlice[]
  schema: string | null
  check: boolean
  diff: boolean
  fix: boolean
  summaryJson: string | null
  affectedBy: string | null
}

interface SliceResult {
  slice: string
  status: 'ok' | 'drift' | 'synced'
}

const fail = (message: string, exitCode: number): never => {
  console.error(message)
  process.exit(exitCode)
}

const parseArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = { slices: [], schema: null, check: false, diff: false, fix: false, summaryJson: null, affectedBy: null }
  const names: string[] = []

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    switch (arg) {
      case '--schema':
        options.schema = argv[++i] ?? fail('--schema needs a value', 2)
        break
      case '--check':
        options.check = true
        break
      case '--diff':
        options.diff = true
        break
      case '--fix':
        options.fix = true
        break
      case '--summary-json':
        options.summaryJson = argv[++i] ?? fail('--summary-json needs a value', 2)
        break
      case '--affected-by':
        options.affectedBy = argv[++i] ?? fail('--affected-by needs a value', 2)
        break
      default:
        if (arg.startsWith('-')) {
          fail(`Unknown option: ${arg}`, 2)
        }
        names.push(arg)
    }
  }

  for (const name of names) {
    const slice = apiSlices.find((candidate) => candidate.name === name)
    if (slice === undefined) {
      fail(`Unknown slice: ${name}. Known slices: ${apiSlices.map((s) => s.name).join(', ')}`, 2)
    } else {
      options.slices.push(slice)
    }
  }
  if (options.slices.length === 0) {
    options.slices = [...apiSlices]
  }

  return options
}

const loadSchema = async (source: string): Promise<OpenApiSpec> => {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source)
    if (!response.ok) {
      fail(`Fetching ${source} failed: HTTP ${response.status}`, 2)
    }
    const body = await response.text()
    if (!body.trimStart().startsWith('{')) {
      fail(`${source} did not return JSON — refusing to continue (is it the Swagger UI HTML?)`, 2)
    }
    return JSON.parse(body) as OpenApiSpec
  }
  if (!fs.existsSync(source)) {
    fail(`Schema file not found: ${path.resolve(source)}`, 2)
  }
  return JSON.parse(fs.readFileSync(source, 'utf-8')) as OpenApiSpec
}

/**
 * Line-by-line difference report (positional, capped) — enough to see what
 * drifted without shelling out to an external diff tool.
 */
const printDiff = (expectedContent: string, actualPath: string, label: string): void => {
  const expected = expectedContent.split('\n')
  const actual = (fs.existsSync(actualPath) ? fs.readFileSync(actualPath, 'utf-8') : '').split('\n')
  const total = Math.max(expected.length, actual.length)
  let shown = 0
  for (let line = 0; line < total && shown < 20; line++) {
    if (expected[line] !== actual[line]) {
      console.error(`@ line ${line + 1}`)
      if (actual[line] !== undefined) {
        console.error(`- ${actual[line]}`)
      }
      if (expected[line] !== undefined) {
        console.error(`+ ${expected[line]}`)
      }
      shown++
    }
  }
  console.error(`^ ${label}${shown === 20 ? ' (differences truncated)' : ''}`)
}

const generationOptionsByOutputFile = (): Map<string, Parameters<typeof generateEndpoints>[0]> => {
  const map = new Map<string, Parameters<typeof generateEndpoints>[0]>()
  for (const options of parseConfig(config)) {
    map.set(options.outputFile, options)
  }
  return map
}

const reportCoverage = (spec: OpenApiSpec, isFullRun: boolean): void => {
  if (!isFullRun) {
    return
  }
  const report = coverageReport(spec, apiSlices)
  if (report.unassigned.length > 0) {
    console.warn(`${report.unassigned.length} operation(s) in the source schema belong to no slice (first: ${report.unassigned[0]})`)
  }
  for (const entry of report.multi) {
    console.warn(`Operation in more than one slice: ${entry.operation} -> ${entry.slices.join(', ')}`)
  }
}

/** snapshot == source schema? Nothing is written. */
const checkSnapshotsAgainstSchema = (spec: OpenApiSpec, options: CliOptions): SliceResult[] => {
  const results: SliceResult[] = []
  for (const slice of options.slices) {
    const expected = snapshotContent(spec, slice)
    const snapshotFile = schemaFileFor(slice)
    const actual = fs.existsSync(snapshotFile) ? fs.readFileSync(snapshotFile, 'utf-8') : ''
    if (expected === actual) {
      results.push({ slice: slice.name, status: 'ok' })
    } else {
      results.push({ slice: slice.name, status: 'drift' })
      console.error(`Drift against the source schema: ${slice.name}`)
      if (options.diff) {
        printDiff(expected, snapshotFile, `${slice.name}: committed snapshot vs. source schema`)
      }
    }
  }
  return results
}

/** committed .gen.ts == codegen(committed snapshot)? Nothing in the tree is written. */
const checkClientsAgainstSnapshots = async (options: CliOptions): Promise<SliceResult[]> => {
  const generationOptions = generationOptionsByOutputFile()
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'api-sync-check-'))
  const results: SliceResult[] = []

  // Sequential on purpose: generateEndpoints swaps the typescript entry in
  // require.cache around every call (enforceOazapftsTsVersion), so concurrent
  // runs would corrupt each other.
  for (const slice of options.slices) {
    const baseOptions = generationOptions.get(slice.outputFile)
    if (baseOptions === undefined) {
      fail(`Slice ${slice.name} has no entry in openapi-config.ts`, 2)
      continue
    }
    const tmpOutput = path.join(tmpDir, `${slice.name}.gen.ts`)
    await generateEndpoints({ ...baseOptions, outputFile: tmpOutput })
    const expected = fs.readFileSync(tmpOutput, 'utf-8')
    const actual = fs.existsSync(slice.outputFile) ? fs.readFileSync(slice.outputFile, 'utf-8') : ''
    if (expected === actual) {
      results.push({ slice: slice.name, status: 'ok' })
    } else {
      results.push({ slice: slice.name, status: 'drift' })
      console.error(`Generated client does not match its snapshot: ${slice.name} (${slice.outputFile})`)
      if (options.diff) {
        printDiff(expected, slice.outputFile, `${slice.name}: committed client vs. codegen(snapshot)`)
      }
      if (options.fix) {
        fs.copyFileSync(tmpOutput, slice.outputFile)
        console.error(`fixed: ${slice.outputFile} regenerated from its snapshot`)
      }
    }
  }

  return results
}

/** Write the snapshot and regenerate the client for each requested slice. */
const syncSlices = async (spec: OpenApiSpec, options: CliOptions): Promise<SliceResult[]> => {
  const generationOptions = generationOptionsByOutputFile()
  fs.mkdirSync('./schema', { recursive: true })
  const results: SliceResult[] = []

  // Sequential on purpose — see checkClientsAgainstSnapshots.
  for (const slice of options.slices) {
    const snapshotFile = schemaFileFor(slice)
    const content = snapshotContent(spec, slice)
    const previous = fs.existsSync(snapshotFile) ? fs.readFileSync(snapshotFile, 'utf-8') : null
    if (previous !== content) {
      fs.writeFileSync(snapshotFile, content)
    }

    const baseOptions = generationOptions.get(slice.outputFile)
    if (baseOptions === undefined) {
      fail(`Slice ${slice.name} has no entry in openapi-config.ts`, 2)
      continue
    }
    await generateEndpoints(baseOptions)

    results.push({ slice: slice.name, status: previous === content ? 'ok' : 'synced' })
    console.log(`${previous === content ? 'unchanged' : 'synced   '} ${slice.name}`)
  }

  return results
}

const main = async (): Promise<void> => {
  // The codegen CLI chdirs into the config file's directory before generating;
  // prettier config resolution and every relative path in openapi-config.ts
  // depend on it, so this tool runs from the same place.
  process.chdir(path.join(__dirname, '..'))

  const options = parseArgs(process.argv.slice(2))
  const startedAt = Date.now()

  if (options.affectedBy !== null) {
    if (!fs.existsSync(options.affectedBy)) {
      fail(`File not found: ${options.affectedBy}`, 2)
    }
    const changedFiles = fs.readFileSync(options.affectedBy, 'utf-8').split('\n').map((line) => line.trim()).filter((line) => line !== '')
    const affected = affectedSlices(changedFiles, apiSlices)
    console.log(affected === '*' ? '*' : affected.join('\n'))
    return
  }

  let results: SliceResult[]
  const isFullRun = options.slices.length === apiSlices.length

  if (options.check && options.schema === null) {
    results = await checkClientsAgainstSnapshots(options)
  } else {
    const schemaSource = options.schema ??
      fail('Syncing needs a source schema: pass --schema <file|url> (export it with pimcore:studio-api:generate-config-json, or use the "Studio API Slice Sync" workflow)', 2)
    const spec = await loadSchema(schemaSource)
    reportCoverage(spec, isFullRun)
    results = options.check
      ? checkSnapshotsAgainstSchema(spec, options)
      : await syncSlices(spec, options)
  }

  const drifted = results.filter((result) => result.status === 'drift')
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(2)

  if (options.summaryJson !== null) {
    fs.writeFileSync(options.summaryJson, `${JSON.stringify({ ok: drifted.length === 0, results }, null, 2)}\n`)
  }

  if (drifted.length > 0) {
    console.error(`Drift in ${drifted.length} of ${results.length} slice(s): ${drifted.map((result) => result.slice).join(', ')}`)
    process.exit(1)
  }
  console.log(`OK: ${results.length} slice(s) ${options.check ? 'up to date' : 'processed'} in ${elapsed} s`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
