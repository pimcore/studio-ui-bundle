/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface GroupOrderGroup {
  id: number
}

/**
 * Puts the group ids of the store value into the order the layout configures.
 *
 * The value is an object keyed by group id, and JavaScript returns integer-like keys
 * in ascending numeric order, which discards the configured order. Groups the layout
 * does not know keep their relative order behind the configured ones.
 */
export const sortGroupKeys = (groupKeys: string[], layout: GroupOrderGroup[]): string[] => {
  const positions = new Map(layout.map((group, position) => [String(group.id), position]))
  const positionOf = (groupKey: string): number => positions.get(groupKey) ?? layout.length

  return [...groupKeys].sort((a, b) => positionOf(a) - positionOf(b))
}
