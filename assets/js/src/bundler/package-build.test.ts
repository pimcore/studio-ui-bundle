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
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'

const assetsDir = path.resolve(__dirname, '..', '..', '..')
const packageJson = JSON.parse(fs.readFileSync(path.join(assetsDir, 'package.json'), 'utf8')) as {
  dependencies: Record<string, string>
}
const packageLock = JSON.parse(fs.readFileSync(path.join(assetsDir, 'package-lock.json'), 'utf8')) as {
  packages: Record<string, { version?: string }>
}

// adm-zip < 0.6.1 is affected by several high-severity advisories (memory allocation DoS,
// SUID/SGID preservation, unhandled DEFLATE error). 0.6.1 is the first release that fixes all of them.
const MINIMUM_SAFE_ADM_ZIP = [0, 6, 1]

const parseVersion = (version: string): number[] => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
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

const isSafeVersion = (version: string): boolean => isAtLeast(parseVersion(version), MINIMUM_SAFE_ADM_ZIP)

// Only a single exact, caret or tilde version is accepted: for those (and only those) forms the stated
// version is the lowest one the range allows. Disjunctions ("^0.6.1 || ^0.5.16"), comparators (">=0.5.0"),
// hyphen ranges and wildcards can allow older releases, so they are rejected instead of being half-parsed.
const isSafeRange = (range: string): boolean => {
  const match = /^[\^~]?(\d+\.\d+\.\d+)$/.exec(range.trim())

  return match !== null && isSafeVersion(match[1])
}

// Version of adm-zip that Node would load for a module located in `fromDir`
const resolveAdmZipVersion = (fromDir: string): string => {
  const manifest = createRequire(path.join(fromDir, 'noop.js')).resolve('adm-zip/package.json')

  return (JSON.parse(fs.readFileSync(manifest, 'utf8')) as { version: string }).version
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

describe('adm-zip range check', () => {
  it.each(['^0.6.1', '~0.6.1', '0.6.1', ' ^0.6.1 ', '^0.6.2', '^0.7.0', '^1.0.0'])(
    'accepts the range "%s"',
    (range) => {
      expect(isSafeRange(range)).toBe(true)
    }
  )

  it.each([
    '^0.5.16',
    '^0.6.0',
    '~0.6.0',
    '0.5.18',
    '^0.6.1 || ^0.5.16',
    '^0.5.16 || ^0.6.1',
    '>=0.5.0',
    '>=0.6.1 <0.7.0',
    '0.5.0 - 0.6.1',
    '0.x',
    '*',
    'latest',
    ''
  ])('rejects the range "%s"', (range) => {
    expect(isSafeRange(range)).toBe(false)
  })
})

describe('adm-zip dependency', () => {
  it('declares a range that only allows versions containing the security fixes', () => {
    const declared = packageJson.dependencies['adm-zip']

    expect(declared).toBeDefined()
    expect(isSafeRange(declared)).toBe(true)
  })

  it('resolves to an installed version that contains the security fixes', () => {
    expect(isSafeVersion(resolveAdmZipVersion(assetsDir))).toBe(true)
  })

  it('resolves to the fixed version for @module-federation/dts-plugin as well', () => {
    // dts-plugin depends on adm-zip ^0.5.10; the "overrides" entry makes it share the fixed copy. Without it
    // npm installs a second, vulnerable adm-zip below the plugin.
    const dtsPluginDir = path.join(assetsDir, 'node_modules', '@module-federation', 'dts-plugin')

    expect(fs.existsSync(dtsPluginDir)).toBe(true)
    expect(isSafeVersion(resolveAdmZipVersion(dtsPluginDir))).toBe(true)
  })

  it('locks every adm-zip copy to a version that contains the security fixes', () => {
    const copies = Object.entries(packageLock.packages).filter(
      ([location]) => location === 'node_modules/adm-zip' || location.endsWith('/node_modules/adm-zip')
    )

    expect(copies.length).toBeGreaterThan(0)
    copies.forEach(([location, entry]) => {
      expect({ location, safe: isSafeVersion(entry.version ?? '') }).toEqual({ location, safe: true })
    })
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
