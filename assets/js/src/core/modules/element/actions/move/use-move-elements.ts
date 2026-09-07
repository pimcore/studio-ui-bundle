/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined, uniq } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { useAppDispatch } from '@sdk/app'
import { markNodesDeleting, refreshSourceNode, refreshTargetNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { ElementMoveJob } from '@Pimcore/modules/execution-engine/jobs/move/element-move-job'
import { type MoveTarget, useMoveElement } from './use-move-element'

/** An element to move; the parent is only needed to refresh where it came from. */
export interface MoveElementRef {
  id: number | string
  parentId?: number | string | null
}

export interface MoveMultipleProps {
  currentElements: MoveElementRef[]
  targetElement: MoveTarget
  /** Dragged elements the target could not take, so the user is told about them. */
  skippedCount?: number
}

export interface SortMultipleProps {
  /** Already in the order they should end up in. */
  currentElements: MoveElementRef[]
  /** Dragged elements the target could not take, so the user is told about them. */
  skippedCount?: number
  /** The parent the elements are sorted into. */
  targetElement: MoveTarget
  /** Index of the first element; the rest follow consecutively. */
  startIndex: number
}

export interface UseMoveElementsReturn {
  moveMultiple: (props: MoveMultipleProps) => Promise<void>
  sortMultiple: (props: SortMultipleProps) => Promise<void>
}

export const useMoveElements = (elementType: ElementType): UseMoveElementsReturn => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const modal = useAlertModal()
  const executionEngine = useExecutionEngine()
  const { move } = useMoveElement(elementType)

  /**
   * A dragged selection can hold elements the drop filtered out - locked, or not
   * editable by this user. Dropping fewer than were dragged is not obvious, so it
   * is said out loud.
   */
  const reportSkipped = (skippedCount?: number): void => {
    if (isUndefined(skippedCount) || skippedCount < 1) {
      return
    }

    modal.warn({
      content: t('element.tree.move.skipped-elements', { count: skippedCount })
    })
  }

  /**
   * Moves several elements into one target.
   *
   * Runs as a single job, so progress and the per element error list come from the
   * execution engine. Both sides are refreshed once the job reports back, which
   * also clears the deleting marker of elements that could not be moved.
   */
  const moveMultiple = async (props: MoveMultipleProps): Promise<void> => {
    const { currentElements, targetElement } = props

    reportSkipped(props.skippedCount)

    const elements = currentElements.filter(element => element.id !== targetElement.id)

    if (elements.length === 0) {
      return
    }

    // A single element is patched synchronously and returns no job to follow, so
    // it keeps using the existing path.
    const singleElement = elements.length === 1 ? elements[0] : undefined

    if (!isUndefined(singleElement) && !isNil(singleElement.parentId)) {
      await move({
        currentElement: { id: Number(singleElement.id), parentId: Number(singleElement.parentId) },
        targetElement
      })

      return
    }

    const sourceParentIds = uniq(
      elements
        .map(element => element.parentId)
        .filter(parentId => !isNil(parentId))
        .map(parentId => String(parentId))
    )

    dispatch(markNodesDeleting({
      nodeIds: elements.map(element => String(element.id)),
      elementType,
      isDeleting: true
    }))

    const job = new ElementMoveJob({
      elementType,
      items: elements.map(element => ({ id: Number(element.id), parentId: Number(targetElement.id) })),
      onFinish: async () => {
        // The target gets its own refresh, so refreshing it as a source as well
        // would make the same node fetch its children twice.
        sourceParentIds
          .filter(parentId => parentId !== String(targetElement.id))
          .forEach(parentId => {
            dispatch(refreshSourceNode({ nodeId: parentId, elementType }))
          })

        dispatch(refreshTargetNode({ nodeId: String(targetElement.id), elementType }))
      }
    })

    await executionEngine.runJob(job)
  }

  /**
   * Places several elements at consecutive positions among their new siblings, in
   * one job.
   *
   * Indexes are plain values in Pimcore - nothing renumbers siblings on save - so
   * the elements that were pushed aside keep their old positions and may end up
   * sharing an index with a moved element. That matches how sorting by index has
   * always behaved; only the dragged set is renumbered.
   */
  const sortMultiple = async (props: SortMultipleProps): Promise<void> => {
    const { currentElements, targetElement, startIndex } = props

    reportSkipped(props.skippedCount)

    if (currentElements.length === 0) {
      return
    }

    const sourceParentIds = uniq(
      currentElements
        .map(element => element.parentId)
        .filter(parentId => !isNil(parentId))
        .map(parentId => String(parentId))
    )

    dispatch(markNodesDeleting({
      nodeIds: currentElements.map(element => String(element.id)),
      elementType,
      isDeleting: true
    }))

    const job = new ElementMoveJob({
      elementType,
      items: currentElements.map((element, position) => ({
        id: Number(element.id),
        parentId: Number(targetElement.id),
        index: startIndex + position
      })),
      onFinish: async () => {
        // The target gets its own refresh, so refreshing it as a source as well
        // would make the same node fetch its children twice.
        sourceParentIds
          .filter(parentId => parentId !== String(targetElement.id))
          .forEach(parentId => {
            dispatch(refreshSourceNode({ nodeId: parentId, elementType }))
          })

        dispatch(refreshTargetNode({ nodeId: String(targetElement.id), elementType }))
      }
    })

    await executionEngine.runJob(job)
  }

  return { moveMultiple, sortMultiple }
}
