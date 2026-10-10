/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18n from 'i18next'
import { isNil } from 'lodash'
import { type IValidationError } from '@Pimcore/modules/app/error-handler/types'
import { translateLabel } from '@Pimcore/utils/translate-label'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

const LOCALIZED_FIELDS = 'localizedfields'
const OPTIONS = { nsSeparator: false } as const

export interface IFormattedValidationError {
  location: string[]
  fieldLabel: string
  language?: string
  message: string
}

/** Unique message keys without a translation. Only the fixed keys are ever returned, never a message. */
export const getMissingValidationKeys = (errors: IValidationError[]): string[] => {
  const keys = errors.map(error => error.messageKey).filter(isNonEmptyString)

  return [...new Set(keys)].filter(key => !i18n.exists(key, OPTIONS))
}

/**
 * Pure. Translates `messageKey` only when a real translation exists. Never calls `t()` for a missing key (the
 * global missingKey handler would store key -> key); falls back to the plain message instead.
 */
export const resolveValidationMessage = (error: IValidationError, fieldLabel: string): string => {
  const key = error.messageKey

  if (!isNonEmptyString(key)) {
    return error.message
  }

  if (!i18n.exists(key, OPTIONS)) {
    return error.message
  }

  const translated = i18n.t(key, {
    ...error.parameters,
    field: fieldLabel,
    nsSeparator: false,
    interpolation: { escapeValue: false }
  })

  return isNonEmptyString(translated) && translated !== key ? translated : error.message
}

export const formatValidationError = (error: IValidationError): IFormattedValidationError => {
  const location: string[] = []
  let language: string | undefined

  for (const segment of [...(error.path ?? [])].reverse()) {
    if (isNonEmptyString(segment.language)) {
      language = segment.language.toUpperCase()
    }

    if (segment.field === LOCALIZED_FIELDS && !isNonEmptyString(segment.title)) {
      continue
    }

    const crumb = isNonEmptyString(segment.title) ? translateLabel(segment.title) : segment.field
    location.push(isNil(segment.index) ? crumb : `${crumb} #${segment.index + 1}`)

    if (isNonEmptyString(segment.type)) {
      location.push(translateLabel(segment.type))
    }
  }

  const rawLabel = isNonEmptyString(error.fieldTitle) ? error.fieldTitle : error.field
  const fieldLabel = isNonEmptyString(rawLabel) ? translateLabel(rawLabel) : ''

  return { location, fieldLabel, language, message: resolveValidationMessage(error, fieldLabel) }
}

export const validationErrorToText = (error: IValidationError): string => {
  const { location, fieldLabel, language, message } = formatValidationError(error)
  const label = fieldLabel + (isNonEmptyString(language) ? ` (${language})` : '')
  const prefix = [...location, ...(label === '' ? [] : [label])].join(' › ')

  return prefix === '' ? message : `${prefix}: ${message}`
}
