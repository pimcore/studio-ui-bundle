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
import { type IValidationError, type IValidationErrorPathSegment } from '@Pimcore/modules/app/error-handler/types'
import { translateLabel } from '@Pimcore/utils/translate-label'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

const LOCALIZED_FIELDS = 'localizedfields'

const NAMESPACE = 'translation'

export interface IResolvedMessage {
  text: string
  /** The text already names the field: a translation whose template uses `{{field}}`. */
  includesLabel: boolean
}

// i18next also accepts `{{ field }}`, `{{- field}}` and `{{field, format}}`
const FIELD_PLACEHOLDER = /\{\{-?\s*field\s*(,[^}]*)?\}\}/u

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
const findTranslation = (key: string): string | undefined => {
  const resource = findResource(key)

  return isNonEmptyString(resource) && resource !== key ? resource : undefined
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
  const template = isNonEmptyString(key) ? findTranslation(key) : undefined

  if (isNonEmptyString(key) && template !== undefined) {
    const translated = i18n.t(key, {
      replace: { ...error.parameters, field: fieldLabel },
      nsSeparator: false,
      interpolation: { escapeValue: false }
    })

    const usesField = FIELD_PLACEHOLDER.test(template)
    // a template that names the field cannot be used for an error without field
    if (isNonEmptyString(translated) && (!usesField || fieldLabel !== '')) {
      return { text: translated, includesLabel: usesField }
    }
  }

  return { text: error.message, includesLabel: false }
}

interface IFormattedValidationError extends IResolvedMessage {
  location: string[]
  label: string
}

const segmentCrumbs = (segment: IValidationErrorPathSegment): string[] => {
  const crumb = isNonEmptyString(segment.title) ? translateLabel(segment.title) : segment.field
  const crumbs = [isNil(segment.index) ? crumb : `${crumb} #${segment.index + 1}`]

  if (isNonEmptyString(segment.typeTitle)) {
    crumbs.push(translateLabel(segment.typeTitle))
  } else if (isNonEmptyString(segment.type)) {
    crumbs.push(segment.type)
  }

  return crumbs
}

/** Outer levels first; a localized-fields level without title only contributes its language. */
const buildLocation = (path: IValidationErrorPathSegment[]): { location: string[], language?: string } => {
  const location: string[] = []
  let language: string | undefined

  for (const segment of [...path].reverse()) {
    if (isNonEmptyString(segment.language)) {
      language = segment.language.toUpperCase()
    }

    if (segment.field !== LOCALIZED_FIELDS || isNonEmptyString(segment.title)) {
      location.push(...segmentCrumbs(segment))
    }
  }

  return { location, language }
}

// Only the title is a translation key; the technical field name is shown as is.
const getFieldLabel = (error: IValidationError): string => {
  if (isNonEmptyString(error.fieldTitle)) {
    return translateLabel(error.fieldTitle)
  }

  return isNonEmptyString(error.field) ? error.field : ''
}

export const formatValidationError = (error: IValidationError): IFormattedValidationError => {
  const { location, language } = buildLocation(error.path ?? [])
  const fieldLabel = getFieldLabel(error)
  const label = fieldLabel + (isNonEmptyString(language) ? ` (${language})` : '')

  return { location, label, ...resolveValidationMessage(error, label) }
}

export const validationErrorToText = (error: IValidationError): string => {
  const { location, label, text, includesLabel } = formatValidationError(error)
  const parts = includesLabel || label === '' ? location : [...location, label]
  const prefix = parts.join(' › ')

  return prefix === '' ? text : `${prefix}: ${text}`
}
