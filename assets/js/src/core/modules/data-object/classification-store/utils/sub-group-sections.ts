/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface SubGroupSection<TItem> {
  /** Identifier of the sub group, null for the items that carry none. */
  identifier: string | null
  items: TItem[]
}

export interface BuildSubGroupSectionsProps<TItem> {
  items: TItem[]
  getSubGroup: (item: TItem) => string | null | undefined
  /** Identifiers to lead with, in their own order; the rest follow by first item. */
  order?: string[]
}

/**
 * Splits items into one section per sub group, with the items that carry no sub group last.
 *
 * Without an `order` the sections follow the sub group of the first item carrying it, which is
 * the order the backend uses for a group layout. Identifiers that `order` does not list — a
 * sub group that has since left the store's vocabulary — follow the listed ones, so a key never
 * drops out of sight.
 */
export const buildSubGroupSections = <TItem>({
  items,
  getSubGroup,
  order
}: BuildSubGroupSectionsProps<TItem>): Array<SubGroupSection<TItem>> => {
  const byIdentifier = new Map<string, TItem[]>()
  const unassigned: TItem[] = []

  for (const item of items) {
    const identifier = getSubGroup(item)

    if (identifier === null || identifier === undefined || identifier === '') {
      unassigned.push(item)
      continue
    }

    const section = byIdentifier.get(identifier)

    if (section === undefined) {
      byIdentifier.set(identifier, [item])
    } else {
      section.push(item)
    }
  }

  const identifiers = [...byIdentifier.keys()]
  const ordered = order === undefined
    ? identifiers
    : [
        ...order.filter((identifier) => byIdentifier.has(identifier)),
        ...identifiers.filter((identifier) => !order.includes(identifier))
      ]

  const sections: Array<SubGroupSection<TItem>> = ordered.map((identifier) => ({
    identifier,
    items: byIdentifier.get(identifier)!
  }))

  if (unassigned.length > 0) {
    sections.push({ identifier: null, items: unassigned })
  }

  return sections
}
