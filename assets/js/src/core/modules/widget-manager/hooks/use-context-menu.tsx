/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import React, { useEffect, useRef, useState } from 'react'
import { type Model, TabNode } from 'flexlayout-react'
import type { MenuRef } from 'antd'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

interface UseContextMenuReturn {
  showContextMenu: (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  dropdown: React.ReactElement | null
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

export const useContextMenu = (
  createContextMenuItems: ({ contextMenuState, closeContextMenu, model, closeWidget }: CreateContextMenuItemsProps) => DropdownProps['menu']['items'],
  model: Model
): UseContextMenuReturn => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState | null>(null)
  const dropdownRef = useRef<MenuRef>(null)
  const { closeWidget } = useWidgetManager()

  const showContextMenu = (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (node instanceof TabNode) {
      event.preventDefault()
      setContextMenuState({ x: event.clientX, y: event.clientY, tabNode: node })
      node.getExtraData()
    }
  }

  const closeContextMenu = (): void => {
    setContextMenuState(null)
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRef.current?.menu?.list !== null && dropdownRef.current?.menu?.list !== undefined && !dropdownRef.current.menu.list.contains(event.target as Node)) {
      closeContextMenu()
    }
  }

  useEffect(() => {
    if (contextMenuState !== null) {
      document.addEventListener('mousedown', handleClickOutside, true)
    } else {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [contextMenuState])

  const dropdown = contextMenuState !== null
    ? (
      <Dropdown
        menu={ { items: createContextMenuItems({ contextMenuState, closeContextMenu, model, closeWidget }) } }
        menuRef={ dropdownRef }
        open
        overlayStyle={ { position: 'absolute', left: contextMenuState.x, top: contextMenuState.y } }
      ><span></span></Dropdown>
      )
    : null

  return {
    showContextMenu,
    dropdown
  }
}
