/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
export {} // a module, so these requires do not clash with the other test files' globals
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const runMjs = `${__dirname}/run.mjs`

// Preloaded into the child: files named chromium* in the fixed folders look absent, so the run behaves like a machine without Chromium.
const hideChromium = (dir: string): string => {
  const file = path.join(dir, 'hide-chromium.cjs')
  fs.writeFileSync(file, `
    const fs = require('node:fs')
    const hidden = (p) => /^\\/(usr\\/bin|usr\\/local\\/bin|snap\\/bin)\\/chromium/.test(String(p))
    const exists = fs.existsSync
    fs.existsSync = (p) => !hidden(p) && exists(p)
    const stat = fs.statSync
    fs.statSync = (p, ...rest) => { if (hidden(p)) throw new Error('ENOENT'); return stat(p, ...rest) }
    require('node:module').syncBuiltinESMExports()
  `)
  return file
}

const run = (args: string[], env: Record<string, string>, preload?: string): { status: number, stdout: string } =>
  spawnSync(process.execPath, [...(preload ? ['--require', preload] : []), runMjs, ...args], {
    env: { PATH: '/nonexistent', ...env },
    encoding: 'utf8'
  })

describe('preview-mode live check run.mjs paths', () => {
  let work: string
  beforeEach(() => { work = fs.mkdtempSync(path.join(os.tmpdir(), 'run-paths-test-')) })
  afterEach(() => { fs.rmSync(work, { recursive: true, force: true }) })

  it('AC1: without an out-dir the run writes into a new mkdtemp folder under os.tmpdir()', () => {
    const fake = path.join(work, 'fake-chromium')
    fs.writeFileSync(fake, '#!/bin/sh\nexit 0\n', { mode: 0o755 })
    const tmp = path.join(work, 'tmp')
    fs.mkdirSync(tmp)

    const result = run([], { TMPDIR: tmp, CHROMIUM_BIN: fake })
    const folder: string = /^out-dir: (.+)$/m.exec(result.stdout)![1]

    expect(result.status).toBe(1)
    expect(path.dirname(folder)).toBe(tmp)
    expect(path.basename(folder)).toMatch(/^preview-mode-live-.{6}$/)
    expect(fs.existsSync(folder)).toBe(true)
  }, 30000)

  it('AC2: an out-dir outside os.tmpdir() and the current folder exits 1 naming it and writes nothing', () => {
    const tmp = path.join(work, 'tmp')
    const cwd = path.join(work, 'cwd')
    fs.mkdirSync(tmp)
    fs.mkdirSync(cwd)
    const outside = path.join(os.homedir(), 'run-paths-outside-out')
    fs.rmSync(outside, { recursive: true, force: true })

    const result = spawnSync(process.execPath, [runMjs, outside], {
      env: { PATH: '/nonexistent', TMPDIR: tmp },
      cwd,
      encoding: 'utf8'
    })

    expect(result.status).toBe(1)
    expect(result.stdout).toContain(outside)
    expect(fs.existsSync(outside)).toBe(false)
    expect(fs.readdirSync(tmp)).toEqual([])
  })

  it('AC2: a relative out-dir that climbs out of the current folder is refused', () => {
    const tmp = path.join(work, 'tmp')
    const cwd = path.join(work, 'cwd')
    fs.mkdirSync(tmp)
    fs.mkdirSync(cwd)
    const result = spawnSync(process.execPath, [runMjs, '../../../../../../../../../../../../etc/run-paths'], {
      env: { PATH: '/nonexistent', TMPDIR: tmp },
      cwd: os.homedir(),
      encoding: 'utf8'
    })

    expect(result.status).toBe(1)
    expect(result.stdout).toContain('/etc/run-paths')
    expect(fs.existsSync('/etc/run-paths')).toBe(false)
  })

  it('AC3: a CHROMIUM_BIN that is no absolute existing file and no Chromium in the fixed folders exits 1 without PATH', () => {
    const preload = hideChromium(work)
    const bin = path.join(work, 'bin')
    fs.mkdirSync(bin)
    fs.writeFileSync(path.join(bin, 'chromium'), '#!/bin/sh\nexit 0\n', { mode: 0o755 })

    for (const given of ['/nonexistent/chromium', 'chromium', '']) {
      const result = spawnSync(process.execPath, ['--require', preload, runMjs, path.join(work, 'shots')], {
        env: { PATH: bin, CHROMIUM_BIN: given },
        encoding: 'utf8'
      })

      expect(result.status).toBe(1)
      expect(result.stdout).toContain('FAIL at step "start": chromium is missing')
    }
    expect(fs.existsSync(path.join(work, 'shots'))).toBe(false)
  })
})
