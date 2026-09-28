/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isNil, isUndefined } from 'lodash'

export function replaceFileEnding (name: string, ending: string): string {
  const extensionP = name.split('.')
  extensionP[extensionP.length - 1] = ending
  return extensionP.join('.')
}

interface ParsedValue {
  value: string
  /** index of the `;` that starts the next parameter, or -1 when this was the last one */
  next: number
}

/** Reads a quoted-string starting at the opening quote, unescaping `\x` to `x`. */
function readQuotedValue (header: string, openingQuote: number): ParsedValue {
  let value = ''
  let cursor = openingQuote + 1

  while (cursor < header.length && header[cursor] !== '"') {
    const isEscape = header[cursor] === '\\' && cursor + 1 < header.length
    if (isEscape) {
      cursor++
    }
    value += header[cursor]
    cursor++
  }

  return { value, next: header.indexOf(';', cursor) }
}

/** Reads an unquoted token value up to the next `;`. */
function readTokenValue (header: string, start: number): ParsedValue {
  const next = header.indexOf(';', start)
  const value = next === -1 ? header.slice(start) : header.slice(start, next)

  return { value: value.trim(), next }
}

/** Reads the value of a parameter whose `=` sits at the given index. */
function readParameterValue (header: string, equals: number): ParsedValue {
  let start = equals + 1
  while (header[start] === ' ') {
    start++
  }

  return header[start] === '"' ? readQuotedValue(header, start) : readTokenValue(header, start)
}

/**
 * Splits the parameters of a Content-Disposition header into lower-cased names and raw values.
 * A single linear pass that honours quoted strings, so `;` or `\"` inside a quoted value survive.
 */
function parseDispositionParameters (header: string): Map<string, string> {
  const parameters = new Map<string, string>()
  let separator = header.indexOf(';')

  while (separator !== -1) {
    const equals = header.indexOf('=', separator + 1)
    if (equals === -1) {
      break
    }

    const name = header.slice(separator + 1, equals).trim().toLowerCase()
    const { value, next } = readParameterValue(header, equals)
    if (!parameters.has(name)) {
      parameters.set(name, value)
    }
    separator = next
  }

  return parameters
}

/**
 * Decodes an RFC 5987 extended value (`charset'language'percent-encoded`).
 * Supports the two charsets RFC 5987 requires recipients to handle: UTF-8 and ISO-8859-1.
 * Returns undefined for any other charset or a malformed value.
 */
function decodeExtendedValue (extendedValue: string): string | undefined {
  const firstQuote = extendedValue.indexOf("'")
  const secondQuote = firstQuote === -1 ? -1 : extendedValue.indexOf("'", firstQuote + 1)
  if (secondQuote === -1) {
    return undefined
  }

  const charset = extendedValue.slice(0, firstQuote).toLowerCase()
  const encoded = extendedValue.slice(secondQuote + 1)

  try {
    if (charset === 'utf-8') {
      return decodeURIComponent(encoded)
    }

    if (charset === 'iso-8859-1') {
      // every ISO-8859-1 byte maps to the Unicode code point of the same value
      return encoded.replace(/%([0-9a-f]{2})/gi, (_match, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    }
  } catch {
    return undefined
  }

  return undefined
}

/**
 * Extracts the filename a server suggests in a Content-Disposition header.
 * Prefers the RFC 5987 `filename*` form over the plain `filename` form, and falls back to
 * the plain form when the extended one cannot be decoded. Returns undefined when no filename is given.
 */
export function getFilenameFromContentDisposition (header: string | null | undefined): string | undefined {
  if (isNil(header)) {
    return undefined
  }

  const parameters = parseDispositionParameters(header)

  const extendedValue = parameters.get('filename*')
  const decoded = isUndefined(extendedValue) ? undefined : decodeExtendedValue(extendedValue)
  if (!isUndefined(decoded) && !isEmpty(decoded)) {
    return decoded
  }

  const plain = parameters.get('filename')
  return isUndefined(plain) || isEmpty(plain) ? undefined : plain
}

export function saveFileLocal (url: string, name?: string): void {
  const a = document.createElement('a')
  a.download = name ?? ''
  a.href = url
  a.click()
}

/**
 * Performs a HEAD-check before triggering a browser download.
 * Returns false when the server reports the file is unavailable (non-2xx),
 * so the caller can show an appropriate error message.
 * On network errors the download is attempted anyway.
 */
export async function downloadFromUrl (url: string, filename?: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    if (!response.ok) return false
  } catch {
    // Network error — attempt download anyway
  }
  saveFileLocal(url, filename)
  return true
}

/**
 * CDN-safe download: performs a GET availability check against a dedicated
 * endpoint (never the download URL itself) before triggering the browser
 * download. Avoids the HEAD-probe that Fastly turns into an origin GET,
 * which would consume single-use export files before the real download.
 * Returns false when the server reports the file is unavailable.
 * On a network error contacting the check endpoint the download is attempted anyway.
 */
export async function downloadFromUrlWithCheck (
  downloadUrl: string,
  checkUrl: string,
  filename?: string
): Promise<boolean> {
  try {
    const response = await fetch(checkUrl, { headers: { Accept: 'application/json' } })
    if (!response.ok) {
      return false
    }
    const data = await response.json() as { available?: boolean }
    if (data.available !== true) {
      return false
    }
  } catch {
    // Network error on the availability probe — attempt download anyway
  }
  saveFileLocal(downloadUrl, filename)
  return true
}
