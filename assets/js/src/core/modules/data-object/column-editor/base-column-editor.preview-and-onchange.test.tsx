/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Split out of base-column-editor.test.tsx (review round 2, findings A/J) purely to keep both
// files under the line budget; the mock preamble below mirrors that file's, since both fully
// render <BaseColumnEditor/>.

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

function passthrough (testId: string): React.FC<{ children?: React.ReactNode }> {
  const Passthrough = ({ children }: { children?: React.ReactNode }): React.JSX.Element => (
    <div data-testid={ testId }>{ children }</div>
  )
  Passthrough.displayName = `Passthrough(${testId})`
  return Passthrough
}

jest.mock('@Pimcore/components/content/content', () => ({ Content: passthrough('content') }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: (
    { renderTopBar, children }: { renderTopBar?: React.ReactNode, renderToolbar?: React.ReactNode, children?: React.ReactNode }
  ): React.JSX.Element => (
    <div>
      <div data-testid='top-bar'>{ renderTopBar }</div>
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
  Button: ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => <button onClick={ onClick }>{ children }</button>
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick }: { onClick?: () => void }) => <button onClick={ onClick }>icon-button</button>
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => <button onClick={ onClick }>{ children }</button>
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

describe('BaseColumnEditor hidePreviewControls/onChange (review round 2, findings J/A)', () => {
  it('renders the preview controls by default and does not fire onChange on mount', () => {
    const onChange = jest.fn()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        onChange={ onChange }
      />
    )

    expect(screen.getByText('column-editor.preview.select-object')).toBeInTheDocument()
    expect(screen.getByTestId('language-selection')).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('hides the preview controls when hidePreviewControls is set', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hidePreviewControls
      />
    )

    expect(screen.queryByText('column-editor.preview.select-object')).not.toBeInTheDocument()
    expect(screen.queryByTestId('language-selection')).not.toBeInTheDocument()
  })
})
