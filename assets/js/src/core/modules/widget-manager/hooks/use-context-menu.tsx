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
import React, { useRef, useState, useMemo } from 'react'
import { type Model, TabNode } from 'flexlayout-react'
import type { MenuRef } from 'antd'
import { isUndefined } from 'lodash'
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

export const useContextMenu = (
  model: Model,
  createContextMenuItems?: ({ contextMenuState, closeContextMenu, model, closeWidget }: CreateContextMenuItemsProps) => DropdownProps['menu']['items']
): UseContextMenuReturn => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState | null>(null)
  const dropdownRef = useRef<MenuRef>(null)
  const { closeWidget } = useWidgetManager()

  const closeContextMenu = (): void => {
    setContextMenuState(null)
  }

  useClickOutside(dropdownRef, closeContextMenu)

  const showContextMenu = (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (node instanceof TabNode) {
      event.preventDefault()
      setContextMenuState({ x: event.clientX, y: event.clientY, tabNode: node })
      node.getExtraData()
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
        menu={ { items: menuItems } }
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
