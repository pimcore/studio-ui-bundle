/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type Meta } from '@storybook/react'
import { Menu } from '@Pimcore/components/menu/menu'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { AreablockMenuItem } from './areablock-menu-item'

const areaTypes = ['Image', 'Embed', 'Gallery']

const config: Meta<typeof AreablockMenuItem> = {
  title: 'Modules/Document/Areablock menu item',
  component: AreablockMenuItem,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    name: 'Image',
    onInsert: (position: string) => { console.log(`insert ${position}`) }
  }
}

/**
 * The empty state leaves the buttons out: with no entries yet there is nothing to
 * insert above or below, and the new area always becomes the first one.
 */
export const WithoutInsertPosition = {
  args: {
    name: 'Image'
  }
}

/**
 * How the areablock toolbar shows it. Clicking a row inserts below, which is what
 * the plus has always done; the two buttons name the side instead. The filled block
 * in each icon is the new entry and the thin one is the area you are standing on,
 * so the pair differs in weight as well as in position.
 */
export const InTheMenu = {
  render: () => (
    <div style={ { width: 280 } }>
      <Menu
        items={ areaTypes.map((name) => ({
          key: name,
          label: (
            <AreablockMenuItem
              name={ name }
              onInsert={ (position) => { console.log(`insert ${name} ${position}`) } }
            />
          )
        })) }
      />
    </div>
  )
}

/**
 * The context that matters: the menu opens from the plus in the areablock entry
 * header, which is an inverse ToolStrip. Its ThemeProvider reaches the dropdown
 * through React context even though the popup is portalled, so anything in here
 * that takes its colour from the Button link tokens is painted for a dark strip
 * rather than for the light menu.
 */
export const FromTheAreablockToolstrip = {
  render: () => (
    <div style={ { paddingBottom: 220 } }>
      <ToolStrip
        dragger
        theme="inverse"
        title="Teaser"
      >
        <Dropdown
          menu={ {
            items: areaTypes.map((name) => ({
              key: name,
              label: (
                <AreablockMenuItem
                  name={ name }
                  onInsert={ (position) => { console.log(`insert ${name} ${position}`) } }
                />
              )
            }))
          } }
          open
          placement="bottomLeft"
        >
          <IconButton
            aria-label="New"
            icon={ { value: 'new' } }
            size="small"
          />
        </Dropdown>
      </ToolStrip>
    </div>
  )
}
