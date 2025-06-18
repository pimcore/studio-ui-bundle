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
  const {data: controllers, isError: isControllerError, error: controllerError } = useDocumentAvailableControllersListQuery(undefined,
    { refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false
    })
  const {data: templates, isError: isTemplatesError, error: templatesError } = useDocumentAvailableTemplatesListQuery(undefined,
    { refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false
    })
  const {data: docTypes, isError: isDocTypesError, error: docTypeError} = useDocumentDocTypeTypeListQuery(undefined,
    { refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false
    })

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
    templates: !isUndefined(templates) ? templates?.items : [],
    docTypes:!isUndefined(docTypes) ? docTypes?.items : [],
  }
}