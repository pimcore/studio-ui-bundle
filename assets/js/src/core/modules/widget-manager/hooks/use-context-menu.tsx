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
import React, { createContext, useCallback, useEffect, useRef, useState, useMemo, type KeyboardEvent } from 'react'
import { type Model, TabNode } from 'flexlayout-react'
import type { MenuRef } from 'antd'
import { isNull, isUndefined } from 'lodash'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { useClickOutside } from '@Pimcore/utils/hooks/use-click-outside'
import { ACTIVE_MAIN_TAB_LABEL } from '../title/tab-title-label-context'

interface UseContextMenuReturn {
  showContextMenu?: (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  dropdown?: React.ReactElement | null
  openTabId?: string | null
  openFromKeyboard?: (node: TabNode, anchor: HTMLElement) => void
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
  expandMainWidget: (id: string) => void
}

export interface TabContextMenuContextValue {
  openTabId: string | null
  openFromKeyboard?: (node: TabNode, anchor: HTMLElement) => void
}

export const TabContextMenuContext = createContext<TabContextMenuContextValue>({ openTabId: null })

interface OpenContextMenuState extends ContextMenuState {
  openedByKeyboard: boolean
}

// a menu action can close or remount the opening tab, then the active main tab takes the focus
const returnFocus = (opener: HTMLElement): void => {
  const target = opener.isConnected ? opener : document.querySelector<HTMLElement>(ACTIVE_MAIN_TAB_LABEL)
  target?.focus()
}

export const useContextMenu = (
  model: Model,
  createContextMenuItems?: (props: CreateContextMenuItemsProps) => DropdownProps['menu']['items']
): UseContextMenuReturn => {
  const [contextMenuState, setContextMenuState] = useState<OpenContextMenuState | null>(null)
  const dropdownRef = useRef<MenuRef>(null)
  const keyboardOpenerRef = useRef<HTMLElement | null>(null)
  const { closeWidget, expandMainWidget } = useWidgetManager()

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
      keyboardOpenerRef.current = null
      setContextMenuState({ x: event.clientX, y: event.clientY, tabNode: node, openedByKeyboard: false })
      node.getExtraData()
    }
  }

  const openFromKeyboard = useCallback((node: TabNode, anchor: HTMLElement): void => {
    const { left, bottom } = anchor.getBoundingClientRect()
    keyboardOpenerRef.current = anchor
    setContextMenuState({ x: left, y: bottom, tabNode: node, openedByKeyboard: true })
  }, [])

  // like the ContextMenuWrapper: focus the first entry so the arrow keys work
  useEffect(() => {
    if (contextMenuState?.openedByKeyboard !== true) {
      return
    }

    const frame = requestAnimationFrame(() => {
      dropdownRef.current?.menu?.list?.querySelector<HTMLElement>('.ant-dropdown-menu-item')?.focus()
    })

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
      return createContextMenuItems({ contextMenuState, closeContextMenu, model, closeWidget, expandMainWidget })
    }
    return []
  }, [contextMenuState, createContextMenuItems, model, closeWidget, expandMainWidget])

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
    dropdown,
    openTabId: contextMenuState?.tabNode.getId() ?? null,
    openFromKeyboard
  }
}
