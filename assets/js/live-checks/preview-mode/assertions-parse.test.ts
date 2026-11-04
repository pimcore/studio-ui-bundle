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
const { parseBarPath } = require('./assertions.cjs')

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
})
