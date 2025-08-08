/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, useState, createContext, useContext } from 'react'
import { Dropdown } from 'antd'

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
}

const ContextMenuWrapper = ({ children, renderMenu }: ContextMenuWrapperProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const closeMenu = (): void => {
    setOpen(false)
  }

  const contextValue: ContextMenuContextType = {
    closeMenu
  }

  return (
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
      <span>{children}</span>
    </Dropdown>
  )
}

export default ContextMenuWrapper
