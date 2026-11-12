/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildMap, isTitleKey, rowErrors, toRows } from './pairs'
import { toTitleKey, toTitleLocale, type PairView } from './pairs'

const titles: PairView = {
  includes: isTitleKey,
  toDisplayKey: toTitleLocale,
  toStoredKey: toTitleKey,
  keyLabel: 'k',
  valueLabel: 'v',
  duplicateMessage: 'd'
}

const generic: PairView = {
  includes: (key) => !isTitleKey(key),
  toDisplayKey: (key) => key,
  toStoredKey: (key) => key,
  keyLabel: 'k',
  valueLabel: 'v',
  duplicateMessage: 'd'
}

describe('pairs', () => {
  it('keeps the stored order when one view saves', () => {
    const original = { 'localized_internal_title.de': 'Höhe', externalCode: 'EF1' }
    const rows = toRows(original, titles)
    rows[0].value = 'Hoehe'

    expect(Object.keys(buildMap(rows, original, titles)!)).toEqual(['localized_internal_title.de', 'externalCode'])
    expect(buildMap([...rows, { key: 'en', value: 'Height', readOnly: false }], original, titles))
      .toEqual({ 'localized_internal_title.de': 'Hoehe', externalCode: 'EF1', 'localized_internal_title.en': 'Height' })
  })

  it('leaves the other view\'s members untouched and in order when either view saves', () => {
    const obj = { x: 1 }
    const original = { externalCode: 'EF1', 'localized_internal_title.de': 'Höhe', obj }
    const genericRows = toRows(original, generic)
    genericRows[0].value = 'EF2'
    const viaGeneric = buildMap(genericRows, original, generic)!

    expect(Object.keys(viaGeneric)).toEqual(['externalCode', 'localized_internal_title.de', 'obj'])
    expect(viaGeneric['localized_internal_title.de']).toBe('Höhe')
    expect(viaGeneric.obj).toBe(obj)

    const titleRows = toRows(original, titles)
    titleRows[0].value = 'Hoehe'
    const viaTitles = buildMap(titleRows, original, titles)!

    expect(Object.keys(viaTitles)).toEqual(['externalCode', 'localized_internal_title.de', 'obj'])
    expect(viaTitles.externalCode).toBe('EF1')
    expect(viaTitles.obj).toBe(obj)
    expect(viaTitles['localized_internal_title.de']).toBe('Hoehe')
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
