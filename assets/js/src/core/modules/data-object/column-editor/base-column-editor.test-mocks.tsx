/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/*
 * Shared mock preamble for the base-column-editor.*.test.tsx files that fully render
 * <BaseColumnEditor/>. Import it for its side effect BEFORE './base-column-editor'; it is not
 * picked up by jest's testMatch. The heavy collaborators (antd-style's untranspiled ESM core,
 * DI-backed Icon, the real ColumnPicker tree, dnd-kit, ...) are replaced with thin DOM stand-ins.
 * Per-file differences are overrides on the exported jest.fn()s.
 */

import React from 'react'

// Stable references, like RTK Query's memoized results (a fresh literal per call would re-trigger
// useColumnEditorState's hydrate effect on every render).
const emptyColumns = { columns: [] }
const emptyGrid = { items: [] as unknown[] }

export const classDefinitionCollectionQueryMock = jest.fn(
  (_arg?: unknown, _options?: { skip?: boolean }): { data: { items: Array<{ id: string, name: string }> } | undefined, isLoading: boolean } =>
    ({ data: undefined, isLoading: false })
)
export const dataObjectGetAvailableGridColumnsMock = jest.fn((_arg?: unknown): { data: { columns: unknown[] }, currentData: { columns: unknown[] }, isLoading: boolean } =>
  ({ data: emptyColumns, currentData: emptyColumns, isLoading: false }))
export const dataObjectGetGridMock = jest.fn((_arg?: unknown) => ({ data: emptyGrid, currentData: emptyGrid }))

/** Restores the default implementations after a test overrode them with mockReturnValue(). */
export function resetQueryMocks (): void {
  classDefinitionCollectionQueryMock.mockReset()
  classDefinitionCollectionQueryMock.mockReturnValue({ data: undefined, isLoading: false })
  dataObjectGetAvailableGridColumnsMock.mockReset()
  dataObjectGetAvailableGridColumnsMock.mockReturnValue({ data: emptyColumns, currentData: emptyColumns, isLoading: false })
  dataObjectGetGridMock.mockReset()
  dataObjectGetGridMock.mockReturnValue({ data: emptyGrid, currentData: emptyGrid })
}

/** Classification store modal stub: tests simulate a pick by invoking `state.onUpdate`. */
export const classificationStoreModal: { openModal: jest.Mock, onUpdate?: (data: unknown) => void } = {
  openModal: jest.fn()
}

function passthrough (testId: string): React.FC<{ children?: React.ReactNode }> {
  const Passthrough = ({ children }: { children?: React.ReactNode }): React.JSX.Element => (
    <div data-testid={ testId }>{ children }</div>
  )
  Passthrough.displayName = `Passthrough(${testId})`
  return Passthrough
}

function stub (testId: string): () => React.JSX.Element {
  const Stub = (): React.JSX.Element => <div data-testid={ testId } />
  Stub.displayName = `Stub(${testId})`
  return Stub
}

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('./base-column-editor.styles', () => ({
  useStyles: () => ({ styles: { body: 'body', fieldsPanel: 'fieldsPanel', list: 'list' } })
}))
jest.mock('./fields-to-add-panel', () => ({ FieldsToAddPanel: stub('fields-to-add-panel') }))
jest.mock('./column-editor-item', () => ({ ColumnEditorItemBody: stub('column-editor-item-body') }))
jest.mock('./column-locale-control', () => ({ ColumnLocaleControl: stub('column-locale-control') }))
jest.mock('@Pimcore/components/language-selection/language-selection-with-provider', () => ({
  LanguageSelectionWithProvider: stub('language-selection')
}))
// The real module also exports the provider, which pulls in the app router and antd-style.
jest.mock('@Pimcore/components/language-selection/provider/language-selection-provider', () => ({
  LanguageSelectionContext: React.createContext({
    currentLanguage: 'en',
    setCurrentLanguage: () => {},
    hasLocalizedFields: false,
    setHasLocalizedFields: () => {}
  })
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ contentLanguages: ['en'] }) }))
jest.mock('@Pimcore/modules/auth/permission-helper', () => ({ isAllowed: () => true }))
jest.mock('@Pimcore/modules/auth/enums/user-permission', () => ({ UserPermission: { Objects: 'objects' } }))
jest.mock('@Pimcore/modules/class-definition/class-definition-slice.gen', () => ({
  useClassDefinitionCollectionQuery: (arg: unknown, options?: { skip?: boolean }) =>
    classDefinitionCollectionQueryMock(arg, options)
}))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetAvailableGridColumns: { useQuery: (arg?: unknown) => dataObjectGetAvailableGridColumnsMock(arg) },
      dataObjectGetGrid: { useQuery: (arg?: unknown) => dataObjectGetGridMock(arg) },
      dataObjectGetGridPreview: { useQuery: () => ({ data: undefined, isFetching: false, error: undefined }) }
    }
  }
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({ __esModule: true, default: jest.fn(), ApiError: jest.fn() }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: () => ({ open: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single', Multiple: 'multiple' }
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider', () => ({
  ClassificationStoreModalProvider: ({ children }: { children: React.ReactNode }) => <>{ children }</>,
  useClassificationStoreModal: (props: { onUpdate?: (data: unknown) => void }) => {
    classificationStoreModal.onUpdate = props.onUpdate
    return { openModal: classificationStoreModal.openModal, closeModal: jest.fn(), fireUpdateEvent: jest.fn() }
  }
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types', () => ({ TabId: { Collection: 'collection', Group: 'group', GroupByKey: 'group-by-key' } }))

// Content forwards `style` so fill-height tests can inspect the inline height override.
jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties }) => (
    <div
      data-testid='content'
      style={ style }
    >{ children }
    </div>
  )
}))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderTopBar, renderToolbar, children }: any): React.JSX.Element => (
    <div>
      <div data-testid='top-bar'>{ renderTopBar }</div>
      <div data-testid='toolbar'>{ renderToolbar }</div>
      <div data-testid='content-layout-body'>{ children }</div>
    </div>
  )
}))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: passthrough('flex') }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: passthrough('space') }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: stub('spin') }))
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
// Renders the `.stack-list__item` rows the scroll hook looks up, plus each item's remove control.
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
