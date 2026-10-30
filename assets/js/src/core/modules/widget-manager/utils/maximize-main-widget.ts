/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Actions, BorderNode, Model, type Node, TabSetNode } from 'flexlayout-react'
import { isUndefined } from 'lodash'
import { type WidgetManagerState } from '../widget-manager-slice'
import { restoreCollapsedRows } from './restore-collapsed-rows'

// tabset of the outer layout that holds the inner layout with the main widgets
const MAIN_AREA_ID = 'main_tabset'

export const isMainAreaMaximized = (outerModel: Model): boolean =>
  outerModel.getMaximizedTabset()?.getId() === MAIN_AREA_ID

/** Returns whether the model had a maximized tabset. */
export const clearMaximizedTabset = (model: Model): boolean => {
  const maximized = model.getMaximizedTabset()

  if (isUndefined(maximized)) {
    return false
  }

  model.doAction(Actions.maximizeToggle(maximized.getId()))
  return true
}

const countNodes = (model: Model, type: string): number => {
  let count = 0
  model.visitNodes((node) => { count += node.getType() === type ? 1 : 0 })
  return count
}

const forgetMaximize = (state: WidgetManagerState): void => {
  const innerModel = Model.fromJson(state.innerModel)

  if (clearMaximizedTabset(innerModel)) {
    state.innerModel = restoreCollapsedRows(innerModel.toJson())
  }

  state.maximizeRestoreTabIds = undefined
}

const maximize = (state: WidgetManagerState, nodeId: string): void => {
  const outerModel = Model.fromJson(state.outerModel)
  const innerModel = Model.fromJson(state.innerModel)
  const openSideWidgetIds: string[] = []

  outerModel.getBorderSet().getBorders().forEach((border) => {
    const selected = border.getSelectedNode()

    if (!isUndefined(selected)) {
      openSideWidgetIds.push(selected.getId())
      outerModel.doAction(Actions.selectTab(selected.getId()))
    }
  })

  outerModel.doAction(Actions.maximizeToggle(MAIN_AREA_ID))
  state.outerModel = { ...outerModel.toJson() }
  state.maximizeRestoreTabIds = openSideWidgetIds

  const tabset = innerModel.getNodeById(nodeId)?.getParent()

  // flexlayout only hides sibling tabsets, so an unsplit layout needs no inner maximize
  if (tabset instanceof TabSetNode && !tabset.isMaximized() && countNodes(innerModel, 'tabset') > 1) {
    innerModel.doAction(Actions.maximizeToggle(tabset.getId()))
    state.innerModel = { ...innerModel.toJson() }
  }
}

const restore = (state: WidgetManagerState): void => {
  const outerModel = Model.fromJson(state.outerModel)

  clearMaximizedTabset(outerModel)

  state.maximizeRestoreTabIds?.forEach((id) => {
    const border = outerModel.getNodeById(id)?.getParent()

    if (border instanceof BorderNode && border.getSelectedNode()?.getId() !== id) {
      outerModel.doAction(Actions.selectTab(id))
    }
  })

  state.outerModel = { ...outerModel.toJson() }
  forgetMaximize(state)
}

/**
 * Maximizes the main area: hides the bottom panel, closes the open side widgets and, in a split
 * layout, maximizes the tabset of the given main widget. Toggling again reopens the side widgets.
 */
export const toggleMaximize = (state: WidgetManagerState, nodeId: string): void => {
  if (isMainAreaMaximized(Model.fromJson(state.outerModel))) {
    restore(state)
  } else {
    maximize(state, nodeId)
  }
}

/** A side or bottom widget opened while maximized ends the mode, nothing is reopened later. */
export const endMaximize = (state: WidgetManagerState, outerModel: Model): void => {
  if (isMainAreaMaximized(outerModel)) {
    clearMaximizedTabset(outerModel)
    forgetMaximize(state)
  }
}

/** The outer layout was replaced without the maximized main area, e.g. by a perspective switch. */
export const forgetMaximizeIfEnded = (state: WidgetManagerState): void => {
  if (!isUndefined(state.maximizeRestoreTabIds) && !isMainAreaMaximized(Model.fromJson(state.outerModel))) {
    forgetMaximize(state)
  }
}

/** A main tab opened or selected outside the maximized inner tabset shows both tab groups again. */
export const showMainWidget = (innerModel: Model, node: Node | undefined): void => {
  const maximized = innerModel.getMaximizedTabset()

  if (!isUndefined(maximized) && !isUndefined(node) && node.getParent() !== maximized) {
    clearMaximizedTabset(innerModel)
  }
}

/** Whether closing this main tab empties the maximized tabset or the whole main area. */
export const isLastMaximizedTab = (node: Node): boolean => {
  const tabset = node.getParent()

  return tabset instanceof TabSetNode &&
    tabset.getChildren().length === 1 &&
    (tabset.isMaximized() || countNodes(node.getModel(), 'tab') === 1)
}

export const restoreMaximizeIfMaximized = (state: WidgetManagerState): void => {
  if (isMainAreaMaximized(Model.fromJson(state.outerModel))) {
    restore(state)
  }
}
