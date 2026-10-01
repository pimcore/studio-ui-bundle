/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { flatMap, isArray, isNil, isNumber, isObject, isString, values } from 'lodash'
import type { ElementCellConfig, ElementInfo } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/element-cell/element-cell'
import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import type { DisplayManyToManyRelationValueItem, ManyToManyRelationValueItem } from '../hooks/use-value'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

export const getElementCellConfig = (disabled?: boolean): ElementCellConfig => {
  return {
    allowedTypes: [],
    getElementInfo: (itemProps: DefaultCellProps): ElementInfo => {
      const element: ManyToManyRelationValueItem = itemProps.row.original as ManyToManyRelationValueItem
      const elementType = mapToElementType(element.type)
      return {
        elementType: elementType ?? undefined,
        // without an id the path tag is not clickable, so a denied element cannot be opened
        id: element.hasViewAccess === false ? undefined : element.id,
        fullPath: element.fullPath,
        published: element.isPublished ?? undefined,
        disabled
      }
    }
  }
}

export const flattenValues = (value: unknown): string[] => {
  if (isNil(value)) return []

  if (isString(value) || isNumber(value)) return [String(value)]

  if (isArray(value)) {
    return flatMap(value, (item) => {
      if (isString(item)) return [item]

      if (isArray(item) || isObject(item)) return flattenValues(item)

      return []
    })
  }

  if (isObject(value)) return values(value).filter(isString)

  return []
}

/**
 * Row identity for the relation grid.
 *
 * Positional rather than the element id: with `allowMultipleAssignments` one element occupies
 * several rows, so element ids are not unique and selecting by id would hit every occurrence.
 * `originalIndex` is the row's position in the unfiltered value when the caller stamps it,
 * otherwise the current index is used.
 *
 * The grid's `setRowId` and its drag handler must both go through this: matching a drag id
 * against `row.id` compares a position against an element id and never hits, which silently
 * turns reordering into a no-op.
 */
export const getRelationRowId = (row: DisplayManyToManyRelationValueItem, index: number): string =>
  String(row.originalIndex ?? index)
