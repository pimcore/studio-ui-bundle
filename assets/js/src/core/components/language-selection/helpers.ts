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
