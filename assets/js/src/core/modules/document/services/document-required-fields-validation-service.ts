/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable, inject } from 'inversify'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isNil, isEmpty } from 'lodash'
import { applyRequiredStyling, removeRequiredStyling } from '../editor/shared-tab-manager/tabs/edit/components/editables-renderer/required-field-wrapper'

export interface ValidationResult {
  isValid: boolean
  requiredFields: string[]
}

export interface DocumentRequiredFieldsValidationService {
  validateRequiredFields: (documentId: number) => ValidationResult
}

@injectable()
class DocumentRequiredFieldsValidationServiceImpl implements DocumentRequiredFieldsValidationService {
  constructor (
    @inject(serviceIds['DynamicTypes/DocumentEditableRegistry'])
    private readonly documentEditableRegistry: DynamicTypeDocumentEditableRegistry
  ) {}

  validateRequiredFields (documentId: number): ValidationResult {
    try {
      const { document: documentApi } = getPimcoreStudioApi()

      if (!documentApi.isIframeAvailable(documentId)) {
        return { isValid: true, requiredFields: [] }
      }

      const iframeApi = documentApi.getIframeApi(documentId)
      const iframeDocument = documentApi.getIframeDocument(documentId)
      const editableDefinitions = iframeApi.documentEditable.getEditableDefinitions()
      const requiredFields: string[] = []

      for (const editableDefinition of editableDefinitions) {
        removeRequiredStyling(editableDefinition.name, iframeDocument)
      }

      for (const editableDefinition of editableDefinitions) {
        const dynamicType = this.documentEditableRegistry.getDynamicType(editableDefinition.type)
        if (isNil(dynamicType)) {
          continue
        }

        if (!dynamicType.hasRequiredConfig(editableDefinition)) {
          continue
        }

        const currentValue = iframeApi.documentEditable.getValue(editableDefinition.name)?.data

        if (!dynamicType.validateRequired(currentValue, editableDefinition)) {
          const fieldName = isEmpty(editableDefinition.name)
            ? editableDefinition.realName
            : editableDefinition.name

          requiredFields.push(fieldName)
          applyRequiredStyling(editableDefinition.name, iframeDocument)
        }
      }

      return {
        isValid: requiredFields.length === 0,
        requiredFields
      }
    } catch (error) {
      console.warn(`Error validating required fields for document ${documentId}:`, error)
      return { isValid: true, requiredFields: [] }
    }
  }
}

export { DocumentRequiredFieldsValidationServiceImpl }
