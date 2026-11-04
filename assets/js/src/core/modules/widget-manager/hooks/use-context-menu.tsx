/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import React, { useEffect, useRef, useState, useMemo, type KeyboardEvent } from 'react'
import { type Model, TabNode } from 'flexlayout-react'
import type { MenuRef } from 'antd'
import { isNull, isUndefined } from 'lodash'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { useClickOutside } from '@Pimcore/utils/hooks/use-click-outside'

interface UseContextMenuReturn {
  showContextMenu?: (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  dropdown?: React.ReactElement | null
}

export interface ContextMenuState {
  x: number
  y: number
  tabNode: TabNode
}

export interface CreateContextMenuItemsProps {
  contextMenuState: ContextMenuState
  closeContextMenu: () => void
  model: Model
  closeWidget: (id: string) => void
}

interface OpenContextMenuState extends ContextMenuState {
  openedByKeyboard: boolean
}

// a menu action can close or remount the opening tab, then the active main tab takes the focus
const returnFocus = (opener: Element): void => {
  const target = opener.isConnected
    ? opener
    : document.querySelector('.widget-manager-tab-title--active-main .widget-manager__tab-title-close-button')

  if (target instanceof HTMLElement) {
    target.focus()
  }
}

export const useContextMenu = (
  model: Model,
  createContextMenuItems?: ({ contextMenuState, closeContextMenu, model, closeWidget }: CreateContextMenuItemsProps) => DropdownProps['menu']['items']
): UseContextMenuReturn => {
  const [contextMenuState, setContextMenuState] = useState<OpenContextMenuState | null>(null)
  const dropdownRef = useRef<MenuRef>(null)
  const keyboardOpenerRef = useRef<Element | null>(null)
  const { closeWidget } = useWidgetManager()

  const dismissContextMenu = (): void => {
    keyboardOpenerRef.current = null
    setContextMenuState(null)
  }

  const closeContextMenu = (): void => {
    const opener = keyboardOpenerRef.current
    dismissContextMenu()

    if (!isNull(opener)) {
      requestAnimationFrame(() => { returnFocus(opener) })
    }
  }

  useClickOutside(dropdownRef, dismissContextMenu)

  const showContextMenu = (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (node instanceof TabNode) {
      event.preventDefault()
      // the context menu key and Shift+F10 open it with a button other than the right mouse button
      const openedByKeyboard = event.button !== 2
      keyboardOpenerRef.current = openedByKeyboard && event.target instanceof Element ? event.target : null
      setContextMenuState({ x: event.clientX, y: event.clientY, tabNode: node, openedByKeyboard })
      node.getExtraData()
    }
  }

  useEffect(() => {
    if (contextMenuState?.openedByKeyboard !== true) {
      return
    }

    // rc-menu registers its items after mounting, so the focus can only land a few frames later
    let framesLeft = 10
    let frame = 0
    const focusMenu = (): void => {
      dropdownRef.current?.focus()
      framesLeft -= 1

      if (dropdownRef.current?.menu?.list?.contains(document.activeElement) !== true && framesLeft > 0) {
        frame = requestAnimationFrame(focusMenu)
      }
    }

    focusMenu()

    return () => { cancelAnimationFrame(frame) }
  }, [contextMenuState])

  const onMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>): void => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault()
      closeContextMenu()
    }
  }

  const menuItems = useMemo(() => {
    if (contextMenuState !== null && !isUndefined(createContextMenuItems)) {
      return createContextMenuItems({ contextMenuState, closeContextMenu, model, closeWidget })
    }
    return []
  }, [contextMenuState, createContextMenuItems, model, closeWidget])

  const dropdown = contextMenuState !== null && !isUndefined(createContextMenuItems)
    ? (
      <Dropdown
        menu={ { items: menuItems, onKeyDown: onMenuKeyDown } }
        menuRef={ dropdownRef }
        open
        overlayStyle={ { position: 'absolute', left: contextMenuState.x, top: contextMenuState.y } }
      >
        <span></span>
      </Dropdown>
      )
    : null

  if (createContextMenuItems === undefined) {
    return {}
  }

  return {
    showContextMenu,
    dropdown
  }
}
