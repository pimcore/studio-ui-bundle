/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React from 'react'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { HighlightedEntries as sidebarArgs } from '@Pimcore/components/sidebar/sidebar.stories'
import { Toolbar, type ToolbarProps } from '@Pimcore/components/toolbar/toolbar'
import { PositionTop, Secondary } from '@Pimcore/components/toolbar/toolbar.stories'
import { PageLayout } from './page-layout'
import { Content } from '../content/content'
import { TreeElement } from '../tree-element/tree-element'
import { Icon } from '../icon/icon'

const config: Meta = {
  title: 'Components/Layout/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      iframeHeight: 400,
      description: {
        component: 'The layout of a page or tab. `variant="content"` shows content with an optional top bar, bottom toolbar and sidebar. `variant="split"` shows two items side by side (item `size` in percent, `minSize`/`maxSize` in px) with an optional divider, resizing and `fullWidth` for one item. `variant="config"` is the split variant for configuration screens: a 20/80 split with a 170px minimum (no maximum) for the left item, a divider and toolbar alignment.'
      }
    }
  },
  tags: ['autodocs']
}

export default config

export const ContentVariant = {
  args: {
    variant: 'content',
    children: <Content none />,
    renderTopBar: <Toolbar { ...PositionTop.args as ToolbarProps } />,
    renderToolbar: <Toolbar { ...Secondary.args as ToolbarProps } />,
    renderSidebar: <Sidebar { ...sidebarArgs.args } />
  }
}

export const SplitVariant = {
  args: {
    variant: 'split',
    withDivider: true,
    resizable: true,
    leftItem: {
      size: 25,
      minSize: 200,
      children: <Content none />
    },
    rightItem: {
      size: 75,
      minSize: 600,
      children: <Content none />
    }
  }
}

export const ConfigVariant = {
  args: {
    variant: 'config',
    resizable: true,
    leftItem: {
      children: (
        <Content padded>
          <TreeElement
            treeData={ [
              { title: 'User 1', key: '0-0', icon: <Icon value={ 'user' } /> },
              { title: 'User 2', key: '0-1', icon: <Icon value={ 'user' } /> }
            ] }
          />
        </Content>
      )
    },
    rightItem: {
      children: (
        <Content
          none
          noneOptions={ { text: 'Select a user from the tree' } }
          padded
        />
      )
    }
  }
}
