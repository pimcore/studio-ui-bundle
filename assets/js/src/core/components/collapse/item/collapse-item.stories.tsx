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

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CollapseItem, type CollapseItemProps } from './collapse-item'
import { Icon } from '@Pimcore/components/icon/icon'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

const config: Meta = {
  title: 'Components/Layout/Collapse/CollapseItem',
  component: CollapseItem,
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<CollapseItemProps> = {
  args: {
    label: <Flex
      align='center'
      gap={ 'extra-small' }
           >
      <Icon value='asset' />
      <span>Label</span>
    </Flex>,
    children: 'Content'
  }
}

export const SubLabel: StoryObj<CollapseItemProps> = {
  args: {
    ..._default.args,
    subLabel: 'Some descriptive sub label'
  }
}

export const Extra: StoryObj<CollapseItemProps> = {
  args: {
    ...SubLabel.args,
    extra: <IconButton
      icon={ { value: 'trash' } }
      variant='minimal'
           />
  }
}

export const ExtraPosition: StoryObj<CollapseItemProps> = {
  args: {
    ..._default.args,
    extra: <Button>New</Button>,
    extraPosition: 'start'
  }
}

export const ActionButtons: StoryObj<CollapseItemProps> = {
  args: {
    ..._default.args,
    extra: <Flex>
      <IconTextButton
        icon={ { value: 'edit' } }
        onClick={ (e) => { e.stopPropagation(); console.log('click action button 1') } }
        type='action'
      >
        Edit
      </IconTextButton>
    </Flex>,
    extraPosition: 'start'
  }
}

export const Borderless: StoryObj<CollapseItemProps> = {
  args: {
    ...Extra.args,
    bordered: false
  }
}

export const ThemeSimple: StoryObj<CollapseItemProps> = {
  args: {
    ...Extra.args,
    theme: 'simple'
  }
}

export const ThemeSuccess: StoryObj<CollapseItemProps> = {
  args: {
    ...Extra.args,
    theme: 'success'
  }
}

export const ThemePrimary: StoryObj<CollapseItemProps> = {
  args: {
    ...Extra.args,
    theme: 'primary'
  }
}

export const ThemeCardWithHighlight: StoryObj<CollapseItemProps> = {
  args: {
    ..._default.args,
    theme: 'card-with-highlight',
    bordered: false
  }
}

export const ThemeFieldset: StoryObj<CollapseItemProps> = {
  args: {
    ..._default.args,
    theme: 'fieldset',
    hasContentSeparator: false
  }
}

export const Nested: StoryObj<CollapseItemProps> = {
  args: {
    ..._default.args,
    children: (
      <CollapseItem
        hasContentSeparator={ false }
        label='Nested item'
        theme='fieldset'
      >
        Nested content
      </CollapseItem>
    )
  }
}
