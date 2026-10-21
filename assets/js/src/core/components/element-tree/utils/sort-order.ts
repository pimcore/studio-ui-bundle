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

export interface SortableElement {
  index?: number | null
}

/**
 * Orders a dragged set the way it should be inserted.
 *
 * A selection can be collected in any order - modifier clicks follow the clicks,
 * not the tree - so the set is ordered by the position the elements already have.
 * That keeps their relative order unchanged, which is the least surprising result
 * of a sort. Elements without an index keep their given order and go last.
 */
export const orderForSorting = <T extends SortableElement>(elements: readonly T[]): T[] => {
  return [...elements]
    .map((element, position) => ({ element, position }))
    .sort((first, second) => {
      const firstIndex = first.element.index
      const secondIndex = second.element.index

      if (isNil(firstIndex) && isNil(secondIndex)) {
        return first.position - second.position
      }

      if (isNil(firstIndex)) {
        return 1
      }

      if (isNil(secondIndex)) {
        return -1
      }

      return firstIndex === secondIndex
        ? first.position - second.position
        : firstIndex - secondIndex
    })
    .map(({ element }) => element)
}
