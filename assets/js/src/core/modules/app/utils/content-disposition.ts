/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

/** one `name=value` pair of a Content-Disposition header, its quoting already resolved */
interface ContentDispositionParameter {
  name: string
  value: string
}

/** A single percent-escape, used to reject a truncated or non-hexadecimal one. */
const PERCENT_ESCAPE = /^%[\dA-Fa-f]{2}$/

/** The percent-decoded value read as UTF-8, or nothing when that encoding is malformed. */
const utf8PercentDecoded = (value: string): string | undefined => {
  try {
    return decodeURIComponent(value)
  } catch {
    return undefined
  }
}

/**
 * The percent-decoded value read as ISO-8859-1, where every byte is the code point of the same
 * value — so it cannot fail on a byte sequence the way UTF-8 can, only on a malformed escape.
 */
const latin1PercentDecoded = (value: string): string | undefined => {
  let decoded = ''
  let cursor = 0

  while (cursor < value.length) {
    if (value[cursor] !== '%') {
      decoded += value[cursor]
      cursor += 1
      continue
    }

    const escape = value.slice(cursor, cursor + 3)

    if (!PERCENT_ESCAPE.test(escape)) {
      return undefined
    }

    decoded += String.fromCharCode(parseInt(escape.slice(1), 16))
    cursor += 3
  }

  return decoded
}

/**
 * The value decoded with the charset its `filename*` declares, rather than with UTF-8 regardless:
 * RFC 6266 §4.1 takes its extended form from RFC 5987, whose charset is `UTF-8` or `ISO-8859-1`,
 * and the two disagree on every byte above 0x7F. A charset neither names cannot be decoded, so the
 * extended form is dropped and the plain `filename` supplies the name instead. An absent charset
 * is malformed — the production is `charset'language'value` — and is read as UTF-8 rather than
 * discarded, because that is what a sender omitting it means.
 */
const decodedWithCharset = (charset: string, value: string): string | undefined => {
  const declared = charset.trim().toLowerCase()

  if (declared === '' || declared === 'utf-8') {
    return utf8PercentDecoded(value)
  }

  if (declared === 'iso-8859-1') {
    return latin1PercentDecoded(value)
  }

  return undefined
}

/** Where the value starts: RFC 6266 allows whitespace on either side of the `=`. */
const valueStart = (header: string, equals: number): number => {
  let cursor = equals + 1

  while (cursor < header.length && /\s/.test(header[cursor])) {
    cursor += 1
  }

  return cursor
}

/**
 * A quoted-string value, read from its opening quote: a `;` inside it separates nothing and a
 * `\` escapes the character after it. An unterminated quote yields what there is rather than
 * swallowing the rest of the header.
 */
const readQuotedValue = (header: string, start: number): { value: string, next: number } => {
  let value = ''
  let cursor = start + 1

  while (cursor < header.length) {
    if (header[cursor] === '\\' && cursor + 1 < header.length) {
      value += header[cursor + 1]
      cursor += 2
      continue
    }

    if (header[cursor] === '"') {
      return { value, next: cursor + 1 }
    }

    value += header[cursor]
    cursor += 1
  }

  return { value, next: cursor }
}

/** An unquoted token value, which ends at the next `;` or at the end of the header. */
const readBareValue = (header: string, start: number): { value: string, next: number } => {
  const semicolon = header.indexOf(';', start)
  const end = semicolon === -1 ? header.length : semicolon

  return { value: header.slice(start, end).trim(), next: end }
}

/**
 * The header's parameters, tokenized with the quoting rules of RFC 6266 §4.1 rather than searched
 * for: a parameter name is the WHOLE token in front of its `=`, so `x-filename` is never read as
 * `filename`, and a `;` or a `filename*=` sitting inside a quoted value is part of that value and
 * never starts a parameter of its own. Segments carrying no `=` — the disposition type itself —
 * are skipped. Names come back lower-cased, because parameter names are case-insensitive.
 */
const contentDispositionParameters = (header: string): ContentDispositionParameter[] => {
  const parameters: ContentDispositionParameter[] = []
  let cursor = 0

  while (cursor < header.length) {
    const equals = header.indexOf('=', cursor)
    const semicolon = header.indexOf(';', cursor)

    if (equals === -1 || (semicolon !== -1 && semicolon < equals)) {
      if (semicolon === -1) {
        break
      }

      cursor = semicolon + 1
      continue
    }

    const start = valueStart(header, equals)
    const { value, next } = header[start] === '"'
      ? readQuotedValue(header, start)
      : readBareValue(header, start)

    parameters.push({ name: header.slice(cursor, equals).trim().toLowerCase(), value })

    const following = header.indexOf(';', next)

    if (following === -1) {
      break
    }

    cursor = following + 1
  }

  return parameters
}

/**
 * The name an extended `filename*` carries: `charset'language'percent-encoded-value`, decoded with
 * the charset it declares. Undefined when either mandatory quote is missing, the charset is one
 * this parser cannot decode, or the encoding is malformed.
 */
const extendedFilename = (value: string): string | undefined => {
  const parts = value.split("'")

  return parts.length < 3 ? undefined : decodedWithCharset(parts[0], parts.slice(2).join("'"))
}

/** A name a download can be saved under: its last path segment, or nothing when that is unusable. */
const saveableFilename = (value: string | undefined): string | undefined => {
  if (isNil(value)) {
    return undefined
  }

  const name = value.trim().split(/[/\\]/).pop()?.trim() ?? ''

  return name === '' || name === '.' || name === '..' ? undefined : name
}

/**
 * The name the response asks to be saved under, read per RFC 6266: the extended `filename*`
 * form wins over the plain one wherever each appears in the header, its percent-encoding is
 * decoded with the charset it declares, and a quoted name keeps any semicolon that sits inside
 * the quotes. Undefined when
 * the header names nothing a file can be saved under, so the caller's own name is used.
 */
export const parseContentDispositionFilename = (header: string): string | undefined => {
  const parameters = contentDispositionParameters(header)
  const extended = parameters.find(({ name }) => name === 'filename*')
  const plain = parameters.find(({ name }) => name === 'filename')

  const candidates = [
    isNil(extended) ? undefined : extendedFilename(extended.value),
    isNil(plain) ? undefined : plain.value
  ]

  return candidates.map(saveableFilename).find((name) => !isNil(name))
}
