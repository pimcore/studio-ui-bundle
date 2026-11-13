/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildColumnPickerGroups, type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { keyAddressOf, variantColumnSuffix, variantOfCellKey, variantOfColumn, variantSlotsOf, withoutVariantSuffix } from './variant-column'

const definition = { title: 'color_title', variants: [{ name: 'Metric', label: 'Metric system' }, { name: 'Imperial' }] }
const columnOf = (variant?: string): AvailableColumn => ({
  key: 'attributes',
  type: 'dataobject.classificationstore',
  group: ['Attributes'],
  sortable: false,
  editable: true,
  localizable: false,
  config: { keyId: 12, groupId: 3, fieldDefinition: definition, ...(variant === undefined ? {} : { variant }) }
})

describe('variant column helpers', () => {
  it('reads the variant off a cell key at its first #, and off a column config', () => {
    expect(variantOfCellKey('attributes.color#Metric')).toBe('Metric')
    expect(variantOfCellKey('attributes.color')).toBeNull()
    expect(withoutVariantSuffix('attributes.color#Metric')).toBe('attributes.color')
    expect(withoutVariantSuffix('attributes.color')).toBe('attributes.color')
    expect(variantOfColumn(columnOf('Metric'))).toBe('Metric')
    expect(variantOfColumn(columnOf())).toBeNull()
  })

  it('suffixes the key address with the variant, and leaves the default slot bare', () => {
    expect(keyAddressOf(12, 'Metric')).toBe('12#Metric')
    expect(keyAddressOf(12, null)).toBe('12')
  })

  it('lists the declared variants in order, then the default slot, and no slot for a nameless row', () => {
    expect(variantSlotsOf([{ name: 'Metric' }, { name: '' }, { name: 'Imperial' }])).toEqual([{ name: 'Metric' }, { name: 'Imperial' }, null])
    expect(variantSlotsOf(null)).toEqual([null])
  })

  describe('display name', () => {
    it('appends the variant label, falling back to the variant name, and leaves the default slot unchanged', () => {
      expect(variantColumnSuffix(columnOf('Metric'))).toBe(' (Metric system)')
      expect(variantColumnSuffix(columnOf('Imperial'))).toBe(' (Imperial)')
      expect(variantColumnSuffix(columnOf())).toBe('')
    })

    it('labels the entries of the column picker the same way', () => {
      const labels = buildColumnPickerGroups([columnOf('Metric'), columnOf('Imperial'), columnOf()], (key) => key)
        .flatMap((group) => group.items.map((item) => item.label))

      expect(labels).toEqual(['color_title (Metric system)', 'color_title (Imperial)', 'color_title'])
    })
  })
})
