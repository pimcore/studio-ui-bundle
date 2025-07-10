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
import { Translation, TranslationCreate, TranslationData, useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationUpdateMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { TranslationRow, TranslationDataItem } from '../translations-container'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'

interface UseTranslationReturn {
  createNewTranslation: (key: string) => Promise<{ success: boolean, data?: TranslationDataItem }>
  createLoading: boolean
  deleteTranslationByKey: (key: string) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateTranslationByKey: (columnId: string, row: TranslationRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useTranslation = (): UseTranslationReturn => {
  const settings = useSettings()
  const [createTranslation, { isLoading: createLoading }] = useTranslationCreateMutation()
  const [deleteTranslation, { isLoading: deleteLoading }] = useTranslationDeleteByKeyMutation()
  const [updateTranslation, { isLoading: updateLoading }] = useTranslationUpdateMutation()

  const createNewTranslation = async (key: string): Promise<{ success: boolean, data?: TranslationDataItem }> => {
    try {
      const translationData: TranslationCreate = {translationData: [{key, type: "simple"}]}
      const result = await createTranslation({createTranslation: translationData})
      
      if ('data' in result) {
        // Since the API returns void, we construct the TranslationDataItem object from what we sent
        // This matches the new expected backend format with dynamic locale fields
        const createdTranslation: TranslationDataItem = {
          key: translationData.translationData[0].key,
          type: translationData.translationData[0].type,
          creationDate: Date.now(),
          modificationDate: Date.now(),
          // Add default empty values for all valid languages from settings
          ...settings.validLanguages.reduce((acc, lang) => {
            acc[`_${lang}`] = ""
            return acc
          }, {} as Record<string, string>)
        }
        return { success: true, data: createdTranslation }
      }
    } catch (e) {
      trackError(new GeneralError('Was not able to create Translation'))
    }
    return { success: false }
  }

  const deleteTranslationByKey = async (key: string): Promise<{ success: boolean }> => {
    try {
      const result = await deleteTranslation({ key })
      return { success: 'data' in result }
    } catch (e) {
      trackError(new GeneralError('Was not able to delete Translation'))
      return { success: false }
    }
  }

  // Helper function to convert TranslationRow to API format for updates
  const toApiTranslation = (row: TranslationRow, locale: string): TranslationData => {
    const localeKey = `_${locale}`
    return {
      key: row.key,
      translation: row[localeKey] || '',
      type: row.type
    }
  }

  const updateTranslationByKey = async (columnId: string, row: TranslationRow): Promise<{ success: boolean }> => {
    try {
      // columnId is the field that was edited (e.g., "_en", "_de", "_fr")
      // We only update the specific locale that was changed
      if (!columnId.startsWith('_')) {
        // If it's not a locale field (e.g., "key" or "type"), we don't need to call the translation API
        return { success: true }
      }

      const locale = columnId.substring(1) // Remove the underscore prefix to get locale (e.g., "en", "de", "fr")
      const translationData = [toApiTranslation(row, locale)]
      
      const result = await updateTranslation({
        updateTranslation: {
          locale,
          translationData
        }
      })

      return { success: 'data' in result }
    } catch (e) {
      trackError(new GeneralError('Was not able to update Translation'))
      return { success: false }
    }
  }

  return {
    createNewTranslation,
    createLoading,
    deleteTranslationByKey,
    deleteLoading,
    updateTranslationByKey,
    updateLoading
  }
}
