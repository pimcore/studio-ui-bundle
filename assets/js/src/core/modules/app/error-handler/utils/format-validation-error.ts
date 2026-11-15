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

const MESSAGE_KEY = /^[\w.-]{1,190}$/u

// i18next also accepts `{{ field }}`, `{{- field}}` and `{{field, format}}`
const PLACEHOLDER = /\{\{-?\s*([\p{L}\p{N}_.-]+)\s*(?:,[^}]*)?\}\}/gu
const FIELD_PLACEHOLDER = /\{\{-?\s*field\s*(?:,[^}]*)?\}\}/u

const stringify = (value: unknown): string => {
  if (isNil(value)) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return value.toString()
  }

  // objects and arrays explicitly as JSON, never as `[object Object]`; symbols and functions have no useful text
  return typeof value === 'object' ? (JSON.stringify(value) ?? '') : ''
}

// One pass over the template: a value is never scanned again, so entered text such as `{{field}}` stays as typed.
const interpolate = (template: string, values: Record<string, unknown>): string =>
  template.replace(PLACEHOLDER, (_match, name: string) => stringify(values[name]))

// The backend clears the parameters of languages the user cannot view: a template is only usable when it gets all of them.
const hasAllParameters = (template: string, values: Record<string, unknown>): boolean =>
  [...template.matchAll(PLACEHOLDER)].every(match => !isNil(values[match[1]]))

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

/**
 * The first real translation along the language chain: a non-empty resource that is not just the key (missingKey
 * handler / empty DB rows). An unusable entry in the current language does not hide a valid fallback.
 */
const findTranslation = (key: string): string | undefined => {
  for (const language of i18n.languages ?? [i18n.language]) {
    const resource: unknown = i18n.getResource(language, NAMESPACE, key)
    if (isNonEmptyString(resource) && resource !== key) {
      return resource
    }
  }

  return undefined
}

/** Unique message keys without any resource. Only the fixed keys are returned, never a message. */
export const getMissingValidationKeys = (errors: IValidationError[]): string[] => {
  // only well-formed keys: they end up as translation rows
  const keys = errors.map(error => error.messageKey).filter(isNonEmptyString).filter(key => MESSAGE_KEY.test(key))

  return [...new Set(keys)].filter(key => isNil(findResource(key)))
}

/** Registers unknown message keys (never the messages) so admins can translate them: through the missingKey event, as i18n-api.ts does. */
export const reportMissingValidationKeys = (errors: IValidationError[]): void => {
  getMissingValidationKeys(errors).forEach(key => {
    i18n.emit('missingKey', [i18n.language], NAMESPACE, key, key)
  })
}

/**
 * Translates `messageKey` only when a real translation exists, decided from the raw resource (reads the global
 * i18n state). Never calls `t()` (the global missingKey handler would store key -> key) and does not hand the
 * values to i18next: they are filled in here, so server sent parameter names cannot act as i18next options and
 * a value cannot be mistaken for a placeholder.
 */
export const resolveValidationMessage = (error: IValidationError, fieldLabel: string): IResolvedMessage => {
  const key = error.messageKey
  const template = isNonEmptyString(key) ? findTranslation(key) : undefined

  const values = { ...error.parameters, field: fieldLabel }

  if (isNonEmptyString(key) && template !== undefined && hasAllParameters(template, values)) {
    const translated = interpolate(template, values)

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
  const suffix = isNonEmptyString(language) ? ` (${language})` : ''

  let label = fieldLabel + suffix
  if (fieldLabel === '' && location.length > 0) {
    // without a field the language belongs to the innermost location crumb
    location[location.length - 1] += suffix
    label = ''
  } else if (fieldLabel === '') {
    label = suffix.trim()
  }

  // a language alone is no field: templates that name the field then fall back to the plain message
  return { location, label, ...resolveValidationMessage(error, fieldLabel === '' ? '' : label) }
}

export const validationErrorToText = (error: IValidationError): string => {
  const { location, label, text, includesLabel } = formatValidationError(error)
  const parts = includesLabel || label === '' ? location : [...location, label]
  const prefix = parts.join(' › ')

  return prefix === '' ? text : `${prefix}: ${text}`
}
