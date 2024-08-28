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

import { type Meta } from '@storybook/react'
import React from 'react'
import { ButtonGroup } from './button-group'
import { LanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import { Button } from '../button/button'
import { IconButton } from '../icon-button/icon-button'
import { IconTextButton } from '../icon-text-button/icon-text-button'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/Controls/Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    items: [
      <Button >clear</Button>,
      <Button type='primary'>save</Button>
    ]
  }
}

export const CombinedButtons = {
  args: {
    items: [
      <IconTextButton
        icon="trash"
        type="default"
      >Delete</IconTextButton>,
      <IconButton
        icon="edit"
        type="default"
      />,
      <Button>save</Button>,
      <Button>cancel</Button>
    ],
    noSpacing: true
  }
}

export const CombinedButtons02 = {
  args: {
    items: [
      <IconButton
        icon="trash"
        type="primary"
      >clear</IconButton>,
      <IconButton
        icon="edit"
        type="dashed"
      >clear</IconButton>,
      <Button type='primary'>save</Button>,
      <Button>cancel</Button>
    ],
    noSpacing: true
  }
}

export const ButtonsWithSeparator = {
  args: {
    items: [
      <IconButton icon="trash">clear</IconButton>,
      <IconButton icon="edit">clear</IconButton>,
      <Button type='link'>save</Button>,
      <Button type='link'>cancel</Button>
    ],
    withSeparator: true
  }
}

export const ButtonGroupNesting = {
  args: {
    items: [
      <ButtonGroup
        items={ [
          <Button>clear</Button>,
          <Button>save</Button>
        ] }
        noSpacing
      />,
      <ButtonGroup
        items={ [
          <Button type='link'>cancel</Button>,
          <Button type='link'>close</Button>
        ] }
        withSeparator
      />
    ]
  }
}

export const IconAndButtonGroup = {
  args: {
    items: [
      <IconButton icon='trash' />,
      <Button>delete</Button>
    ]
  }
}

export const IconButtonExample = {
  args: {
    items: [
      <IconButton icon='trash' />,
      <IconButton icon='edit' />
    ]
  }
}

export const LanguageSelectionExample = {
  args: {
    items: [
      <LanguageSelection
        languages={ ['EN', 'FR'] }
        onSelectLanguage={ () => {} }
        selectedLanguage={ 'EN' }
      />,
      <IconButton icon='trash' />
    ]
  }
}
