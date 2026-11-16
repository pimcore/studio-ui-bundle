/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { classificationStoreFilterSlots, filterSlotId } from './classification-store-filter-slots'

const STORE_COLUMN_KEY = 'cs'

const column: AvailableColumn = {
  key: STORE_COLUMN_KEY,
  group: ['Structured Data'],
  sortable: false,
  editable: false,
  localizable: false,
  locale: null,
  type: 'dataobject.classificationstore',
  frontendType: 'classificationstore',
  config: []
}

const variantKey = (overrides: object = {}): Record<string, any> => ({
  id: 100,
  name: 'Test Variants',
  groupId: 3,
  variants: [{ name: 'Metric', label: 'Metric' }, { name: 'Imperial', label: 'Imperial' }],
  definition: { fieldtype: 'multiValue', title: 'Test Variants', delegateDatatype: 'input' },
  ...overrides
})

const variantsOf = (item: Record<string, any>): Array<string | null> =>
  classificationStoreFilterSlots(column, item).map((filter) => filter.config?.variant ?? null)

describe('classificationStoreFilterSlots', () => {
  it('offers one filter per declared variant in declaration order, then the default slot', () => {
    expect(variantsOf(variantKey())).toEqual(['Metric', 'Imperial', null])
  })

  // The key writes no default entry, so a filter on that slot could never match anything.
  it('leaves out the default slot of a key that declines the unqualified value', () => {
    expect(variantsOf(variantKey({ defaultVariant: false }))).toEqual(['Metric', 'Imperial'])
  })

  // a blob that merely omits the field type resolves to no members, and must not read as a key that permits it
  it('leaves out the default slot the layout declines when the definition blob is not recognisably multiValue', () => {
    const item = variantKey({ defaultVariant: false, definition: { title: 'Test Variants', delegateDatatype: 'input' } })

    expect(variantsOf(item)).toEqual(['Metric', 'Imperial'])
  })

  // the layout member where published, else what the definition blob declares, as the editor reads it
  it('leaves out the default slot of a key whose definition declines the unqualified value', () => {
    const definition = { fieldtype: 'multiValue', title: 'Test Variants', delegateDatatype: 'input', unqualifiedValue: false }

    expect(variantsOf(variantKey({ definition }))).toEqual(['Metric', 'Imperial'])
    expect(variantsOf(variantKey({ definition, defaultVariant: true }))).toEqual(['Metric', 'Imperial', null])
  })

  it('offers a key without variants a single filter on its default slot', () => {
    expect(variantsOf({ id: 6, name: 'rimMaterial', groupId: 3, definition: { fieldtype: 'select', title: 'rimMaterial' } }))
      .toEqual([null])
  })

  it('names the variant in the label of the row and in the meta it is restored from', () => {
    const [metric, , bare] = classificationStoreFilterSlots(column, variantKey())

    expect(metric.translationKey).toBe('Test Variants (Metric)')
    expect(metric.config?.translationKey).toBe('Test Variants (Metric)')
    expect(bare.translationKey).toBe('Test Variants')
  })

  // The layout publishes the declaration; a definition blob that omits it must not collapse the slots.
  it('expands a key whose definition blob omits the variants the layout publishes', () => {
    expect(variantsOf(variantKey({ definition: { fieldtype: 'multiValue', title: 'Test Variants', delegateDatatype: 'input' } })))
      .toEqual(['Metric', 'Imperial', null])
  })

  it('tells the slots of one key apart and a slot of another key from them', () => {
    const [metric, imperial, bare] = classificationStoreFilterSlots(column, variantKey())
    const [other] = classificationStoreFilterSlots(column, variantKey({ id: 101 }))

    expect(new Set([metric, imperial, bare, other].map(filterSlotId)).size).toBe(4)
  })
})
