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
import { type StoryObj, type Meta } from '@storybook/react'
import { Button } from '@Pimcore/components/button/button'
import React from 'react'
import { Breadcrumb } from '../breadcrumb/breadcrumb'
import { _default as breadcrumbStory } from '../breadcrumb/breadcrumb.stories'
import { Flex } from '@Pimcore/components/flex/flex'
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { SearchInput } from '@Pimcore/components/search-input/search-input'

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
      <ButtonGroup items={ [
        <IconButton
          icon={ { value: 'trash' } }
          key={ 'icon-button-01' }
          type='link'
        />,
        <IconButton
          icon={ { value: 'refresh' } }
          key={ 'icon-button-02' }
          type='link'
        />
      ] }
      />

      <ButtonGroup items={ [
        <Button key={ 'action-01' }>clear</Button>,
        <Button
          key={ 'action-02' }
          type='primary'
        >Save</Button>
      ] }
      />
    </>
  )
}

const demoSearchData = {
  children: (
    <>
      <Flex gap={ 'small' }>
        <Title>Tag Configuration</Title>
        <IconTextButton
          icon={ { value: 'new' } }
        >{'New'}</IconTextButton>
      </Flex>
      <SearchInput
        placeholder="Search"
      />
    </>
  )
}

type Story = StoryObj<typeof Toolbar>

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

export const Size: Story = {
  args: {
    children: (
      <>
        <Breadcrumb
          { ...breadcrumbStory.args }
          elementType='asset'
        />
      </>
    ),
    size: 'small',
    theme: 'secondary'
  }
}

export const Position: Story = {
  args: {
    children: (
      <>
        <Breadcrumb
          { ...breadcrumbStory.args }
          elementType='asset'
        />
      </>
    ),
    position: 'top',
    size: 'small',
    theme: 'secondary'
  }
}

export const SpaceBetweenSearch: Story = {
  args: {
    ...demoSearchData,
    justify: 'space-between',
    margin: { x: 'mini', y: 'none' },
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
