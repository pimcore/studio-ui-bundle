/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DocumentRequiredFieldsValidationService, type ValidationResult } from '../services/document-required-fields-validation-service'

export interface UseRequiredFieldsValidationHookReturn {
  validateRequiredFields: (documentId: number) => ValidationResult
  showValidationErrorModal: (requiredFields: string[]) => void
}

export const useRequiredFieldsValidation = (): UseRequiredFieldsValidationHookReturn => {
  const { t } = useTranslation()
  const alertModal = useAlertModal()

  const validateRequiredFields = useCallback((documentId: number): ValidationResult => {
    const validationService = container.get<DocumentRequiredFieldsValidationService>(
      serviceIds['Document/RequiredFieldsValidationService']
    )
    return validationService.validateRequiredFields(documentId)
  }, [])

  const showValidationErrorModal = (requiredFields: string[]): void => {
    const content = (
      <div>
        <p>{t('document.required-fields.validation-message')}</p>
        <ul>
          {requiredFields.map(field => (
            <li key={ field }>{field}</li>
          ))}
        </ul>
      </div>
    )

    alertModal.error({
      title: 'document.required-fields.validation-title',
      content
    })
  }

  return {
    validateRequiredFields,
    showValidationErrorModal
  }
}
