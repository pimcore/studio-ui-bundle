/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useRef, useState } from 'react'
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

/**
 * Tracks a side bar opening or closing for as long as its panel animates, so the main area can
 * resize along with the panel instead of jumping to its new size. Other layout changes (window
 * resizing, splitters, maximizing) stay instant.
 */
export const useSideWidgetMotion = (model: Model): {
  motion: SideWidgetMotion
  onAction: (action: Action) => void
} => {
  const [motion, setMotion] = useState<SideWidgetMotion>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (!isNull(timeoutRef.current)) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const onAction = useCallback((action: Action): void => {
    const nextMotion = getSideWidgetMotion(model, action)

    if (isNull(nextMotion)) {
      return
    }

    if (!isNull(timeoutRef.current)) {
      clearTimeout(timeoutRef.current)
    }

    setMotion(nextMotion)

    timeoutRef.current = setTimeout(() => {
      setMotion(null)
      timeoutRef.current = null
    }, nextMotion === 'opening' ? motionDuration.panelEnter : motionDuration.panelLeave)
  }, [model])

  return { motion, onAction }
}
