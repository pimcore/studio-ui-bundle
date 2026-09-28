/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Regression coverage for the "fills a fixed ~700px and leaves whitespace above the host's own
// toolbar" bug: BaseColumnEditor's body used to always size itself to `calc(80vh - 200px)`, a
// value that only makes sense inside its original Data Hub modal use (an antd Modal with no
// definite height of its own). `fillHeight` lets a host that already gives the editor a definite
// height (a full-height tab pane, a dialog body with its own fixed height) opt out of that fixed
// height so Content's own `height: 100%` default takes over instead.

import React from 'react'
import { render, screen } from '@testing-library/react'
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

// The one mock this file customizes relative to the other BaseColumnEditor test files: `Content`
// forwards `style` onto the DOM node so the test can inspect the fixed-height override BPT/Data
// Hub actually see in the browser, instead of the usual testid-only passthrough.
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

describe('BaseColumnEditor fillHeight', () => {
  it('defaults to the fixed calc(80vh - 200px) height for existing modal consumers', () => {
    render(<BaseColumnEditor { ...defaultProps } />)

    expect(screen.getByTestId('content')).toHaveStyle({ height: 'calc(80vh - 200px)' })
  })

  it('fillHeight={false} keeps the fixed height explicitly', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        fillHeight={ false }
      />
    )

    expect(screen.getByTestId('content')).toHaveStyle({ height: 'calc(80vh - 200px)' })
  })

  it('fillHeight omits the fixed height so Content\'s own 100% default can take over', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        fillHeight
      />
    )

    expect(screen.getByTestId('content').getAttribute('style')).toBeFalsy()
  })
})
