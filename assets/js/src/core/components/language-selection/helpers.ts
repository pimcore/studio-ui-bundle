/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

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

  const match = value.match(/^(.*?)\s*\[(.*?)\]$/)

  if (!match) return { name: value, code: '' }

  return {
    name: match[1],
    code: match[2]
  }
}
