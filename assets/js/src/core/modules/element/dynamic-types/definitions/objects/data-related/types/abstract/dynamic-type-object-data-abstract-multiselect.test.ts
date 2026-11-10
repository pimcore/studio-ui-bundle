/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('../../dynamic-type-object-data-abstract', () => ({
  DynamicTypeObjectDataAbstract: class DynamicTypeObjectDataAbstract {
    getGridCellEditComponent (): unknown {
      return 'super-grid-cell-edit-component'
    }
  }
}))

jest.mock('@Pimcore/components/select/select', () => ({
  Select: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/dynamic-select-field/dynamic-select-field', () => ({
  DynamicSelectField: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/hooks/use-dynamic-select-options', () => ({
  useGridDynamicSelectOptions: () => undefined
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options', () => ({
  convertSelectOptions: (options: Array<{ key: string, value: string | number }> | null | undefined) =>
    options?.map(option => ({ label: option.key, value: String(option.value) })),
  normalizeSelectValue: (value: unknown) => value
}))

jest.mock('@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode', () => ({
  META_SUPPORTS_BATCH_APPEND_MODE: 'supportsBatchAppendMode'
}))

const { DynamicTypeObjectDataAbstractMultiSelect } = jest.requireActual('./dynamic-type-object-data-abstract-multiselect')

interface GridCellMeta {
  type: string
  config: { maxItems?: number }
}

class TestMultiSelect extends DynamicTypeObjectDataAbstractMultiSelect {
  id = 'multiselect'
}

const gridCellMeta = (objectProps: Record<string, unknown>): GridCellMeta =>
  (new TestMultiSelect() as unknown as { getGridCellColumnMeta: (props: unknown) => GridCellMeta })
    .getGridCellColumnMeta({ objectProps, cellProps: {} })

const options = [{ key: 'Red', value: 'red' }]

describe('DynamicTypeObjectDataAbstractMultiSelect grid cell config', () => {
  it('passes maxItems to the multi-select grid cell', () => {
    const meta = gridCellMeta({ name: 'colors', options, maxItems: 2 })

    expect(meta.type).toBe('multi-select')
    expect(meta.config.maxItems).toBe(2)
  })

  it('passes maxItems for dynamic option providers as well', () => {
    expect(gridCellMeta({ name: 'colors', combinedFieldName: 'colors', dynamicOptions: true, options, maxItems: 3 }).config.maxItems).toBe(3)
  })

  it('omits maxItems when the field has no limit', () => {
    expect(gridCellMeta({ name: 'colors', options, maxItems: null }).config).not.toHaveProperty('maxItems')
    expect(gridCellMeta({ name: 'colors', options }).config).not.toHaveProperty('maxItems')
  })
})

// Module scope: keeps the helpers above from clashing with the select test's globals.
export {}
