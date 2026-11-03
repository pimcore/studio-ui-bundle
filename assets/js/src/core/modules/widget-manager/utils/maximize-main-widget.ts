/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Actions, type Model, type Node, TabSetNode } from 'flexlayout-react'
import { isUndefined } from 'lodash'

/** Returns whether the model had a maximized tabset. */
export const clearMaximizedTabset = (model: Model): boolean => {
  const maximized = model.getMaximizedTabset()

  if (isUndefined(maximized)) {
    return false
  }

  model.doAction(Actions.maximizeToggle(maximized.getId()))
  return true
}

const countTabsets = (model: Model): number => {
  let count = 0
  model.visitNodes((node) => { count += node instanceof TabSetNode ? 1 : 0 })
  return count
}

/** In a split main area, lets the tabset of the given main widget fill the whole main area, or undoes it. */
export const toggleMaximize = (model: Model, nodeId: string): void => {
  if (clearMaximizedTabset(model)) {
    return
  }

  const tabset = model.getNodeById(nodeId)?.getParent()

  if (tabset instanceof TabSetNode && countTabsets(model) > 1) {
    model.doAction(Actions.maximizeToggle(tabset.getId()))
  }
}

/** A main tab opened or selected outside the maximized tabset shows all tab groups again. */
export const showMainWidget = (model: Model, node: Node | undefined): void => {
  const maximized = model.getMaximizedTabset()

  if (!isUndefined(maximized) && !isUndefined(node) && node.getParent() !== maximized) {
    clearMaximizedTabset(model)
  }
}

// flexlayout only clears the maximize when it removes the emptied tabset, the main tabset is kept
export const clearEmptyMaximizedTabset = (model: Model): void => {
  if (model.getMaximizedTabset()?.getChildren().length === 0) {
    clearMaximizedTabset(model)
  }
}
