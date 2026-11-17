/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray, isObject } from 'lodash'
import type { DefaultOptionType } from 'antd/es/select'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { getOptionsForValues } from '../../select-all-values'

export interface ReorderedTags {
  value: unknown[]
  options: DefaultOptionType[]
}

const getRawValue = (item: unknown): unknown => isObject(item) && 'value' in item ? item.value : item

/** Supports plain values and `labelInValue` entries (`{ value, label }`). */
export const getSortableTagId = (item: unknown): string => String(getRawValue(item))

export const getSortableTagIds = (value: unknown): string[] => isArray(value) ? value.map(getSortableTagId) : []

/**
 * Moves the dragged tag onto the position of the tag it was dropped on.
 * Returns null when nothing changes, so no change event is fired.
 */
export const reorderTags = (
  value: unknown,
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  options?: DefaultOptionType[]
): ReorderedTags | null => {
  if (!isArray(value) || activeId === overId) {
    return null
  }

  const ids = getSortableTagIds(value)
  const oldIndex = ids.indexOf(String(activeId))
  const newIndex = ids.indexOf(String(overId))

  if (oldIndex === -1 || newIndex === -1) {
    return null
  }

  const nextValue = arrayMove(value, oldIndex, newIndex)
  const rawValues = nextValue.map(getRawValue).filter((item): item is string | number => typeof item === 'string' || typeof item === 'number')

  return { value: nextValue, options: getOptionsForValues(options, rawValues) }
}
