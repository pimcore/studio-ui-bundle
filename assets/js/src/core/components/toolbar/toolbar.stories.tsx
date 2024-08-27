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

import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { StoryObj, type Meta } from '@storybook/react'
import { Button, theme } from 'antd'
import React from 'react'

const config: Meta = {
  title: 'Components/Controls/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

const demoData = {
  children: (
    <>
      <ButtonGroup items={[
        <IconButton key={'icon-button-01'} icon="trash" type='link' />,
        <IconButton key={'icon-button-02'} icon="refresh" type='link' />
      ]} />

      <ButtonGroup items={[
        <Button key={'action-01'}>clear</Button>,
        <Button key={'action-02'} type='primary'>Save</Button>
      ]} />
    </>
  )
}

type Story = StoryObj<typeof Toolbar>;

export const _default: Story = {
  args: {
    ...demoData
  }
}

export const Secondary: Story = {
  args: {
    ...demoData,
    theme: 'secondary'
  }
}

export const RightAligned: Story = {
  args: {
    ...demoData,
    justify: 'flex-end'
  }
}

export const LeftAligned: Story = {
  args: {
    ...demoData,
    justify: 'flex-start'
  }
}
