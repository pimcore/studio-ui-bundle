/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const createCollator = (lng?: string): Intl.Collator => {
  // Pimcore stores locales as `pt_BR` / `zh_Hans`, Intl only accepts BCP 47 tags (`pt-BR`).
  const locale = lng?.replaceAll('_', '-')

  try {
    return new Intl.Collator(locale === '' ? undefined : locale, { sensitivity: 'base' })
  } catch {
    // Malformed locale tag — Intl throws a RangeError. Sort with the default locale instead of crashing.
    return new Intl.Collator(undefined, { sensitivity: 'base' })
  }
}

/**
 * Sorts items alphabetically by their (already translated) label — case-insensitive and
 * locale-aware in the given UI language. Returns a new array.
 */
export const sortByLabel = <T extends { label: string }>(items: T[], lng?: string): T[] => {
  const collator = createCollator(lng)

  return [...items].sort((a, b) => collator.compare(a.label, b.label))
}
