/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { isNil } from 'lodash'
import { type DragAndDropInfo } from './droppable'

const elementListSuffix = '-list'

/**
 * Drag type of a multi element drag, e.g. `asset-list`.
 */
export type ElementListDragType = `${ElementType}${typeof elementListSuffix}`

export type ElementDragType = ElementType | ElementListDragType

/**
 * Dragging several elements uses its own drag type instead of an additional
 * field on the existing one.
 *
 * The reason is that `info.type` is not only a routing key, it is the element
 * type: handlers feed it straight into `mapToLegacyElementType()` and compare it
 * against their allowed types. A multi drag announcing itself as `asset` would be
 * indistinguishable from a single asset drag, so every drop target that has not
 * been taught about it - including targets in other bundles - would silently act
 * on one arbitrary element out of the set. With a separate type those targets
 * simply do not accept the drag, and the user sees it being refused.
 */
export const toElementListDragType = (elementType: ElementType): ElementListDragType =>
  `${elementType}${elementListSuffix}`

export const isElementListDragType = (dragType: string): boolean =>
  dragType.endsWith(elementListSuffix)

/**
 * The element type behind a drag type, for both the single and the list form.
 */
export const toElementType = (dragType: string): string =>
  isElementListDragType(dragType)
    ? dragType.slice(0, -elementListSuffix.length)
    : dragType

/**
 * Expands element types to the drag types a multi capable target has to accept,
 * e.g. `['asset']` becomes `['asset', 'asset-list']`.
 */
export const elementDragTypes = (elementTypes: readonly ElementType[]): string[] =>
  elementTypes.flatMap(elementType => [elementType, toElementListDragType(elementType)])

/**
 * True when the drag carries elements of one of the given types, in either form.
 * Targets that only handle single elements must not use this - accepting the list
 * form is an opt in.
 */
export const isElementDrag = (info: DragAndDropInfo, elementTypes: readonly ElementType[]): boolean =>
  elementTypes.includes(toElementType(info.type) as ElementType)

/**
 * The dragged elements, always as a list: one entry for a single element drag,
 * all of them for a list drag. Use this instead of reading `info.data` directly
 * so a handler works with both forms.
 */
export const getDraggedElements = <T = any>(info: DragAndDropInfo): T[] => {
  if (isElementListDragType(info.type)) {
    return Array.isArray(info.data) ? info.data : []
  }

  return isNil(info.data) ? [] : [info.data]
}

export const getDraggedElementCount = (info: DragAndDropInfo): number =>
  getDraggedElements(info).length
