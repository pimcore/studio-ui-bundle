/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Header } from '@Pimcore/components/header/header'
import { type StoryObj, type Meta } from '@storybook/react'
import React from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { Title } from '@Pimcore/components/title/title'
import { Icon } from '@Pimcore/components/icon/icon'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { SearchInput } from '@Pimcore/components/search-input/search-input'

const config: Meta = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

type Story = StoryObj<typeof Header>

// Toolbar row — no title prop, children fill the full width

export const _default: Story = {
  args: {
    children: (
      <Title>Tag Configuration</Title>
    )
  }
}

export const WithActions: Story = {
  args: {
    children: (
      <>
        <Flex gap='extra-small'>
          <Title>Tag Configuration</Title>
          <IconTextButton
            icon={ { value: 'new' } }
          >{'New'}</IconTextButton>
        </Flex>
        <SearchInput
          placeholder="Search"
          withPrefix={ false }
          withoutAddon={ false }
        />
      </>
    )
  }
}

export const WithActionsAndBorder: Story = {
  args: {
    ...WithActions.args,
    position: 'top'
  }
}

// Simple header — title prop, fixed 32px height

export const OnlyTitle: Story = {
  args: {
    title: 'Asset Details'
  }
}

export const OnlyTitleWithIcon: Story = {
  args: {
    title: 'Dependencies',
    icon: <Icon value={ 'requires' } />
  }
}
