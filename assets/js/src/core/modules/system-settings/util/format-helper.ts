/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { type SystemSettingsFormValues } from '../components/system-settings-form/system-settings-form'
import { store } from '@Pimcore/app/store'
import { isArray, isNil } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

export const getInitialFormValues = (): SystemSettingsFormValues => {
  const settings = getSettings(store.getState())

  return {
    general: {
      valid_languages: settings.validLanguages ?? [],
      fallback_languages: transformFallbackLanguagesForForm(settings.fallbackLanguages as Record<string, string> | undefined),
      required_languages: settings.requiredLanguages ?? [],
      default_language: settings.defaultLanguage ?? 'en',
      domain: settings.main_domain ?? '',
      redirect_to_maindomain: settings.redirectToMaindomain ?? false,
      debug_admin_translations: settings.debug_admin_translations ?? false
    },
    objects: settings.objects,
    assets: settings.assets,
    documents: settings.documents,
    email: {
      ...settings.email,
      debug: {
        email_addresses: normalizeEmailAddresses(settings.email?.debug?.email_addresses)
      }
    }
  }
}

const normalizeEmailAddresses = (value: unknown): string[] => {
  if (isArray(value)) return value as string[]
  if (isNonEmptyString(value)) {
    return value.split(',').map((item) => item.trim()).filter(isNonEmptyString)
  }
  return []
}

const transformFallbackLanguagesForForm = (fallbackLanguages: Record<string, string> | undefined): Record<string, string[]> => {
  if (isNil(fallbackLanguages)) return {}

  const transformed: Record<string, string[]> = {}
  Object.keys(fallbackLanguages).forEach(locale => {
    const value = fallbackLanguages[locale]
    transformed[locale] = isNonEmptyString(value) ? value.split(',').map(lang => lang.trim()) : []
  })
  return transformed
}
