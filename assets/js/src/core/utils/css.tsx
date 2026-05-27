/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'

export const toCssDimension = (value?: number | string | null, fallback?: number | string): string | undefined => {
  if (value === null || value === undefined || value === '' || value === 0) {
    if (fallback === undefined) {
      return undefined
    }
    value = fallback
  }

  return typeof value === 'number' ? `${value}px` : value
}

const kebabToCamel = (property: string): string =>
  property.replace(/-([a-z])/g, (_match, char: string) => char.toUpperCase())

/**
 * Parse an inline CSS declaration string (e.g. `"float: left; margin: 10px;"`)
 * into a React `CSSProperties` object. Malformed declarations are dropped
 * silently; the resulting object only contains the declarations that parsed
 * cleanly. Returns `undefined` when the input is empty or nothing parses,
 * so callers can spread/skip without an extra check.
 */
export const parseInlineCss = (value?: string | null): React.CSSProperties | undefined => {
  if (value === null || value === undefined || value.trim() === '') {
    return undefined
  }

  try {
    const result: Record<string, string> = {}

    for (const declaration of value.split(';')) {
      const trimmed = declaration.trim()
      if (trimmed === '') {
        continue
      }

      const colonIndex = trimmed.indexOf(':')
      if (colonIndex <= 0) {
        continue
      }

      const rawProperty = trimmed.slice(0, colonIndex).trim()
      const rawValue = trimmed.slice(colonIndex + 1).trim()
      if (rawProperty === '' || rawValue === '') {
        continue
      }

      const property = rawProperty.startsWith('--') ? rawProperty : kebabToCamel(rawProperty)
      result[property] = rawValue
    }

    return Object.keys(result).length > 0 ? result as React.CSSProperties : undefined
  } catch {
    return undefined
  }
}
