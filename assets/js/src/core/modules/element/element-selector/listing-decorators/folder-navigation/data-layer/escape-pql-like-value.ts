/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Escapes a value for safe interpolation into a double-quoted PQL LIKE string, so a folder
 * name containing a quote or a wildcard metacharacter can't break out of the literal or widen
 * the match. Two escaping layers apply, in this order:
 * - Backslash, "*" and "?" are backslash-escaped, since PQL's LIKE compiles to an OpenSearch
 *   wildcard query where those are metacharacters (escape backslash first, so the backslashes
 *   this introduces for "*"/"?" aren't themselves re-escaped).
 * - A literal '"' is doubled, which is PQL's own escape for a quote inside a double-quoted
 *   string literal.
 */
export const escapePqlLikeValue = (value: string): string =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\*/g, '\\*')
    .replace(/\?/g, '\\?')
    .replace(/"/g, '""')
