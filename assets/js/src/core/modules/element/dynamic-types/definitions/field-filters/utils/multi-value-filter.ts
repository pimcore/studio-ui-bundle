/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const LINE_BREAK = /[\r\n]/
const VALUE_SEPARATOR = /[\r\n\t,;]+/

/**
 * Turns the text of a string filter into the value the API expects.
 *
 * Text on a single line stays what it always was: one value that is searched for as a wildcard.
 * Text that spans several lines - typically a column copied from a spreadsheet - is a list of
 * values, and the rows matching any of them exactly are wanted. Commas, semicolons and tabs only
 * separate values inside such a list, so a single-line search like `Hello, World` is untouched.
 */
export const parseMultiValueFilter = (text: string): string | string[] => {
  const trimmed = text.trim()

  if (!LINE_BREAK.test(trimmed)) {
    return trimmed
  }

  const values = trimmed
    .split(VALUE_SEPARATOR)
    .map((value) => value.trim())
    .filter((value) => value !== '')

  return Array.from(new Set(values))
}

/**
 * The text the editor shows for a filter value: a restored list - saved grid configurations
 * keep the request form of the filter - is shown one value per line.
 */
export const formatMultiValueFilter = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').join('\n')
  }

  return typeof value === 'string' ? value : ''
}

/**
 * The filter value to hand back to the host after the editor was left or confirmed. A restored
 * list whose text was not touched is returned as it was, which keeps a single-value list exact
 * (as text it would be a wildcard search); anything else is the text, parsed on request.
 */
export const resolveEditedMultiValueFilter = (text: string, original: unknown): unknown => {
  if (Array.isArray(original) && text === formatMultiValueFilter(original)) {
    return original
  }

  return text
}
