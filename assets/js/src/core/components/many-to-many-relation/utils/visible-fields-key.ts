/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString, isUndefined } from 'lodash'
import { mapToElementType, mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'

/**
 * An entry of `visibleFieldsValue` holds the values of one related element and carries that element's id.
 * Relations that may reference documents, assets and objects at once (whose ids can repeat across the
 * element types) also tag the entry with the element type under this key. It is a symbol so neither the
 * search, which matches every value of an entry, nor a serialization of the entries sees it.
 */
export const VISIBLE_FIELDS_ELEMENT_TYPE: unique symbol = Symbol('visibleFieldsElementType')

export type VisibleFieldsKey = number | string

const normalizeElementType = (type: string): string => {
  const elementType = mapToElementType(type)

  return elementType === null ? type : mapToLegacyElementType(elementType)
}

export const getTypedVisibleFieldsKey = (type: string, id: number): string => `${normalizeElementType(type)}:${id}`

/** The key an entry is found under: its element type and id if it is tagged with a type, its id otherwise. */
export const getVisibleFieldsEntryKey = (entry: Record<string | symbol, any>): VisibleFieldsKey | undefined => {
  if (isNil(entry.id)) {
    return undefined
  }

  const type: unknown = entry[VISIBLE_FIELDS_ELEMENT_TYPE]

  return isString(type) ? getTypedVisibleFieldsKey(type, entry.id as number) : entry.id as number
}

export const buildVisibleFieldsLookup = (
  visibleFieldsValue: Array<Record<string, any> | undefined>
): Map<VisibleFieldsKey, Record<string, any>> => {
  const lookup = new Map<VisibleFieldsKey, Record<string, any>>()

  for (const entry of visibleFieldsValue) {
    if (isUndefined(entry) || isNil(entry)) {
      continue
    }

    const key = getVisibleFieldsEntryKey(entry)
    if (!isUndefined(key)) {
      lookup.set(key, entry)
    }
  }

  return lookup
}

/** The entry of a relation row: the one tagged with the row's element type, else the one of its id. */
export const findVisibleFieldsEntry = (
  lookup: Map<VisibleFieldsKey, Record<string, any>> | null | undefined,
  item: { id: number, type: string }
): Record<string, any> | undefined => {
  if (isNil(lookup)) {
    return undefined
  }

  return lookup.get(getTypedVisibleFieldsKey(item.type, item.id)) ?? lookup.get(item.id)
}
