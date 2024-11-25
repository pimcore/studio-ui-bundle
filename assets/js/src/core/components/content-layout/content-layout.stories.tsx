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

import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { HighlightedEntries as sidebarArgs } from '@Pimcore/components/sidebar/sidebar.stories'
import { Toolbar, type ToolbarProps } from '@Pimcore/components/toolbar/toolbar'
import { Position, Secondary } from '@Pimcore/components/toolbar/toolbar.stories'
import { type Meta } from '@storybook/react'
import React from 'react'
import { Content } from '../content/content'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/layout/Content-Layout',
  component: ContentLayout,
  parameters: {
    layout: 'fullscreen',

    docs: {
      iframeHeight: 400
    }
  },
  tags: ['autodocs']
}

export default config

const demoData = {
  children: <Content none />,
  renderTopBar: <Toolbar { ...Position.args as ToolbarProps } />,
  renderToolbar: <Toolbar { ...Secondary.args as ToolbarProps } />,
  renderSidebar: <Sidebar { ...sidebarArgs.args } />
}

export const _default = {
  args: {
    ...demoData
  }
}

export const NoToolbar = {
  args: {
    ...demoData,
    renderToolbar: undefined
  }
}

export const NoSidebar = {
  args: {
    ...demoData,
    renderSidebar: undefined
  }
}

export const NoTopBar = {
  args: {
    ...demoData,
    renderTopBar: undefined
  }
}
