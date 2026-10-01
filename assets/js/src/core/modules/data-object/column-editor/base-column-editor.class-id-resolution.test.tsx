/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Split out of base-column-editor.test.tsx purely to keep both files under the line budget; the
// mock preamble below mirrors that file's, since both fully render <BaseColumnEditor/>.

import React from 'react'
import { render, screen } from '@testing-library/react'
import { skipToken } from '@reduxjs/toolkit/query'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'

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

interface ClassDefinitionCollectionQueryMockResult {
  data: { items: Array<{ id: string, name: string }> } | undefined
  isLoading: boolean
}
const classDefinitionCollectionQueryMock = jest.fn(
  (_arg?: unknown, _options?: { skip?: boolean }): ClassDefinitionCollectionQueryMockResult =>
    ({ data: undefined, isLoading: false })
)
jest.mock('@Pimcore/modules/class-definition/class-definition-slice.gen', () => ({
  useClassDefinitionCollectionQuery: (arg: unknown, options?: { skip?: boolean }) =>
    classDefinitionCollectionQueryMock(arg, options)
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

jest.mock('@Pimcore/modules/auth/enums/user-permission', () => ({
  UserPermission: { Objects: 'objects' }
}))

const dataObjectGetAvailableGridColumnsMock = jest.fn((_arg?: unknown) => ({ data: { columns: [] }, currentData: { columns: [] }, isLoading: false }))
const dataObjectGetGridMock = jest.fn((_arg?: unknown) => ({ data: { items: [] }, currentData: { items: [] } }))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetAvailableGridColumns: { useQuery: (arg?: unknown) => dataObjectGetAvailableGridColumnsMock(arg) },
      dataObjectGetGrid: { useQuery: (arg?: unknown) => dataObjectGetGridMock(arg) },
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

// See the identical mock + comment in base-column-editor.test.tsx.
jest.mock(
  '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider',
  () => ({
    ClassificationStoreModalProvider: (
      { children }: { children: React.ReactNode }
    ) => <>{ children }</>,
    useClassificationStoreModal: () => ({
      openModal: jest.fn(),
      closeModal: jest.fn(),
      fireUpdateEvent: jest.fn()
    })
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
jest.mock('@Pimcore/components/stack-list/stack-list', () => ({ StackList: () => <div data-testid='stack-list' /> }))
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

const defaultProps: BaseColumnEditorProps = {
  entity: 'CAR',
  classDefinitionId: 'CAR',
  columns: [],
  onApply: jest.fn(),
  onCancel: jest.fn(),
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers'
}

describe('BaseColumnEditor resolving the class id from the entity name', () => {
  // Regression coverage for a bug where, while the class-definition list lookup was still in
  // flight, resolvedClassId fell back to the class NAME (`entity`) instead of staying
  // undefined - firing `available-columns`/grid requests against the wrong id, which then got
  // silently replaced by a second, correct request once the lookup resolved.
  beforeEach(() => {
    classDefinitionCollectionQueryMock.mockClear()
    dataObjectGetAvailableGridColumnsMock.mockClear()
    dataObjectGetGridMock.mockClear()
  })

  it('does not request columns for the raw entity name while the lookup is in flight', () => {
    classDefinitionCollectionQueryMock.mockReturnValue({ data: undefined, isLoading: true })

    render(
      <BaseColumnEditor
        { ...defaultProps }
        classDefinitionId={ undefined }
      />
    )

    expect(screen.getByTestId('spin')).toBeInTheDocument()
    expect(dataObjectGetAvailableGridColumnsMock).toHaveBeenCalledWith(skipToken)
    expect(dataObjectGetGridMock).toHaveBeenCalledWith(skipToken)
  })

  it('resolves the class id by name once the lookup completes and requests with the real id', () => {
    classDefinitionCollectionQueryMock.mockReturnValue({
      data: { items: [{ id: 'CAR_ID', name: 'CAR' }] },
      isLoading: false
    })

    render(
      <BaseColumnEditor
        { ...defaultProps }
        classDefinitionId={ undefined }
      />
    )

    expect(dataObjectGetAvailableGridColumnsMock).toHaveBeenCalledWith({ classId: 'CAR_ID', folderId: 1 })
    expect(dataObjectGetGridMock).toHaveBeenCalledWith(
      expect.objectContaining({ classId: 'CAR_ID' })
    )
  })
})
