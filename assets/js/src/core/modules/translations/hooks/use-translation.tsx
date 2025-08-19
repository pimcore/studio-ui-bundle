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
import { type TranslationCreate, type TranslationData, useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationUpdateMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { type TranslationRow, type TranslationDataItem } from '../helpers/translation-helpers'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useTranslationDomain } from './translation-domain-provider'

interface UseTranslationReturn {
  createNewTranslation: (key: string) => Promise<{ success: boolean, data?: TranslationDataItem }>
  createLoading: boolean
  deleteTranslationByKey: (key: string) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateTranslationByKey: (columnId: string, row: TranslationRow, domain: string) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useTranslation = (): UseTranslationReturn => {
  const settings = useSettings()
  const { domain } = useTranslationDomain()
  const [createTranslation, { isLoading: createLoading }] = useTranslationCreateMutation()
  const [deleteTranslation, { isLoading: deleteLoading }] = useTranslationDeleteByKeyMutation()
  const [updateTranslation, { isLoading: updateLoading }] = useTranslationUpdateMutation()

  const createNewTranslation = async (key: string): Promise<{ success: boolean, data?: TranslationDataItem }> => {
    try {
      const translationData: TranslationCreate = { translationData: [{ key, type: 'simple', domain }] }
      const result = await createTranslation({ createTranslation: translationData })

      if ('data' in result) {
        const createdTranslation: TranslationDataItem = {
          key: translationData.translationData[0].key,
          type: translationData.translationData[0].type,
          ...settings.validLanguages.reduce((acc, lang) => {
            acc[`_${lang}`] = ''
            return acc
          }, {} satisfies Record<string, string>)
        }
        return { success: true, data: createdTranslation }
      }
    } catch {
      trackError(new GeneralError('Was not able to create Translation'))
    }
    return { success: false }
  }

  const deleteTranslationByKey = async (key: string): Promise<{ success: boolean }> => {
    try {
      const result = await deleteTranslation({ key, domain })
      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to delete Translation'))
      return { success: false }
    }
  }

  const toApiTranslation = (row: TranslationRow, locale: string, domain: string): TranslationData => {
    const localeKey = `_${locale}`
    return {
      key: row.key,
      translation: (row[localeKey] ?? '') as string,
      type: row.type,
      domain
    }
  }

  const updateTranslationByKey = async (columnId: string, row: TranslationRow, domainParam: string): Promise<{ success: boolean }> => {
    try {
      if (columnId === 'type') {
        const rowLocales = Object.keys(row)
          .filter(key => key.startsWith('_'))
          .map(key => key.substring(1))

        if (rowLocales.length > 0) {
          const firstLocale = rowLocales[0]
          const translationData = [toApiTranslation(row, firstLocale, domainParam)]

          const result = await updateTranslation({
            updateTranslation: {
              locale: firstLocale,
              translationData
            }
          })

          return { success: 'data' in result }
        }

        trackError(new GeneralError('No locales found in translation row data'))
        return { success: false }
      }

      const locale = columnId.substring(1)
      const translationData = [toApiTranslation(row, locale, domainParam)]

      const result = await updateTranslation({
        updateTranslation: {
          locale,
          translationData
        }
      })

      return { success: 'data' in result }
    } catch {
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
