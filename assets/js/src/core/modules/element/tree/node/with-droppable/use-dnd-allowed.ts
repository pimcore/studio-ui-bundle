/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStore } from 'react-redux'
import { selectNodeState } from '@Pimcore/components/element-tree/element-tree-slice'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'
import { isDndSourceAllowed, isDndTargetAllowed } from './permission-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'

/**
 * Hook that provides functions to check if drag and drop operations are allowed.
 * This includes checking both element permissions and tree node locked state from Redux.
 */
export const useDndAllowed = (): {
  isSourceAllowed: (sourceElement: Element) => boolean
  isTargetAllowed: (targetElement: Element) => boolean
} => {
  const { treeId } = useTreeId()
  const store = useStore()

  const isSourceAllowed = (sourceElement: Element): boolean => {
    if (!isDndSourceAllowed(sourceElement)) {
      return false
    }

    const state = store.getState() as Record<string, any>
    const sourceNodeState = selectNodeState(state, treeId, sourceElement.id.toString())
    const isSourceNodeLocked = Boolean(sourceNodeState?.treeNodeProps?.isLocked)

    return !isSourceNodeLocked
  }

  const isTargetAllowed = (targetElement: Element): boolean => {
    return isDndTargetAllowed(targetElement)
  }

  return { isSourceAllowed, isTargetAllowed }
}
