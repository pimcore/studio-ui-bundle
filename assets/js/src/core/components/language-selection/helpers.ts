/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The key the backend uses for the language independent ("default") value of a localized field.
export const LANGUAGE_INDEPENDENT_KEY = 'default'

/**
 * Tells whether the language independent ("default") value of a localized field may be used for a
 * given workspace language permission (`localizedView` / `localizedEdit`). It is available unless
 * the configured language list explicitly leaves it out - an unset or empty permission means no
 * restriction at all.
 */
export const isLanguageIndependentValueAllowed = (languagePermission?: string | null): boolean => {
  const languages = languagePermission?.split(',').filter((language) => language !== '') ?? []

  return languages.length === 0 || languages.includes(LANGUAGE_INDEPENDENT_KEY)
}

/**
 * The concrete languages named by a workspace language permission, ignoring the language
 * independent ("default") key - that one is not a content language and is handled by
 * {@link isLanguageIndependentValueAllowed}.
 */
const concreteLanguagesOf = (languagePermission?: string | null): string[] =>
  languagePermission?.split(',').filter(
    (language) => language !== '' && language !== LANGUAGE_INDEPENDENT_KEY
  ) ?? []

/**
 * Narrows the user's content languages to those a workspace language permission
 * (`localizedView` / `localizedEdit`) allows.
 *
 * A permission that is unset, empty, or names only the language independent value is no
 * restriction on concrete languages, so every content language stays available.
 */
export const resolveAllowedLanguages = (
  languagePermission: string | null | undefined,
  contentLanguages: string[]
): string[] => {
  const allowed = concreteLanguagesOf(languagePermission)

  if (allowed.length === 0) {
    return contentLanguages
  }

  return contentLanguages.filter((language) => allowed.includes(language))
}

/**
 * Tells whether a single language may be edited under a workspace language permission.
 *
 * Kept separate from {@link resolveAllowedLanguages} because an unrestricted permission must
 * leave the field editable regardless of whether the language is one of the user's content
 * languages - the field is already open, and the permission is not what closes it.
 */
export const isLanguageEditable = (
  languagePermission: string | null | undefined,
  language: string
): boolean => {
  const editable = concreteLanguagesOf(languagePermission)

  return editable.length === 0 || editable.includes(language)
}

export const transformLanguage = (lang: string): string | null => lang === '-' ? null : lang

// Transforms a locale of type "en-US" into "en_US", and "en" into "EN"
export const formatLocaleKey = (code: string): string => {
  if (!code || code === '-') return code

  const [lang, region] = code.split('-')

  if (!region) return lang.toUpperCase()

  return `${lang}_${region}`
}

// Transforms a locale of type "English [en]" into an object containing name and code
export const parseLocaleLabel = (value?: string): { name: string, code: string } | null => {
  if (!value) return null

  const openBracketIndex = value.lastIndexOf('[')
  const closeBracketIndex = value.lastIndexOf(']')

  if (openBracketIndex === -1 || closeBracketIndex === -1 || closeBracketIndex < openBracketIndex) {
    return { name: value, code: '' }
  }

  return {
    name: value?.slice(0, openBracketIndex)?.trim(),
    code: value?.slice(openBracketIndex + 1, closeBracketIndex)?.trim()
  }
}
