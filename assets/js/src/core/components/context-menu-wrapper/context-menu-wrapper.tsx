/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, useState, useEffect, useRef, createContext, useContext } from 'react'
import { Dropdown } from 'antd'
import { DropdownHeightProvider } from '@Pimcore/components/dropdown/dropdown-height-provider'

interface ContextMenuContextType {
  closeMenu: () => void
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined)

export const useContextMenu = (): ContextMenuContextType | undefined => {
  return useContext(ContextMenuContext)
}

export const useCloseContextMenu = (): (() => void) | undefined => {
  const context = useContextMenu()
  return context?.closeMenu
}

export interface ContextMenuWrapperProps {
  children: React.ReactNode
  renderMenu: () => ReactElement
  calculateAutoHeight?: boolean
}

export const ContextMenuWrapper = ({ children, renderMenu, calculateAutoHeight = true }: ContextMenuWrapperProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const openedViaKeyboard = useRef(false)

  const closeMenu = (): void => {
    setOpen(false)
  }

  // When opened via keyboard, focus the first menu item so arrow keys work.
  useEffect(() => {
    if (open && openedViaKeyboard.current) {
      openedViaKeyboard.current = false
      requestAnimationFrame(() => {
        const menuItem = document.querySelector<HTMLElement>('.ant-dropdown:not(.ant-dropdown-hidden) .ant-dropdown-menu-item')
        menuItem?.focus()
      })
    }
  }, [open])

  const handleContextMenu = (event: React.MouseEvent): void => {
    event.stopPropagation()
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'F10' && event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      openedViaKeyboard.current = true

      // Dispatch a synthetic contextmenu event at the focused element's position
      // so Ant Design anchors the dropdown correctly instead of at (0,0).
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      target.dispatchEvent(new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: rect.left,
        clientY: rect.bottom
      }))
    }
  }

  const contextValue: ContextMenuContextType = {
    closeMenu
  }

  const dropdown = (
    <Dropdown
      dropdownRender={ () => (
        <ContextMenuContext.Provider value={ contextValue }>
          {renderMenu()}
        </ContextMenuContext.Provider>
      ) }
      onOpenChange={ setOpen }
      open={ open }
      trigger={ ['contextMenu'] }
    >
      <span
        onContextMenu={ handleContextMenu }
        onKeyDown={ handleKeyDown }
        role="none"
      >{children}</span>
    </Dropdown>
  )

  if (calculateAutoHeight) {
    return (
      <DropdownHeightProvider>
        {dropdown}
      </DropdownHeightProvider>
    )
  }

  return dropdown
}

export default ContextMenuWrapper
