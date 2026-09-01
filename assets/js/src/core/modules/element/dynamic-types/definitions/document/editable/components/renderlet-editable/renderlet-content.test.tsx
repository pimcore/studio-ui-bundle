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
import { render } from '@testing-library/react'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { type DocumentRenderletRenderApiArg } from '@Pimcore/modules/document/document-api-slice.gen'
import { RenderletContent } from './renderlet-content'

const useDocumentRenderletRenderQuery = jest.fn((_params: DocumentRenderletRenderApiArg | undefined, _options?: unknown) => (
  { data: undefined, isLoading: false, error: undefined }
))

jest.mock('@Pimcore/modules/document/document-api-slice-enhanced', () => ({
  useDocumentRenderletRenderQuery: (params: DocumentRenderletRenderApiArg | undefined, options?: unknown) =>
    useDocumentRenderletRenderQuery(params, options)
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: () => ({ open: jest.fn() })
}))

// element-selector-provider transitively pulls in antd-style (see icon.tsx comment
// below) — only its SelectionType enum is actually used by the component under test.
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Disabled: 'disabled', Single: 'single', Multiple: 'multiple' }
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: jest.fn() })
}))

jest.mock('@Pimcore/components/editable-html-drop-container', () => ({
  EditableHtmlDropContainer: () => <div data-testid='drop-container' />
}))

// icon.tsx and sanitize-html.tsx transitively pull in antd-style, which ships
// untranspiled ESM that jest cannot parse (same reason field-container.test.tsx
// stubs Flex/Form) — irrelevant to the behaviour under test here.
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/sanitize-html/sanitize-html', () => ({
  SanitizeHtml: () => <div />
}))

// This component is mounted both inside the main Studio app (which has react-router
// context) and inside the document canvas iframe (a separate React root with no
// router at all). It must resolve the currently open document's id from
// DocumentContext, not from a route param, so it renders correctly in both.
describe('RenderletContent', () => {
  const renderWithDocumentContext = (documentId: number): void => {
    render(
      <DocumentContext.Provider value={ { id: documentId } }>
        <RenderletContent
          config={ { controller: 'App\\Controller\\MyController::renderAction' } }
          onChange={ jest.fn() }
          value={ { id: 5, type: 'object' } }
        />
      </DocumentContext.Provider>
    )
  }

  afterEach(() => {
    useDocumentRenderletRenderQuery.mockClear()
  })

  it('sends the open document id from DocumentContext as parentDocumentId, without any router context', () => {
    renderWithDocumentContext(234)

    const [apiParams] = useDocumentRenderletRenderQuery.mock.calls[0]
    expect(apiParams?.parentDocumentId).toBe(234)
  })
})
