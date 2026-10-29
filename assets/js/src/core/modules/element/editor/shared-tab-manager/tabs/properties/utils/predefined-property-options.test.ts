/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PredefinedProperty } from '../properties-api-slice.gen'
import { buildPredefinedPropertyOptions } from './predefined-property-options'

const createProperty = (id: string, name: string): PredefinedProperty => ({
  id,
  name,
  key: id,
  type: 'text',
  inheritable: false,
  inherited: false,
  config: null,
  predefinedName: null,
  description: null
} as unknown as PredefinedProperty)

const translations: Record<string, string> = {
  'predefined.property.nofollow': 'No follow',
  'predefined.property.canonical': 'Zanonical'
}

const translate = (key: string): string => translations[key] ?? key

describe('buildPredefinedPropertyOptions', () => {
  it('uses the translated name as option label', () => {
    const options = buildPredefinedPropertyOptions(
      [createProperty('1', 'predefined.property.nofollow')],
      translate
    )

    expect(options).toEqual([{ label: 'No follow', value: '1' }])
  })

  it('falls back to the raw name when no translation exists', () => {
    const options = buildPredefinedPropertyOptions([createProperty('1', 'navigation_title')], translate)

    expect(options).toEqual([{ label: 'navigation_title', value: '1' }])
  })

  it('sorts the options by their translated label', () => {
    const options = buildPredefinedPropertyOptions(
      [
        createProperty('1', 'predefined.property.canonical'),
        createProperty('2', 'predefined.property.nofollow'),
        createProperty('3', 'author')
      ],
      translate
    )

    expect(options?.map((option) => option.value)).toEqual(['3', '2', '1'])
  })

  it('returns undefined while no items are loaded', () => {
    expect(buildPredefinedPropertyOptions(undefined, translate)).toBeUndefined()
  })
})
