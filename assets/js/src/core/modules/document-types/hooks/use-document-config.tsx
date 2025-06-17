/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocType, DocTypeType, DocumentController, DocumentTemplate,} from '@Pimcore/modules/document/document-api-slice.gen'
import { useDocumentAvailableControllersListQuery,useDocumentDocTypeTypeListQuery, useDocumentAvailableTemplatesListQuery} from '@Pimcore/modules/document/document-api-slice-enhanced'

import { isUndefined } from 'lodash'
import { useEffect } from 'react'


export type DocumentTypeRow = DocType & { rowId: string }

interface UseDocumentConfigReturn {
controllers: DocumentController[]
controllersLoading: boolean
templates: DocumentTemplate[]
templatesLoading: boolean
docTypes: DocTypeType[]
docTypesLoading: boolean
}

export const useDocumentConfig = (): UseDocumentConfigReturn => {
  const {data: controllers, isLoading: controllersLoading, isError: isControllerError, error: controllerError } = useDocumentAvailableControllersListQuery()
  const {data: templates, isLoading: templatesLoading, isError: isTemplatesError, error: templatesError } = useDocumentAvailableTemplatesListQuery()
  const {data: docTypes, isLoading: docTypesLoading, isError: isDocTypesError, error: docTypeError} = useDocumentDocTypeTypeListQuery()

  useEffect(() => {
    if (isControllerError) {
      trackError(new ApiError(controllerError))
    }
  }, [isControllerError])

  useEffect(() => {
    if (isTemplatesError) {
      trackError(new ApiError(templatesError))
    }
  }, [isTemplatesError])

  useEffect(() => {
    if (isDocTypesError) {
      trackError(new ApiError(docTypeError))
    }
  }, [isDocTypesError])

  return {
    controllers: !isUndefined(controllers) ? controllers?.items : [],
    controllersLoading,
    templates: !isUndefined(templates) ? templates?.items : [],
    templatesLoading,
    docTypes:!isUndefined(docTypes) ? docTypes?.items : [],
    docTypesLoading
  }
}