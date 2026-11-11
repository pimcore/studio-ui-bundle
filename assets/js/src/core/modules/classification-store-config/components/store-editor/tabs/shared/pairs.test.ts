/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildMap, rowErrors, toRows, type PairView } from './pairs'

const titles: PairView = {
  includes: (key) => key.startsWith('title.'),
  toDisplayKey: (key) => key.slice('title.'.length),
  toStoredKey: (key) => `title.${key}`,
  keyLabel: 'k',
  valueLabel: 'v',
  duplicateMessage: 'd'
}

const generic: PairView = {
  includes: () => true,
  toDisplayKey: (key) => key,
  toStoredKey: (key) => key,
  keyLabel: 'k',
  valueLabel: 'v',
  duplicateMessage: 'd'
}

describe('pairs', () => {
  it('keeps the stored order when one view saves', () => {
    const original = { 'title.de': 'Höhe', externalCode: 'EF1' }
    const rows = toRows(original, titles)
    rows[0].value = 'Hoehe'

    expect(Object.keys(buildMap(rows, original, titles)!)).toEqual(['title.de', 'externalCode'])
    expect(buildMap([...rows, { key: 'en', value: 'Height', readOnly: false }], original, titles))
      .toEqual({ 'title.de': 'Hoehe', externalCode: 'EF1', 'title.en': 'Height' })
  })

  it('lets a pair stored with an empty value stay empty but requires a value on a new one', () => {
    const original = { a: '', b: '1' }
    const rows = [...toRows(original, generic), { key: 'c', value: '', readOnly: false }]

    expect(rowErrors(rows, original, generic)).toEqual([{}, {}, { value: 'value-required' }])
  })

  it('requires a value once the user has touched a pair stored empty, even if they clear it back', () => {
    const original = { a: '' }
    const rows = toRows(original, generic)
    rows[0].touched = true

    expect(rowErrors(rows, original, generic)).toEqual([{ value: 'value-required' }])
  })
})
