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
import React, { useRef, useState } from 'react'
import { type Model, TabNode } from 'flexlayout-react'
import type { MenuRef } from 'antd'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

interface UseContextMenuReturn {
  showContextMenu: (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  dropdown: React.ReactElement | null
}

export const useContextMenu = (
  createContextMenuItems: ({ dropdownPosition, closeContextMenu, model, closeWidget }) => DropdownProps['menu']['items'],
  model: Model
): UseContextMenuReturn => {
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number, y: number, tabNode: TabNode } | null>(null)
  const dropdownRef = useRef<MenuRef>(null)
  const { closeWidget } = useWidgetManager()

  const showContextMenu = (node: any, event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (node instanceof TabNode) {
      event.preventDefault()
      setDropdownPosition({ x: event.clientX, y: event.clientY, tabNode: node })
      console.log('node', node)
      node.getExtraData()
    }
  }

  const closeContextMenu = (): void => {
    setDropdownPosition(null)
  }

  /* const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRef.current?.menu?.list !== null && dropdownRef.current?.menu?.list !== undefined && !dropdownRef.current.menu.list.contains(event.target as Node)) {
      hideDropdown()
    }
  }

  useEffect(() => {
    if (dropdownPosition !== null) {
      document.addEventListener('mousedown', handleClickOutside, true)
    } else {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [dropdownPosition]) */

  const dropdown = dropdownPosition !== null
    ? (
      <Dropdown
        menu={ { items: createContextMenuItems({ dropdownPosition, closeContextMenu, model, closeWidget }) } }
        menuRef={ dropdownRef }
        open
        overlayStyle={ { position: 'absolute', left: dropdownPosition.x, top: dropdownPosition.y } }
      ><span></span></Dropdown>
      )
    : null

  return {
    showContextMenu,
    dropdown
  }
}
