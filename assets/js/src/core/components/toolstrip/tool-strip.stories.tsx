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

import React from 'react'
import { type StoryObj, type Meta } from '@storybook/react'
import { ToolStrip, type ToolStripProps } from './tool-strip'
import { IconButton } from '../icon-button/icon-button'
import { Space } from '../space/space'
import { Text } from '../text/text'
import { Split } from '../split/split'
import { Dropdown } from '../dropdown/dropdown'

const config: Meta = {
  title: 'Components/Data Display/ToolStrip',
  component: ToolStrip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<ToolStripProps> = {
  args: {
    children: (
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size='mini'>
          <IconButton icon={ { value: 'drag-option' } } />
          <Text>Title</Text>
          <Dropdown menu={ {
            items: [
              {
                key: 0,
                label: 'Action 1'
              },
              {
                key: 1,
                label: 'Action 2'
              }
            ]
          } }
          >
            <IconButton icon={ { value: 'new' } } />
          </Dropdown>
          <IconButton icon={ { value: 'move-down' } } />
          <IconButton icon={ { value: 'move-up' } } />
        </Space>

        <IconButton icon={ { value: 'trash' } } />
      </Split>
    )
  }
}
