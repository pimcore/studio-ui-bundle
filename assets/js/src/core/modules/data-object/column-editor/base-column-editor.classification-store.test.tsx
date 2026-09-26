/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Split out of base-column-editor.test.tsx; covers the classification store group/key picker
// (`use-classification-store-column-picker.ts`). Driven through the imperative handle's
// `addColumn` (exercised the same way a host consumer's ref would) rather than clicking through
// the real "fields to add" ColumnPicker tree, which is mocked out like in the sibling test files.
// The classification store modal provider is a controllable stub (not a static no-op) so tests can
// simulate a group/key selection by invoking the captured `onUpdate` callback directly.

import React from 'react'
import { render, act } from '@testing-library/react'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'
import { type ColumnEditorHandle, type SchemaColumn } from './types'

if (globalThis.crypto?.randomUUID === undefined) {
  Object.defineProperty(globalThis.crypto, 'randomUUID', {
    value: (): string => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, (char) => {
      const random = Math.random() * 16 | 0
      const value = char === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    })
  })
}

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

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetAvailableGridColumns: { useQuery: () => ({ data: { columns: [] }, isLoading: false }) },
      dataObjectGetGrid: { useQuery: () => ({ data: { items: [] } }) },
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

const openModalMock = jest.fn()
let capturedOnUpdate: ((data: unknown) => void) | undefined

jest.mock(
  '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider',
  () => ({
    ClassificationStoreModalProvider: (
      { children }: { children: React.ReactNode }
    ) => <>{ children }</>,
    useClassificationStoreModal: (props: { onUpdate?: (data: unknown) => void }) => {
      capturedOnUpdate = props.onUpdate
      return { openModal: openModalMock, closeModal: jest.fn(), fireUpdateEvent: jest.fn() }
    }
  })
)

jest.mock(
  '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types',
  () => ({ TabId: { Collection: 'collection', Group: 'group', GroupByKey: 'group-by-key' } })
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
  ContentLayout: ({ children }: any): React.JSX.Element => <div data-testid='content'>{ children }</div>
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

const classificationStoreColumn = {
  key: 'technicalAttributes',
  group: ['data'],
  sortable: false,
  editable: true,
  localizable: true,
  type: 'dataobject.classificationstore',
  config: { fieldDefinition: { storeId: 1, name: 'technicalAttributes', title: 'Technical attributes' } }
} as unknown as Parameters<ColumnEditorHandle['addColumn']>[0]

const defaultProps: BaseColumnEditorProps = {
  entity: 'AP',
  classDefinitionId: 'AP',
  columns: [],
  onApply: jest.fn(),
  onCancel: jest.fn(),
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers'
}

describe('BaseColumnEditor classification store column picker', () => {
  beforeEach(() => {
    openModalMock.mockClear()
    capturedOnUpdate = undefined
  })

  it('opens the group/key picker instead of adding the container field directly', () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(classificationStoreColumn) })

    expect(openModalMock).toHaveBeenCalledWith({
      storeId: 1,
      classId: 'AP',
      fieldName: 'technicalAttributes',
      name: 'technicalAttributes',
      allowedTabs: ['group-by-key']
    })
    expect(ref.current?.getColumns()).toEqual([])
  })

  it('adds one column per picked key, and skips a key already present in the draft', () => {
    const onChange = jest.fn()
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        onChange={ onChange }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(classificationStoreColumn) })
    expect(capturedOnUpdate).toBeDefined()

    act(() => {
      capturedOnUpdate?.({
        type: 'group-by-key',
        data: [
          {
            id: 1,
            groupId: 1,
            name: 'height',
            groupName: 'Dimensions',
            definition: { fieldtype: 'quantityValue', title: 'Height' }
          },
          {
            id: 2,
            groupId: 1,
            name: 'width',
            groupName: 'Dimensions',
            definition: { fieldtype: 'quantityValue', title: 'Width' }
          }
        ]
      })
    })

    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({
        key: 'technicalAttributes',
        fieldtype: 'quantityValue',
        type: 'dataobject.classificationstore',
        locale: 'default',
        config: {
          keyId: 1,
          groupId: 1,
          fieldDefinition: { fieldtype: 'quantityValue', title: 'Height' },
          groupName: 'Dimensions'
        }
      }),
      expect.objectContaining({
        key: 'technicalAttributes',
        config: expect.objectContaining({ keyId: 2, groupId: 1 })
      })
    ])

    // Picking the very same group/key again (e.g. reopening the picker for the same column)
    // must not add a duplicate.
    act(() => {
      capturedOnUpdate?.({
        type: 'group-by-key',
        data: [
          {
            id: 1,
            groupId: 1,
            name: 'height',
            groupName: 'Dimensions',
            definition: { fieldtype: 'quantityValue', title: 'Height' }
          }
        ]
      })
    })

    expect((onChange.mock.calls[onChange.mock.calls.length - 1][0] as SchemaColumn[])).toHaveLength(2)
  })
})
