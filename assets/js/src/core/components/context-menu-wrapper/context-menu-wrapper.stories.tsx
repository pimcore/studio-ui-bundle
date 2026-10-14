/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react'
import React from 'react'
import { ContextMenuWrapper, type ContextMenuWrapperProps, useCloseContextMenu } from './context-menu-wrapper'
import { Menu } from '../menu/menu'
import { Button } from '../button/button'

const config: Meta = {
  title: 'Components/Controls/Dropdowns/ContextMenuWrapper',
  component: ContextMenuWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Opens a context menu on right-click, or on Shift+F10 when the wrapped element has focus. ' +
          'When opened via keyboard the first menu item is focused, arrow keys navigate the menu and Escape closes it.'
      }
    }
  },
  tags: ['autodocs']
}

export default config

const DemoMenu = (): React.JSX.Element => {
  const closeMenu = useCloseContextMenu()

  return (
    <Menu
      items={ [
        { key: 'rename', label: 'Rename', onClick: () => { closeMenu?.() } },
        { key: 'copy', label: 'Copy', onClick: () => { closeMenu?.() } },
        { key: 'delete', label: 'Delete', onClick: () => { closeMenu?.() } }
      ] }
    />
  )
}

export const _default: StoryObj<ContextMenuWrapperProps> = {
  args: {
    children: <Button>Right-click or focus and press Shift+F10</Button>,
    renderMenu: () => <DemoMenu />
  }
}
