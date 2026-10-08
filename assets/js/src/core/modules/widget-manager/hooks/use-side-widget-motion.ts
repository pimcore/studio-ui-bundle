/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useState } from 'react'
import { isNull, isUndefined } from 'lodash'
import { type Action, Actions, BorderNode, type Model } from 'flexlayout-react'
import { motionDuration } from '@Pimcore/utils/motion'

export type SideWidgetMotion = 'opening' | 'closing' | null

/**
 * Resolves whether a layout action opens or closes a side bar (flexlayout border).
 * Switching between widgets of an already open side bar does not change the layout, so it is null.
 */
export const getSideWidgetMotion = (model: Model, action: Action): SideWidgetMotion => {
  if (action.type !== Actions.SELECT_TAB) {
    return null
  }

  const node = model.getNodeById(action.data.tabNode as string)
  const border = node?.getParent()

  if (isUndefined(node) || !(border instanceof BorderNode)) {
    return null
  }

  if (border.getSelected() === -1) {
    return 'opening'
  }

  return border.getSelectedNode()?.getId() === node.getId() ? 'closing' : null
}

/** Which side bars of a layout are open, e.g. "100" for an open left and closed right and bottom side bar. */
export const getOpenSideBars = (model: Model): string =>
  model.getBorderSet().getBorders().map((border) => border.getSelected() === -1 ? '0' : '1').join('')

/** Resolves the motion between two states of the open side bars, see getOpenSideBars. */
export const getSideBarsMotion = (previous: string, next: string): SideWidgetMotion => {
  const changes = next.split('').map((open, index) => `${previous[index] ?? '0'}${open}`)

  if (changes.includes('01')) {
    return 'opening'
  }

  return changes.includes('10') ? 'closing' : null
}

/**
 * Tracks a side bar opening or closing for as long as its panel animates, so the main area can
 * resize along with the panel instead of jumping to its new size. Other layout changes (window
 * resizing, splitters, maximizing) stay instant.
 *
 * Side bars are opened by clicking them (layout actions) or from code, e.g. "locate in tree", which
 * replaces the model. So the open side bars are also compared on every render. Both paths mark the
 * motion in the same render as the new layout, so the transition applies to it.
 */
export const useSideWidgetMotion = (model: Model): {
  motion: SideWidgetMotion
  onAction: (action: Action) => void
} => {
  const [state, setState] = useState<{ motion: SideWidgetMotion, id: number }>({ motion: null, id: 0 })
  const openSideBars = getOpenSideBars(model)
  const [trackedOpenSideBars, setTrackedOpenSideBars] = useState(openSideBars)

  const start = (motion: SideWidgetMotion): void => {
    if (!isNull(motion)) {
      setState((current) => ({ motion, id: current.id + 1 }))
    }
  }

  // side bars opened or closed from code are noticed while rendering the new layout
  if (trackedOpenSideBars !== openSideBars) {
    setTrackedOpenSideBars(openSideBars)
    start(getSideBarsMotion(trackedOpenSideBars, openSideBars))
  }

  useEffect(() => {
    if (isNull(state.motion)) {
      return
    }

    const timeout = setTimeout(() => {
      setState((current) => current.id === state.id ? { ...current, motion: null } : current)
    }, state.motion === 'opening' ? motionDuration.panelEnter : motionDuration.panelLeave)

    return () => { clearTimeout(timeout) }
  }, [state.id])

  const onAction = useCallback((action: Action): void => {
    start(getSideWidgetMotion(model, action))
  }, [model])

  return { motion: state.motion, onAction }
}
