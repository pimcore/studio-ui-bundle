/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Exercises "scroll the newly added column into view" end-to-end: BaseColumnEditor wires
// useScrollToLastAdded (components/stack-list/use-scroll-to-last-added.ts, unit-tested on its own
// there) to its draft state via a container ref around StackList. StackList itself is replaced
// with a thin stand-in that renders one `.stack-list__item` row per item plus its
// `renderRightToolbar` (the real DOM shape the hook's row lookup and the remove control need),
// without pulling in dnd-kit/antd rendering the other BaseColumnEditor test files also avoid.

import React from 'react'
import { render, act, waitFor, screen } from '@testing-library/react'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'
import { ADVANCED_COLUMN_TYPE, type ColumnEditorHandle, type SchemaColumn } from './types'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('./base-column-editor.styles', () => ({
  useStyles: () => ({ styles: { body: 'body', fieldsPanel: 'fieldsPanel', list: 'list' } })
}))

jest.mock('./fields-to-add-panel', () => ({
  FieldsToAddPanel: () => <div data-testid='fields-to-add-panel' />
}))

jest.mock('./column-editor-item', () => ({
  ColumnEditorItemBody: () => <div data-testid='column-editor-item-body' />
}))

jest.mock('./column-locale-control', () => ({
  ColumnLocaleControl: () => <div data-testid='column-locale-control' />
}))

jest.mock('@Pimcore/components/language-selection/language-selection-with-provider', () => ({
  LanguageSelectionWithProvider: () => <div data-testid='language-selection' />
}))

jest.mock('@Pimcore/components/language-selection/provider/language-selection-provider', () => ({
  LanguageSelectionContext: React.createContext({
    currentLanguage: 'en',
    setCurrentLanguage: () => {},
    hasLocalizedFields: false,
    setHasLocalizedFields: () => {}
  })
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ contentLanguages: ['en'] })
}))

jest.mock('@Pimcore/modules/class-definition/class-definition-slice.gen', () => ({
  useClassDefinitionCollectionQuery: () => ({ data: undefined, isLoading: false })
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

jest.mock('@Pimcore/modules/auth/enums/user-permission', () => ({
  UserPermission: { Objects: 'objects' }
}))

// `data` must be a stable reference across renders, exactly like RTK Query's own memoized result:
// a fresh array literal per call would re-trigger useColumnEditorState's
// "hydrate already-configured columns from availableFields" effect on every render (its
// dependency is `availableFields` itself), looping forever.
const availableGridColumnsData = {
  columns: [
    { key: 'advanced', type: 'dataobject.advanced', group: ['advanced'], sortable: false, editable: true }
  ]
}
const gridData = { items: [] as unknown[] }

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetAvailableGridColumns: { useQuery: () => ({ data: availableGridColumnsData, isLoading: false }) },
      dataObjectGetGrid: { useQuery: () => ({ data: gridData }) },
      dataObjectGetGridPreview: { useQuery: () => ({ data: undefined, isFetching: false, error: undefined }) }
    }
  }
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

jest.mock(
  '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider',
  () => ({
    ClassificationStoreModalProvider: ({ children }: { children: React.ReactNode }) => <>{ children }</>,
    useClassificationStoreModal: () => ({ openModal: jest.fn(), closeModal: jest.fn(), fireUpdateEvent: jest.fn() })
  })
)

function passthrough (testId: string): React.FC<{ children?: React.ReactNode }> {
  const Passthrough = ({ children }: { children?: React.ReactNode }): React.JSX.Element => (
    <div data-testid={ testId }>{ children }</div>
  )
  Passthrough.displayName = `Passthrough(${testId})`
  return Passthrough
}

jest.mock('@Pimcore/components/content/content', () => ({ Content: passthrough('content') }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderTopBar, renderToolbar, children }: any): React.JSX.Element => (
    <div>
      <div data-testid='top-bar'>{ renderTopBar }</div>
      <div data-testid='toolbar'>{ renderToolbar }</div>
      <div data-testid='content'>{ children }</div>
    </div>
  )
}))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: passthrough('flex') }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: passthrough('space') }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => <div data-testid='spin' /> }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: passthrough('toolbar-inner') }))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: any) => <button onClick={ onClick }>{ children }</button>
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick }: any) => <button onClick={ onClick }>icon-button</button>
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick }: any) => <button onClick={ onClick }>{ children }</button>
}))

