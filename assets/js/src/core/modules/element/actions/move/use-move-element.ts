/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@sdk/app'
import { markNodeDeleting, refreshSourceNode, refreshTargetNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { type Element } from '@Pimcore/modules/element/element-helper'

export type ElementPartial = Pick<Element, 'id' | 'parentId'>

/** Only the id of the target is needed; callers that have the full element may pass it. */
export type MoveTarget = Pick<Element, 'id'> & Partial<ElementPartial>

export interface MoveProps {
  currentElement: ElementPartial
  targetElement: MoveTarget
}

export interface UseMoveElementReturn {
  move: (props: MoveProps) => Promise<void>
}

/**
 * Moves a single element. Extracted from the copy and paste hook so the multi
 * element move can build on it without the two hooks importing each other.
 */
export const useMoveElement = (elementType: ElementType): UseMoveElementReturn => {
  const dispatch = useAppDispatch()
  const { elementPatch } = useElementApi(elementType)

  const move = async (props: MoveProps): Promise<void> => {
    const { currentElement, targetElement } = props
    if (currentElement.id === targetElement.id) {
      return
    }

    try {
      dispatch(markNodeDeleting({ nodeId: String(currentElement.id), elementType, isDeleting: true }))

      const success = await elementPatch({
        body: {
          data: [{
            id: currentElement.id,
            parentId: targetElement.id
          }]
        }
      })

      if (success) {
        dispatch(refreshSourceNode({ nodeId: String(currentElement.parentId), elementType }))
        dispatch(refreshTargetNode({ nodeId: String(targetElement.id), elementType }))
      } else {
        dispatch(markNodeDeleting({ nodeId: String(currentElement.id), elementType, isDeleting: false }))
      }
    } catch (error) {
      console.error('Error moving element', error)
    }
  }

  return { move }
}
