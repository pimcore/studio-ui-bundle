/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DocType, type DocTypeType, type DocumentController, type DocumentTemplate } from '@Pimcore/modules/document/document-api-slice.gen'
import { useDocumentAvailableControllersListQuery, useDocumentDocTypeTypeListQuery, useDocumentAvailableTemplatesListQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'
import trackError, { ApiError } from '../../app/error-handler'
import { isUndefined } from 'lodash'
import { useEffect } from 'react'

export type DocumentTypeRow = DocType & { rowId: string }

interface UseDocumentConfigReturn {
  controllers: DocumentController[]
  templates: DocumentTemplate[]
  docTypes: DocTypeType[]
}

export const useDocumentConfig = (): UseDocumentConfigReturn => {
  const { data: controllers, error: controllerError } = useDocumentAvailableControllersListQuery()
  const { data: templates, error: templatesError } = useDocumentAvailableTemplatesListQuery()
  const { data: docTypes, error: docTypeError } = useDocumentDocTypeTypeListQuery()

  useEffect(() => {
    if (!isUndefined(controllerError)) {
      trackError(new ApiError(controllerError))
    }
  }, [controllerError])

  useEffect(() => {
    if (!isUndefined(templatesError)) {
      trackError(new ApiError(templatesError))
    }
  }, [templatesError])

  useEffect(() => {
    if (!isUndefined(docTypeError)) {
      trackError(new ApiError(docTypeError))
    }
  }, [docTypeError])

  return {
    controllers: !isUndefined(controllers) ? controllers?.items : [],
    templates: !isUndefined(templates) ? templates?.items : [],
    docTypes: !isUndefined(docTypes) ? docTypes?.items : []
  }
}
