/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, uniq } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { markNodeDeleting, refreshSourceNode, refreshTargetNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { ElementMoveJob } from '@Pimcore/modules/execution-engine/jobs/move/element-move-job'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useCopyPaste } from '../copy-paste/use-copy-paste'

type ElementPartial = Pick<Element, 'id' | 'parentId'>

export interface MoveMultipleProps {
  currentElements: ElementPartial[]
  targetElement: ElementPartial
}

export interface UseMoveElementsReturn {
  moveMultiple: (props: MoveMultipleProps) => Promise<void>
}

export const useMoveElements = (elementType: ElementType): UseMoveElementsReturn => {
  const dispatch = useAppDispatch()
  const executionEngine = useExecutionEngine()
  const { move } = useCopyPaste(elementType)

  /**
   * Moves several elements into one target.
   *
   * Runs as a single job, so progress and the per element error list come from the
   * execution engine. Both sides are refreshed once the job reports back, which
   * also clears the deleting marker of elements that could not be moved.
   */
  const moveMultiple = async (props: MoveMultipleProps): Promise<void> => {
    const { currentElements, targetElement } = props

    const elements = currentElements.filter(element => element.id !== targetElement.id)

    if (elements.length === 0) {
      return
    }

    // A single element is patched synchronously and returns no job to follow, so
    // it keeps using the existing path.
    if (elements.length === 1) {
      await move({ currentElement: elements[0], targetElement })

      return
    }

    const sourceParentIds = uniq(
      elements
        .map(element => element.parentId)
        .filter(parentId => !isNil(parentId))
        .map(parentId => String(parentId))
    )

    elements.forEach(element => {
      dispatch(markNodeDeleting({ nodeId: String(element.id), elementType, isDeleting: true }))
    })

    const job = new ElementMoveJob({
      elementType,
      items: elements.map(element => ({ id: Number(element.id), parentId: Number(targetElement.id) })),
      onFinish: async () => {
        sourceParentIds.forEach(parentId => {
          dispatch(refreshSourceNode({ nodeId: parentId, elementType }))
        })

        dispatch(refreshTargetNode({ nodeId: String(targetElement.id), elementType }))
      }
    })

    await executionEngine.runJob(job)
  }

  return { moveMultiple }
}
