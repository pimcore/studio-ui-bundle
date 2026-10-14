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
import { type ElementSelectorConfig, type SelectedItem } from '@sdk/modules/element'

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

const useElementSelector = jest.fn((_config: ElementSelectorConfig) => ({ open: jest.fn() }))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: (config: ElementSelectorConfig) => useElementSelector(config)
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

  const getSelectorConfig = (): ElementSelectorConfig => useElementSelector.mock.calls[0][0]

  afterEach(() => {
    useDocumentRenderletRenderQuery.mockClear()
    useElementSelector.mockClear()
  })

  it('sends the open document id from DocumentContext as parentDocumentId, without any router context', () => {
    renderWithDocumentContext(234)

    const [apiParams] = useDocumentRenderletRenderQuery.mock.calls[0]
    expect(apiParams?.parentDocumentId).toBe(234)
  })

  // The "Search" context-menu action opens the element selector. The selector expects
  // class names under `objects.allowedClasses`; `objects.allowedTypes` means the object
  // *type* (object / variant / folder). Passing class names as types locks the type
  // filter to a non-existent type, so the listing is empty and no classId is sent
  // (https://pimcore.atlassian.net/browse/PEES-1691).
  describe('element selector configuration', () => {
    it('restricts the selector to the configured class name', () => {
      render(
        <DocumentContext.Provider value={ { id: 1 } }>
          <RenderletContent
            config={ { controller: 'App\\Controller\\MyController::renderAction', type: 'object', className: 'Car' } }
            onChange={ jest.fn() }
          />
        </DocumentContext.Provider>
      )

      expect(getSelectorConfig().config?.objects).toEqual({ allowedClasses: ['Car'] })
    })

    it('restricts the selector to all configured class names when className is an array', () => {
      render(
        <DocumentContext.Provider value={ { id: 1 } }>
          <RenderletContent
            config={ { controller: 'App\\Controller\\MyController::renderAction', type: 'object', className: ['Car', 'Manufacturer'] } }
            onChange={ jest.fn() }
          />
        </DocumentContext.Provider>
      )

      expect(getSelectorConfig().config?.objects).toEqual({ allowedClasses: ['Car', 'Manufacturer'] })
    })

    it('does not restrict classes when no className is configured', () => {
      render(
        <DocumentContext.Provider value={ { id: 1 } }>
          <RenderletContent
            config={ { controller: 'App\\Controller\\MyController::renderAction', type: 'object' } }
            onChange={ jest.fn() }
          />
        </DocumentContext.Provider>
      )

      expect(getSelectorConfig().config?.objects).toBeUndefined()
    })
  })

  // The selector reports data objects with the Studio-internal element type
  // 'data-object'. The renderlet value (and core's Renderlet editable, which resolves
  // the element via Element\Service::getElementById) uses 'object' — the same mapping
  // the drop handler in renderlet-editable.tsx already applies.
  describe('element selector selection', () => {
    const finishWith = (elementType: SelectedItem['elementType'], data: Pick<SelectedItem['data'], 'id' | 'type'>): jest.Mock => {
      const onChange = jest.fn()
      render(
        <DocumentContext.Provider value={ { id: 1 } }>
          <RenderletContent
            config={ { controller: 'App\\Controller\\MyController::renderAction', type: 'object' } }
            onChange={ onChange }
          />
        </DocumentContext.Provider>
      )

      const { onFinish } = getSelectorConfig()
      onFinish?.({ items: [{ elementType, data: { fullpath: '/some/element', ...data } }] })

      return onChange
    }

    it('stores a selected data object with type "object"', () => {
      const onChange = finishWith('data-object', { id: 42, type: 'object' })

      expect(onChange).toHaveBeenCalledWith({ id: 42, type: 'object', subtype: 'object' })
    })

    it('stores a selected variant with type "object" and subtype "variant"', () => {
      const onChange = finishWith('data-object', { id: 43, type: 'variant' })

      expect(onChange).toHaveBeenCalledWith({ id: 43, type: 'object', subtype: 'variant' })
    })

    it('keeps the element type for assets and documents', () => {
      const onChange = finishWith('asset', { id: 7, type: 'image' })

      expect(onChange).toHaveBeenCalledWith({ id: 7, type: 'asset', subtype: 'image' })
    })
  })
})
