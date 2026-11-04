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
export {} // a module, so this require does not clash with the other test files' globals
const { parseBarPath, checkState } = require('./assertions.cjs')

describe('assertions.cjs parseBarPath', () => {
  it('AC1: returns the trimmed text after the first │', () => {
    expect(parseBarPath('ID: 9 │ .../ jaguar/ E-Type')).toBe('.../ jaguar/ E-Type')
    expect(parseBarPath('ID: 9 │   a/ b   ')).toBe('a/ b')
    expect(parseBarPath('a│b│c')).toBe('b│c')
  })

  it('AC1: returns null without │ or with nothing after it, as the old regex did', () => {
    expect(parseBarPath('ID: 9')).toBeNull()
    expect(parseBarPath('')).toBeNull()
    expect(parseBarPath('ID: 9 │')).toBeNull()
    expect(parseBarPath('ID: 9 │ ')).toBe('')
  })

  it('AC2: returns within 50 ms on a 100 000-character line of spaces', () => {
    const start = performance.now()
    expect(parseBarPath('ID: 9 │' + ' '.repeat(100000))).toBe('')
    expect(parseBarPath(' '.repeat(100000))).toBeNull()
    expect(performance.now() - start).toBeLessThan(50)
  })

  it('AC3: checkState reports the switch, off and on problems together', () => {
    const none = { languageSwitch: false, previewSwitch: false, previewOn: false, bar: false, barId: null, barPath: null, rows: 0 }
    expect(checkState(none, { previewOn: false })).toEqual(['language switch is missing', '"Preview mode" switch is missing'])
    expect(checkState(none, { previewOn: true })).toEqual([
      'language switch is missing',
      '"Preview mode" switch is missing',
      'the bar with the "Preview item" button is missing',
      'no Preview row shows with preview mode on'
    ])
    expect(checkState({ ...none, bar: true, rows: 2 }, { previewOn: false })).toEqual([
      'language switch is missing',
      '"Preview mode" switch is missing',
      'the preview bar shows with preview mode off',
      '2 Preview row(s) show with preview mode off'
    ])
  })
})
