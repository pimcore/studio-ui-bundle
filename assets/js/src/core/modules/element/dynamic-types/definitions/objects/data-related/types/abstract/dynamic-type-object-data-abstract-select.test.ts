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

const useGridDynamicSelectOptions = (): undefined => undefined

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/hooks/use-dynamic-select-options', () => ({
  useGridDynamicSelectOptions
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options', () => ({
  convertSelectOptions: (options: Array<{ key: string, value: string | number }> | null | undefined) =>
    options?.map(option => ({ label: option.key, value: String(option.value) })),
  normalizeSelectValue: (value: unknown) => value
}))

const { DynamicTypeObjectDataAbstractSelect } = jest.requireActual('./dynamic-type-object-data-abstract-select')

interface GridCellMeta {
  type: string
  editable: boolean
  config: { options?: unknown[], useOptionsHook?: unknown, fieldName?: string }
}

class TestSelect extends DynamicTypeObjectDataAbstractSelect {
  id = 'select'
}

const options = [
  { key: 'Ready for export', value: 'ready_for_export' },
  { key: 'Completed', value: 'completed' }
]

const gridCellMeta = (objectProps: Record<string, unknown>): GridCellMeta =>
  (new TestSelect() as unknown as { getGridCellColumnMeta: (props: unknown) => GridCellMeta })
    .getGridCellColumnMeta({ objectProps, cellProps: {} })

describe('DynamicTypeObjectDataAbstractSelect grid cell config', () => {
  it('passes the option snapshot for an editable select', () => {
    const meta = gridCellMeta({ name: 'workflowState', options })

    expect(meta.editable).toBe(true)
    expect(meta.config.options).toEqual([
      { label: 'Ready for export', value: 'ready_for_export' },
      { label: 'Completed', value: 'completed' }
    ])
  })

  it('keeps the option snapshot for a read-only select so the grid can show the label', () => {
    const meta = gridCellMeta({ name: 'workflowState', noteditable: true, options })

    expect(meta.editable).toBe(false)
    expect(meta.config.options).toEqual([
      { label: 'Ready for export', value: 'ready_for_export' },
      { label: 'Completed', value: 'completed' }
    ])
  })

  it('falls back to an empty snapshot without options', () => {
    expect(gridCellMeta({ name: 'workflowState', options: null }).config.options).toEqual([])
    expect(gridCellMeta({ name: 'workflowState', noteditable: true }).config.options).toEqual([])
  })

  it('wires the dynamic options hook and seeds the snapshot for a dynamic provider', () => {
    const meta = gridCellMeta({ name: 'state', combinedFieldName: 'state', dynamicOptions: true, noteditable: true, options })

    expect(meta.config.useOptionsHook).toBe(useGridDynamicSelectOptions)
    expect(meta.config.fieldName).toBe('state')
    expect(meta.config.options).toHaveLength(2)
  })
})
