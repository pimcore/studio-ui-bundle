/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError, ApiError } from '@Pimcore/modules/app/error-handler'
import { type DocType, type DocTypeUpdate, type DocumentDocTypeAddApiArg, useDocumentDocTypeAddMutation, useDocumentDocTypeDeleteMutation, useDocumentDocTypeUpdateByIdMutation } from '@Pimcore/modules/document/document-api-slice.gen'
import { isUndefined } from 'lodash'

export type DocumentTypeRow = DocType & { rowId: string }

interface UseDocumentTypeReturn {
  createNewDocumentType: () => Promise<{ success: boolean, data?: DocType }>
  createLoading: boolean
  deleteDocumentTypeById: (id: string) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateDocumentTypeById: (id: string, row: DocumentTypeRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useDocumentType = (): UseDocumentTypeReturn => {
  const [createDocumentType, { isLoading: createLoading }] = useDocumentDocTypeAddMutation()
  const [deleteDocumentType, { isLoading: deleteLoading }] = useDocumentDocTypeDeleteMutation()
  const [updateDocumentType, { isLoading: updateLoading }] = useDocumentDocTypeUpdateByIdMutation()

  const dummyDocumentType: DocumentDocTypeAddApiArg = {
    docTypeAddParameters: {
      name: 'New Document Type',
      type: 'page'
    }
  }
  const createNewDocumentType = async (): Promise<{ success: boolean, data?: DocType }> => {
    try {
      const result = await createDocumentType(dummyDocumentType)

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }

      if ('data' in result) {
        return { success: true, data: result.data }
      }
    } catch {
      trackError(new GeneralError('Was not able to create DocumentType'))
    }
    return { success: false }
  }

  const deleteDocumentTypeById = async (id: string): Promise<{ success: boolean }> => {
    try {
      const result = await deleteDocumentType({ id })

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }

      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to delete DocumentType'))
      return { success: false }
    }
  }

  const toApiDocumentType = (row: DocumentTypeRow): DocTypeUpdate => ({
    name: row.name ?? '',
    type: row.type ?? '',
    group: row.group ?? '',
    controller: row.controller ?? '',
    template: row.template ?? '',
    priority: row.priority ?? 0,
    staticGeneratorEnabled: row.staticGeneratorEnabled ?? false
  })

  const updateDocumentTypeById = async (id: string, row: DocumentTypeRow): Promise<{ success: boolean }> => {
    try {
      const result = await updateDocumentType({ id, docTypeUpdateParameters: toApiDocumentType(row) })

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }
      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to update DocumentType'))
      return { success: false }
    }
  }

  return {
    createNewDocumentType,
    createLoading,
    deleteDocumentTypeById,
    deleteLoading,
    updateDocumentTypeById,
    updateLoading
  }
}
