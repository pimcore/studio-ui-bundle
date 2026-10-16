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
