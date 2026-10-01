/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

interface AvailableColumnsResult {
  data: { columns: unknown[] }
  currentData: { columns: unknown[] }
  isLoading: boolean
}
const dataObjectGetAvailableGridColumnsMock = jest.fn((_arg?: unknown): AvailableColumnsResult => (
  { data: { columns: [] }, currentData: { columns: [] }, isLoading: false }
))
const dataObjectGetGridMock = jest.fn((_arg?: unknown) => ({ data: { items: [] }, currentData: { items: [] } }))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetAvailableGridColumns: { useQuery: (arg?: unknown) => dataObjectGetAvailableGridColumnsMock(arg) },
      dataObjectGetGrid: { useQuery: (arg?: unknown) => dataObjectGetGridMock(arg) }
    }
  }
}))

jest.mock('@Pimcore/modules/class-definition/class-definition-slice.gen', () => ({
  useClassDefinitionCollectionQuery: () => ({ data: undefined, isLoading: false, error: undefined })
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

jest.mock('@Pimcore/modules/auth/enums/user-permission', () => ({
  UserPermission: { Objects: 'objects' }
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn()
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: () => ({ open: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single', Multiple: 'multiple' }
}))

// useAddColumnGroups() (called internally to build the fields-to-add tree) uses useTranslation();
// only the raw key matters to the behaviour under test here.
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import { act, renderHook, type RenderHookResult } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useColumnEditorState } from './use-column-editor-state'
// eslint-disable-next-line import/first
import { type SchemaColumn } from './types'
// eslint-disable-next-line import/first
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

const regularField: GridColumnConfiguration = {
  key: 'productionYear',
  group: ['system.dataobject'],
  sortable: true,
  editable: true,
  localizable: false,
  type: 'dataobject.adapter',
  frontendType: 'integer',
  config: { fieldDefinition: { fieldtype: 'numeric', title: 'Production year' } }
} as unknown as GridColumnConfiguration

interface SetupOptions {
  columns?: SchemaColumn[]
  onChange?: (columns: SchemaColumn[]) => void
}

const setup = (
  { columns = [], onChange }: SetupOptions = {}
): RenderHookResult<ReturnType<typeof useColumnEditorState>, SetupOptions> => {
  return renderHook((props: SetupOptions) => useColumnEditorState({
    entity: 'CAR',
    classDefinitionId: 'CAR',
    columns: props.columns ?? [],
    onApply: jest.fn(),
    onCancel: jest.fn(),
    onChange: props.onChange
  }), { initialProps: { columns, onChange } })
}

// Fieldtype-resolution itself is covered in isolation by `resolve-fieldtype.test.ts`; this smoke
// test only proves `handleAddColumnOfType` actually threads that resolution through the draft.
describe('useColumnEditorState threading resolveFieldtype through the draft', () => {
  it('never derives the fieldtype from the column key (the review round 2 regression)', () => {
    const { result } = setup()

    act(() => { result.current.handleAddColumnOfType(regularField) })

    expect(result.current.getColumns()).toEqual([
      expect.objectContaining({ key: 'productionYear', fieldtype: 'numeric' })
    ])
    expect(result.current.getColumns()[0].fieldtype).not.toBe(regularField.key)
  })
})

describe('useColumnEditorState onChange (review round 2, finding A)', () => {
  it('does not fire on mount', () => {
    const onChange = jest.fn()
    setup({ onChange })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not fire when the host passes an equivalent columns prop back in', () => {
    const onChange = jest.fn()
    const columns: SchemaColumn[] = [{ key: 'name', fieldtype: 'input', type: 'dataobject.adapter' }]
    const { rerender } = setup({ columns, onChange })

    // A new array instance with the same content, as a host re-rendering with fresh data would pass.
    rerender({ columns: [...columns], onChange })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('fires with the current columns when a column is added', () => {
    const onChange = jest.fn()
    const { result } = setup({ onChange })

    act(() => { result.current.handleAddColumnOfType(regularField) })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ key: 'productionYear', fieldtype: 'numeric' })
    ])
  })

  it('fires again when a column is removed', () => {
    const onChange = jest.fn()
    const { result } = setup({ onChange })

    act(() => { result.current.handleAddColumnOfType(regularField) })
    const addedId = result.current.draft[0]._id
    act(() => { result.current.handleRemove(addedId) })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith([])
  })
})

describe('useColumnEditorState re-seeding from the columns prop', () => {
  const columns: SchemaColumn[] = [{ key: 'name', fieldtype: 'input', type: 'dataobject.adapter' }]

  it('keeps unapplied local edits when an equivalent new columns array is passed', () => {
    const { result, rerender } = setup({ columns })

    act(() => { result.current.handleAddColumnOfType(regularField) })
    rerender({ columns: columns.map(column => ({ ...column })) })

    expect(result.current.draft.map(col => col.key)).toEqual(['name', 'productionYear'])
  })

  it('re-seeds the draft when the columns content really changes', () => {
    const { result, rerender } = setup({ columns })

    act(() => { result.current.handleAddColumnOfType(regularField) })
    rerender({ columns: [{ key: 'other', fieldtype: 'input', type: 'dataobject.adapter' }] })

    expect(result.current.draft.map(col => col.key)).toEqual(['other'])
  })
})

describe('useColumnEditorState hydration and class changes', () => {
  const column: SchemaColumn = { key: 'productionYear', type: 'dataobject.adapter', fieldtype: 'numeric' }
  const loaded = { data: { columns: [regularField] }, currentData: { columns: [regularField] }, isLoading: false }
  const loading = { data: { columns: [] }, currentData: { columns: [] }, isLoading: true }

  afterEach(() => {
    dataObjectGetAvailableGridColumnsMock.mockImplementation(
      () => ({ data: { columns: [] }, currentData: { columns: [] }, isLoading: false })
    )
  })

  it('does not report a change when available columns arrive after mount', () => {
    const onChange = jest.fn()
    dataObjectGetAvailableGridColumnsMock.mockImplementation(() => loading)
    const { result, rerender } = setup({ columns: [column], onChange })

    dataObjectGetAvailableGridColumnsMock.mockImplementation(() => loaded)
    rerender({ columns: [column], onChange })

    expect(result.current.draft[0].localizable).toBe(false)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('re-seeds the draft when the class changes while the columns stay equivalent', () => {
    const columns = [column]
    const { result, rerender } = renderHook(
      (props: { classId: string }) => useColumnEditorState({
        entity: props.classId,
        classDefinitionId: props.classId,
        columns,
        onApply: jest.fn(),
        onCancel: jest.fn()
      }),
      { initialProps: { classId: 'CAR' } }
    )

    act(() => { result.current.handleAddColumnOfType(regularField) })
    expect(result.current.draft).toHaveLength(2)

    rerender({ classId: 'AP' })

    expect(result.current.draft).toHaveLength(1)
  })
})
