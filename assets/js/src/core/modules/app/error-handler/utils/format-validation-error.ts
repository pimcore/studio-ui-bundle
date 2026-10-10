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

const NAMESPACE = 'translation'

export interface IResolvedMessage {
  text: string
  translated: boolean
}

// Walks the current language and its fallbacks. Deliberately no import from app/i18n or the store:
// this module is part of the error handler, which those modules import themselves.
const findResource = (key: string): unknown => {
  for (const language of i18n.languages ?? [i18n.language]) {
    const resource: unknown = i18n.getResource(language, NAMESPACE, key)
    if (resource !== undefined) {
      return resource
    }
  }

  return undefined
}

/** A real translation: a non-empty resource that is not just the key (missingKey handler / empty DB rows). */
const hasTranslation = (key: string): boolean => {
  const resource = findResource(key)

  return isNonEmptyString(resource) && resource !== key
}

/** Unique message keys without any resource. Only the fixed keys are returned, never a message. */
export const getMissingValidationKeys = (errors: IValidationError[]): string[] => {
  const keys = errors.map(error => error.messageKey).filter(isNonEmptyString)

  return [...new Set(keys)].filter(key => isNil(findResource(key)))
}

/**
 * Pure. Translates `messageKey` only when a real translation exists, decided from the raw resource. Never calls
 * `t()` otherwise (the global missingKey handler would store key -> key). Values go in via `replace`, so server
 * sent parameter names cannot act as i18next options.
 */
export const resolveValidationMessage = (error: IValidationError, fieldLabel: string): IResolvedMessage => {
  const key = error.messageKey

  if (isNonEmptyString(key) && hasTranslation(key)) {
    const translated = i18n.t(key, {
      replace: { ...error.parameters, field: fieldLabel },
      nsSeparator: false,
      interpolation: { escapeValue: false }
    })

    if (isNonEmptyString(translated)) {
      return { text: translated, translated: true }
    }
  }

  return { text: error.message, translated: false }
}

interface IFormattedValidationError extends IResolvedMessage {
  location: string[]
  label: string
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

    if (isNonEmptyString(segment.typeTitle)) {
      location.push(translateLabel(segment.typeTitle))
    } else if (isNonEmptyString(segment.type)) {
      location.push(segment.type)
    }
  }

  // Only the title is a translation key; the technical field name is shown as is.
  let fieldLabel = ''
  if (isNonEmptyString(error.fieldTitle)) {
    fieldLabel = translateLabel(error.fieldTitle)
  } else if (isNonEmptyString(error.field)) {
    fieldLabel = error.field
  }

  const label = fieldLabel + (isNonEmptyString(language) ? ` (${language})` : '')

  return { location, label, ...resolveValidationMessage(error, label) }
}

export const validationErrorToText = (error: IValidationError): string => {
  const { location, label, text, translated } = formatValidationError(error)
  // A translated message already contains the label; the plain message does not.
  const parts = translated || label === '' ? location : [...location, label]
  const prefix = parts.join(' › ')

  return prefix === '' ? text : `${prefix}: ${text}`
}
