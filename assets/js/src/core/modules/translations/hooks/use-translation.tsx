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
import { Translation, Translation, TranslationCreate, TranslationData, useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationUpdateMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'

interface UseTranslationReturn {
  createNewTranslation: () => Promise<{ success: boolean, data?: Translation }>
  createLoading: boolean
//   deleteTranslationById: (id: string) => Promise<{ success: boolean }>
//   deleteLoading: boolean
//   updateTranslationById: (id: string, row: TranslationRow) => Promise<{ success: boolean }>
//   updateLoading: boolean
// }

export const useTranslation = (): UseTranslationReturn => {
  const [createTranslation, { isLoading: createLoading }] = useTranslationCreateMutation()
  // const [deleteTranslation, { isLoading: deleteLoading }] = useTranslationDeleteByKeyMutation()
  // const [updateTranslation, { isLoading: updateLoading }] = useTranslationUpdateMutation()

  const createNewTranslation = async (): Promise<{ success: boolean, data?: Translation }> => {
    try {
      const translationData: TranslationCreate = {translationData: [{key: "bla", type: "simple"}]
      const result = await createTranslation({createTranslation: translationData})
      
      if ('data' in result) {
        return { success: true, data: result.data }
      }
    } catch (e) {
      trackError(new GeneralError('Was not able to create Translation'))
    }
    return { success: false }
  }

  // const deleteTranslationById = async (key: string): Promise<{ success: boolean }> => {
  //   try {
  //     const result = await deleteTranslation({ key })
  //     return { success: 'data' in result }
  //   } catch (e) {
  //     trackError(new GeneralError('Was not able to delete Translation'))
  //     return { success: false }
  //   }
  // }

  // const toApiProperty = (row: TranslationRow): UpdateTranslation => ({
  // })

  // const updateTranslationById = async (key: string, row: TranslationRow): Promise<{ success: boolean }> => {
  //   try {
  //     const result = await updateTranslation({ key, updateTranslation: toApiTranslation(row) })
  //     return { success: 'data' in result }
  //   } catch (e) {
  //     trackError(new GeneralError('Was not able to update Translation'))
  //     return { success: false }
  //   }
  // }

  return {
    createNewTranslation,
    createLoading
    // deleteTranslationById,
    // deleteLoading,
    // updateTranslationById,
    // updateLoading
  }
}
