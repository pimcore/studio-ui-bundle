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
const { spawnSync } = require('node:child_process')
const { inspectModal, checkState, checkTooltip, isForbiddenClick, consoleErrorMessage } = require('./assertions.cjs')

const switchHtml = (on: boolean): string =>
  `<div><button role="switch" aria-checked="${on}"></button><span>Preview mode</span></div>`

const modal = (html: string): HTMLElement => {
  const root = document.createElement('div')
  root.innerHTML = html
  return root
}

const barHtml = '<div><button>Preview item</button><span>ID: 9 │ .../ jaguar/ E-Type</span></div>'
const rowHtml = '<div data-testid="preview-mode-column-preview-row">Preview</div>'
const language = '<div class="language-select"></div>'

const off = modal(switchHtml(false) + language)
const on = modal(switchHtml(true) + language + barHtml + rowHtml + rowHtml)

describe('preview-mode live check assertions', () => {
  it('AC1: preview off passes with language switch, off switch, no bar and no rows', () => {
    expect(checkState(inspectModal(off), { previewOn: false })).toEqual([])
  })

  it('AC1: preview on passes with bar, ID, short path and Preview rows', () => {
    const state = inspectModal(on)
    expect(state).toMatchObject({ bar: true, barId: '9', rows: 2, previewOn: true })
    expect(checkState(state, { previewOn: true })).toEqual([])
  })

  it('AC1: red case: bar and rows with preview off, and no rows with preview on, are reported', () => {
    const leaking = checkState(inspectModal(modal(switchHtml(false) + language + barHtml + rowHtml)), { previewOn: false })
    expect(leaking).toEqual(expect.arrayContaining([expect.stringContaining('bar'), expect.stringContaining('Preview row')]))
    const empty = checkState(inspectModal(modal(switchHtml(true) + language + barHtml)), { previewOn: true })
    expect(empty).toEqual(['no Preview row shows with preview mode on'])
  })

  it('AC1: red case: a missing language switch and a wrong switch state are reported', () => {
    const problems = checkState(inspectModal(modal(switchHtml(true) + rowHtml + barHtml)), { previewOn: false })
    expect(problems).toEqual(expect.arrayContaining(['language switch is missing', expect.stringContaining('expected off')]))
  })

  it('AC1: the tooltip must hold the full path that the short path ends', () => {
    const state = inspectModal(on)
    expect(checkTooltip('/cars/jaguar/E-Type', state)).toEqual([])
    expect(checkTooltip('/cars/bmw/M3', state)).toHaveLength(1)
    expect(checkTooltip(null, state)).toHaveLength(1)
  })

  it('AC2: Save, Apply and Confirm buttons are never clicked', () => {
    expect(isForbiddenClick('Save')).toBe(true)
    expect(isForbiddenClick(' Apply changes')).toBe(true)
    expect(isForbiddenClick('Confirm migration')).toBe(true)
    expect(isForbiddenClick('Preview item')).toBe(false)
  })

  it('AC3: any JS console error fails the run, a clean console passes', () => {
    expect(consoleErrorMessage([])).toBeNull()
    expect(consoleErrorMessage(['JS error: x', 'JS error: x', 'console.error: y'])).toBe('JS error: x | console.error: y')
  })

  it('AC2: a machine without Chromium exits 1 naming the step', () => {
    const result = spawnSync(process.execPath, [`${__dirname}/run.mjs`, '/tmp/preview-mode-no-chromium'], {
      env: { PATH: '/nonexistent' },
      encoding: 'utf8'
    })

    expect(result.status).toBe(1)
    expect(result.stdout).toContain('FAIL at step "start": chromium is missing')
  })
})
