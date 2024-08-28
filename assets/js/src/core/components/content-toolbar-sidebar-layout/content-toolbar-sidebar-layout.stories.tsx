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

import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { HighlightedEntries as sidebarArgs } from '@Pimcore/components/sidebar/sidebar.stories'
import { Toolbar, type ToolbarProps } from '@Pimcore/components/toolbar/toolbar'
import { Secondary } from '@Pimcore/components/toolbar/toolbar.stories'
import { type Meta } from '@storybook/react'
import React from 'react'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/layout/Content-Toolbar-Sidebar-Layout',
  component: ContentToolbarSidebarLayout,
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
  children: <NoContent />,
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
