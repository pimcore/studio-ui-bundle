/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { DocumentRequiredFieldsValidationServiceImpl } from './document-required-fields-validation-service'

jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({
  getPimcoreStudioApi: jest.fn()
}))

jest.mock('../editor/shared-tab-manager/tabs/edit/components/editables-renderer/required-field-wrapper.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

const DOCUMENT_ID = 1

const createDefinition = (name: string, id: string): AbstractDocumentEditableDefinition => ({
  id,
  name,
  realName: name.split('.').pop() ?? name,
  data: null,
  config: { required: true },
  type: 'input',
  inherited: false,
  inDialogBox: null,
  defaultFieldWidth: {} as any
})

const setup = (definitions: AbstractDocumentEditableDefinition[], values: Record<string, any>): DocumentRequiredFieldsValidationServiceImpl => {
  document.body.innerHTML = definitions.map(definition => `<div id="${definition.id}"></div>`).join('')

  const iframeApi = {
    documentEditable: {
      getEditableDefinitions: () => definitions,
      getValue: (name: string) => ({ type: 'input', data: values[name] })
    }
  }

  jest.mocked(getPimcoreStudioApi).mockReturnValue({
    document: {
      isIframeAvailable: () => true,
      getIframeApi: () => iframeApi,
      getIframeDocument: () => document
    }
  } as unknown as ReturnType<typeof getPimcoreStudioApi>)

  const registry = {
    getDynamicType: () => ({
      hasRequiredConfig: (props: AbstractDocumentEditableDefinition) => Boolean(props.config?.required),
      validateRequired: (value: any) => typeof value === 'string' && value !== ''
    })
  } as unknown as DynamicTypeDocumentEditableRegistry

  return new DocumentRequiredFieldsValidationServiceImpl(registry)
}

describe('DocumentRequiredFieldsValidationServiceImpl', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('marks an empty required top-level editable in the document', () => {
    const service = setup([createDefinition('text', 'pimcore_editable_text')], { text: '' })

    const result = service.validateRequiredFields(DOCUMENT_ID)

    expect(result).toEqual({ isValid: false, requiredFields: ['text'] })
    expect(document.getElementById('pimcore_editable_text')).toHaveAttribute('data-required-active', 'true')
  })

  it('marks an empty required editable nested in a block, whose DOM id differs from its name', () => {
    // Core builds the DOM id from the name with ":" and "." replaced by "_"
    const service = setup(
      [createDefinition('content:1.headline', 'pimcore_editable_content_1_headline')],
      { 'content:1.headline': '' }
    )

    const result = service.validateRequiredFields(DOCUMENT_ID)

    expect(result).toEqual({ isValid: false, requiredFields: ['content:1.headline'] })
    expect(document.getElementById('pimcore_editable_content_1_headline')).toHaveAttribute('data-required-active', 'true')
  })

  it('removes the mark once a nested required editable is filled', () => {
    const definition = createDefinition('content:1.headline', 'pimcore_editable_content_1_headline')
    const values: Record<string, any> = { 'content:1.headline': '' }
    const service = setup([definition], values)

    service.validateRequiredFields(DOCUMENT_ID)
    values['content:1.headline'] = 'Filled'
    const result = service.validateRequiredFields(DOCUMENT_ID)

    expect(result.isValid).toBe(true)
    expect(document.getElementById('pimcore_editable_content_1_headline')).not.toHaveAttribute('data-required-active')
  })
})
