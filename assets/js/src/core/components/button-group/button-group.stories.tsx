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
      <Button key="clear">clear</Button>,
      <Button
        key="save"
        type='primary'
      >
        save
      </Button>
    ]
  }
}

export const CombinedButtons = {
  args: {
    items: [
      <IconTextButton
        icon={ { value: 'trash' } }
        key="delete"
        type="default"
      >Delete</IconTextButton>,
      <IconButton
        icon={ { value: 'edit' } }
        key="edit"
        type="default"
      />,
      <Button key="save">save</Button>,
      <Button key="cancel">cancel</Button>
    ],
    noSpacing: true
  }
}

export const CombinedButtons02 = {
  args: {
    items: [
      <IconButton
        icon={ { value: 'trash' } }
        key="clear"
        type="primary"
      >clear</IconButton>,
      <IconButton
        icon={ { value: 'edit' } }
        key="clear2"
        type="dashed"
      >clear</IconButton>,
      <Button
        key="save"
        type='primary'
      >save</Button>,
      <Button key="cancel">cancel</Button>
    ],
    noSpacing: true
  }
}

export const ButtonsWithSeparator = {
  args: {
    items: [
      <IconButton
        icon={ { value: 'trash' } }
        key="clear1"
      >clear</IconButton>,
      <IconButton
        icon={ { value: 'edit' } }
        key="clear2"
      >clear</IconButton>,
      <Button
        key="save"
        type='link'
      >save</Button>,
      <Button
        key="cancel"
        type='link'
      >cancel</Button>
    ],
    withSeparator: true
  }
}

export const ButtonGroupNesting = {
  args: {
    items: [
      <ButtonGroup
        items={ [
          <Button key="clear">clear</Button>,
          <Button key="save">save</Button>
        ] }
        key="btnGroup1"
        noSpacing
      />,
      <ButtonGroup
        items={ [
          <Button
            key="cancel"
            type='link'
          >cancel</Button>,
          <Button
            key="close"
            type='link'
          >close</Button>
        ] }
        key="btnGroup2"
        withSeparator
      />
    ]
  }
}

export const IconAndButtonGroup = {
  args: {
    items: [
      <IconButton
        icon={ { value: 'trash' } }
        key="delete1"
      />,
      <Button key="delete2">delete</Button>
    ]
  }
}

export const IconButtonExample = {
  args: {
    items: [
      <IconButton
        icon={ { value: 'trash' } }
        key="delete1"
      />,
      <IconButton
        icon={ { value: 'edit' } }
        key="delete2"
      />
    ]
  }
}

export const LanguageSelectionExample = {
  args: {
    items: [
      <LanguageSelection
        key="languageSelection"
        languages={ ['EN', 'FR'] }
        onSelectLanguage={ () => {} }
        selectedLanguage={ 'EN' }
      />,
      <IconButton
        icon={ { value: 'trash' } }
        key="trashIcon"
      />
    ]
  }
}
