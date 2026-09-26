/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { skipToken } from '@reduxjs/toolkit/query'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style's createStyles reaches its untranspiled ESM core under Jest; only class names
// matter to the behaviour under test, so the emotion class generation is stubbed out
jest.mock('./base-column-editor.styles', () => ({
  useStyles: () => ({ styles: { body: 'body', fieldsPanel: 'fieldsPanel', list: 'list' } })
}))

// The fields-to-add panel pulls in the full searchable ColumnPicker tree, which is irrelevant
// to the toolbar-visibility behaviour under test here.
jest.mock('./fields-to-add-panel', () => ({
  FieldsToAddPanel: () => <div data-testid='fields-to-add-panel' />
}))

// The advanced-column pipeline form (rendered only for advanced columns, none of which exist in
// these tests) reaches antd-style's untranspiled ESM core via Box/Pipeline/Tabs, which this Jest
// config cannot parse from node_modules.
jest.mock('./column-editor-item', () => ({
  ColumnEditorItemBody: () => <div data-testid='column-editor-item-body' />
}))

// LanguageSelection reaches the Icon component (icon library DI + antd-style), which this Jest
// config cannot render either; not exercised here since no draft column is localizable.
jest.mock('./column-locale-control', () => ({
  ColumnLocaleControl: () => <div data-testid='column-locale-control' />
}))

jest.mock('@Pimcore/components/language-selection/language-selection-with-provider', () => ({
  LanguageSelectionWithProvider: () => <div data-testid='language-selection' />
}))

// The real provider module also exports LanguageSelectionProvider, which pulls in the element
// context / draft hooks and, transitively, the whole app router and antd-style's untranspiled
// ESM core - irrelevant to the toolbar-visibility behaviour under test here.
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

// useColumnEditorState() resolves the class definition directly through this query (skipped
// whenever classDefinitionId is supplied, see the "no ClassDefinitionsProvider" tests below)
// rather than through useClassDefinitions()/ClassDefinitionsProvider: BaseColumnEditor also
// mounts inside the document editor iframe realm (BPT's `outputdata` editable), which has no
// such provider.
interface ClassDefinitionCollectionQueryMockResult {
  data: { items: Array<{ id: string, name: string }> } | undefined
  isLoading: boolean
}
const classDefinitionCollectionQueryMock = jest.fn(
  (_arg?: unknown, _options?: { skip?: boolean }): ClassDefinitionCollectionQueryMockResult => ({ data: undefined, isLoading: false })
)
jest.mock('@Pimcore/modules/class-definition/class-definition-slice.gen', () => ({
  useClassDefinitionCollectionQuery: (arg: unknown, options?: { skip?: boolean }) => classDefinitionCollectionQueryMock(arg, options)
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

jest.mock('@Pimcore/modules/auth/enums/user-permission', () => ({
  UserPermission: { Objects: 'objects' }
}))

const dataObjectGetAvailableGridColumnsMock = jest.fn((_arg?: unknown) => ({ data: { columns: [] }, isLoading: false }))
const dataObjectGetGridMock = jest.fn((_arg?: unknown) => ({ data: { items: [] } }))
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

// Pass every layout/chrome component through to plain DOM so button text stays queryable,
// without pulling in the DI-backed Icon rendering (icon library, color-group registry, ...).
// Declared as a hoisted function (not `const`) because jest hoists the `jest.mock()` calls
// below above this file's own top-level statements, and a `const` would still be in its
// temporal dead zone at that point.
function passthrough (testId: string): React.FC<{ children?: React.ReactNode }> {
  const Passthrough = ({ children }: { children?: React.ReactNode }): React.JSX.Element => (
    <div data-testid={ testId }>{ children }</div>
  )
  Passthrough.displayName = `Passthrough(${testId})`
  return Passthrough
}

jest.mock('@Pimcore/components/content/content', () => ({ Content: passthrough('content') }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderTopBar, renderToolbar, children }: { renderTopBar?: React.ReactNode, renderToolbar?: React.ReactNode, children?: React.ReactNode }): React.JSX.Element => (
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

describe('BaseColumnEditor toolbar visibility', () => {
  it('renders both the add-column and the apply/discard controls by default', () => {
    render(<BaseColumnEditor { ...defaultProps } />)

    expect(screen.getByText('column-editor.add-column')).toBeInTheDocument()
    expect(screen.getByText('column-editor.apply')).toBeInTheDocument()
    expect(screen.getByText('column-editor.discard')).toBeInTheDocument()
  })

  it('hideApplyDiscard hides Apply/Discard but keeps the add-column buttons', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideApplyDiscard
      />
    )

    expect(screen.getByText('column-editor.add-column')).toBeInTheDocument()
    expect(screen.queryByText('column-editor.apply')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.discard')).not.toBeInTheDocument()
  })

  it('hideAddButtons hides the add-column buttons but keeps Apply/Discard', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideAddButtons
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.getByText('column-editor.apply')).toBeInTheDocument()
    expect(screen.getByText('column-editor.discard')).toBeInTheDocument()
  })

  it('the deprecated hideToolbar alias hides both halves', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideToolbar
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.apply')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.discard')).not.toBeInTheDocument()
  })

  it('an explicit split flag overrides the deprecated hideToolbar alias', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideApplyDiscard={ false }
        hideToolbar
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.getByText('column-editor.apply')).toBeInTheDocument()
    expect(screen.getByText('column-editor.discard')).toBeInTheDocument()
  })
})

describe('BaseColumnEditor without a ClassDefinitionsProvider ancestor', () => {
  // Regression test for a crash reported from the document editor iframe realm (BPT's
  // `outputdata` editable, document_editor_iframe entry point): that realm has no
  // ClassDefinitionsProvider, and useColumnEditorState() used to call useClassDefinitions()
  // unconditionally, throwing the instant BaseColumnEditor mounted there even though
  // classDefinitionId was already supplied. None of the tests in this file render inside a
  // ClassDefinitionsProvider (or mock ClassDefinitionContext), so a passing render here is
  // already the regression check; this test also asserts the class-lookup query is skipped
  // rather than merely not throwing.
  beforeEach(() => {
    classDefinitionCollectionQueryMock.mockClear()
  })

  it('renders with classDefinitionId supplied, skipping the class-lookup fallback query', () => {
    render(<BaseColumnEditor { ...defaultProps } />)

    expect(screen.getByText('column-editor.add-column')).toBeInTheDocument()
    expect(classDefinitionCollectionQueryMock).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ skip: true })
    )
  })
})

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

// hidePreviewControls (finding J) and onChange (finding A) are covered in
// base-column-editor.preview-and-onchange.test.tsx, split out to stay under the file line budget.