// The real StackList pulls in dnd-kit + antd Tag rendering, none of which this scroll-wiring test
// needs. This stand-in renders the same DOM shape the hook looks for (one `.stack-list__item` per
// item) plus each item's own right-toolbar (the remove control), so the "no scroll on remove" case
// can be driven through the real callback instead of reaching into internals.
jest.mock('@Pimcore/components/stack-list/stack-list', () => ({
  StackList: ({ items }: { items: Array<{ id: string | number, renderRightToolbar?: React.ReactNode }> }) => (
    <div data-testid='stack-list'>
      { items.map((item) => (
        <div
          className='stack-list__item'
          data-testid={ `stack-list-item-${String(item.id)}` }
          key={ String(item.id) }
        >
          { item.renderRightToolbar }
        </div>
      )) }
    </div>
  )
}))

const fieldColumnA = {
  key: 'fieldA', type: 'input', group: ['data'], sortable: true, editable: true
} as unknown as Parameters<ColumnEditorHandle['addColumn']>[0]
const fieldColumnB = {
  key: 'fieldB', type: 'input', group: ['data'], sortable: true, editable: true
} as unknown as Parameters<ColumnEditorHandle['addColumn']>[0]

const defaultProps: BaseColumnEditorProps = {
  entity: 'CAR',
  classDefinitionId: 'CAR',
  columns: [],
  onApply: jest.fn(),
  onCancel: jest.fn(),
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers'
}

async function letScrollSettle (): Promise<void> {
  await new Promise((resolve) => { setTimeout(resolve, 100) })
}

describe('BaseColumnEditor scroll-to-newly-added-column', () => {
  let scrollIntoViewMock: jest.Mock

  beforeEach(() => {
    scrollIntoViewMock = jest.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock
  })

  it('does not scroll on the initial render, nor when the columns prop is later re-seeded', async () => {
    const { rerender } = render(
      <BaseColumnEditor
        { ...defaultProps }
        columns={ [{ key: 'existing', fieldtype: 'input', type: 'input' }] }
      />
    )
    await letScrollSettle()
    expect(scrollIntoViewMock).not.toHaveBeenCalled()

    rerender(
      <BaseColumnEditor
        { ...defaultProps }
        columns={ [
          { key: 'existing', fieldtype: 'input', type: 'input' },
          { key: 'another', fieldtype: 'input', type: 'input' }
        ] }
      />
    )
    await letScrollSettle()
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('scrolls the row into view after adding a column via the imperative handle', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(fieldColumnA) })

    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' })
  })

  it('scrolls to only the last row when two columns are added one after another', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(fieldColumnA) })
    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })

    act(() => { ref.current?.addColumn(fieldColumnB) })
    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(2) })

    const columns = ref.current?.getColumns() ?? []
    expect(columns.map((column) => column.key)).toEqual(['fieldA', 'fieldB'])
  })

  it('scrolls after clicking "Add advanced column", adding a pipeline column', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { screen.getByText('column-editor.add-advanced-column').click() })
    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })

    const columns = ref.current?.getColumns() ?? []
    expect(columns).toHaveLength(1)
    expect(columns[0].type).toBe(ADVANCED_COLUMN_TYPE)
  })

  it('does not scroll when the only column is removed', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        columns={ [{ key: 'existing', fieldtype: 'input', type: 'input' }] }
        ref={ ref }
      />
    )

    await letScrollSettle()
    scrollIntoViewMock.mockClear()

    act(() => { screen.getByText('icon-button').click() })

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
    expect(ref.current?.getColumns()).toEqual([])
  })
})
