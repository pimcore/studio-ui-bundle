/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const assetsDir = path.resolve(__dirname, '..', '..', '..')
const packageJson = JSON.parse(fs.readFileSync(path.join(assetsDir, 'package.json'), 'utf8')) as {
  dependencies: Record<string, string>
}

// adm-zip < 0.6.1 is affected by several high-severity advisories (memory allocation DoS,
// SUID/SGID preservation, unhandled DEFLATE error). 0.6.1 is the first release that fixes all of them.
const MINIMUM_SAFE_ADM_ZIP = [0, 6, 1]

const parseVersion = (version: string): number[] => {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(version)
  if (match === null) {
    throw new Error(`Cannot parse version "${version}"`)
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])]
}

const isAtLeast = (version: number[], minimum: number[]): boolean => {
  for (let i = 0; i < minimum.length; i++) {
    if (version[i] !== minimum[i]) {
      return version[i] > minimum[i]
    }
  }

  return true
}

interface ArchiveContents {
  names: string[]
  mainJs: string
  years: number[]
}

// The archive is read in a separate Node process: adm-zip returns empty buffers when it runs inside
// jest's jsdom environment (different Buffer/Uint8Array realm), which would hide real regressions.
const readArchive = (archive: string): ArchiveContents => {
  const script = `
    const AdmZip = require('adm-zip')
    const zip = new AdmZip(process.argv[1])
    const entries = zip.getEntries()
    process.stdout.write(JSON.stringify({
      names: entries.map((e) => e.entryName).sort(),
      mainJs: zip.readAsText('abc-app/main.js'),
      years: entries.map((e) => e.header.time.getUTCFullYear())
    }))
  `

  return JSON.parse(
    execFileSync(process.execPath, ['-e', script, archive], { cwd: assetsDir, encoding: 'utf8' })
  ) as ArchiveContents
}

describe('adm-zip dependency', () => {
  it('declares a range whose lowest allowed version contains the security fixes', () => {
    const declared = packageJson.dependencies['adm-zip']

    expect(declared).toBeDefined()
    expect(isAtLeast(parseVersion(declared), MINIMUM_SAFE_ADM_ZIP)).toBe(true)
  })

  it('resolves to an installed version that contains the security fixes', () => {
    const installed = JSON.parse(
      fs.readFileSync(path.join(assetsDir, 'node_modules', 'adm-zip', 'package.json'), 'utf8')
    ) as { version: string }

    expect(isAtLeast(parseVersion(installed.version), MINIMUM_SAFE_ADM_ZIP)).toBe(true)
  })
})

describe('studio-package-build', () => {
  let workDir: string

  beforeEach(() => {
    workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'package-build-test-'))
  })

  afterEach(() => {
    fs.rmSync(workDir, { recursive: true, force: true })
  })

  it('packages a build into a readable archive with stable entry timestamps', () => {
    const buildDir = path.join(workDir, 'build')
    const outDir = path.join(workDir, 'dist')
    fs.mkdirSync(path.join(buildDir, 'abc-app', 'nested'), { recursive: true })
    fs.writeFileSync(path.join(buildDir, 'abc-app', '.build-id'), 'abc123')
    fs.writeFileSync(path.join(buildDir, 'abc-app', 'main.js'), 'console.log("app")')
    fs.writeFileSync(path.join(buildDir, 'abc-app', 'nested', 'chunk.js'), 'console.log("chunk")')
    fs.writeFileSync(path.join(buildDir, 'abc-app', 'studio-npm-package.tgz'), 'excluded')

    execFileSync(
      process.execPath,
      [path.join(assetsDir, 'bundler', 'package-build.cjs'), '--build-dir', buildDir, '--out-dir', outDir],
      { stdio: 'pipe' }
    )

    const archive = path.join(outDir, 'build-abc123.zip')
    expect(fs.existsSync(archive)).toBe(true)

    const contents = readArchive(archive)

    expect(contents.names).toEqual(['abc-app/.build-id', 'abc-app/main.js', 'abc-app/nested/chunk.js'])
    expect(contents.mainJs).toBe('console.log("app")')
    expect(contents.years).toEqual([2001, 2001, 2001])
  })
})
