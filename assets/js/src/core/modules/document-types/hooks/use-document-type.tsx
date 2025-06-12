/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { DocTypeType, DocTypeUpdate, useDocumentDocTypeAddMutation, useDocumentDocTypeDeleteMutation, useDocumentDocTypeUpdateByIdMutation } from '@Pimcore/modules/document/document-api-slice.gen'


export type DocumentTypeRow = DocTypeType & { rowId: string }

interface UseDocumentTypeReturn {
  createNewDocumentType: () => Promise<{ success: boolean, data?: DocumentType }>
  createLoading: boolean
  deleteDocumentTypeById: (id: string) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateDocumentTypeById: (id: string, row: DocumentTypeRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useDocumentType = (): UseDocumentTypeReturn => {
//   const [createDocumentType, { isLoading: createLoading }] = useDocumentDocTypeAddMutation()
  const [deleteDocumentType, { isLoading: deleteLoading }] = useDocumentDocTypeDeleteMutation()
  const [updateDocumentType, { isLoading: updateLoading }] = useDocumentDocTypeUpdateByIdMutation()

  const createNewDocumentType = async (): Promise<{ success: boolean, data?: DocumentType }> => {
    // try {
    //   const result = await createDocumentType()
    //   if ('data' in result) {
    //     return { success: true, data: result.data }
    //   }
    // } catch (e) {
    //   trackError(new GeneralError('Was not able to create DocumentType'))
    // }
    return { success: false }
  }

  const deleteDocumentTypeById = async (id: string): Promise<{ success: boolean }> => {
    try {
      const result = await deleteDocumentType({ id })
      return { success: 'data' in result }
    } catch (e) {
      trackError(new GeneralError('Was not able to delete DocumentType'))
      return { success: false }
    }
  }

  const toApiDocumentType = (row: DocumentTypeRow): DocTypeUpdate => ({
    name: '',
    type: '',
    group: '',
    controller: '',
    template: '',
    priority: 1,
    staticGeneratorEnabled: false
  })

  const updateDocumentTypeById = async (id: string, row: DocumentTypeRow): Promise<{ success: boolean }> => {
    try {
      const result = await updateDocumentType({ id, docTypeUpdateParameters: toApiDocumentType(row) })
      return { success: 'data' in result }
    } catch (e) {
      trackError(new GeneralError('Was not able to update DocumentType'))
      return { success: false }
    }
  }

  return {
    createNewDocumentType,
    createLoading: true,
    deleteDocumentTypeById,
    deleteLoading,
    updateDocumentTypeById,
    updateLoading
  }
}