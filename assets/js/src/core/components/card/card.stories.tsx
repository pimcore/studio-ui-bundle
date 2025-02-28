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
import { Card } from './card'
import { Switch } from '../switch/switch'
import React, { Fragment } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from 'antd'
import { Input } from '@Pimcore/components/input/input'
import { Button } from '@Pimcore/components/button/button'

const config: Meta = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    title: 'Card Title',
    children: 'Card Content'
  }
}

export const HeadWithButtons = {
  args: {
    ..._default.args,
    title: <Fragment>
      Card Title
      <IconTextButton
        icon={ { value: 'new' } }
        type="default"
      >New</IconTextButton>
    </Fragment>,
    extra: [
      {
        icon: 'eye',
        title: 'View',
        type: 'default',
        onClick: () => { console.log('click view button') }
      }
    ]
  }
}

export const HeadWithActionButton = {
  args: {
    ..._default.args,
    title: 'Action Buttons',
    extraPosition: 'flex-start',
    extra: (
      <IconTextButton
        icon={ { value: 'edit' } }
        onClick={ () => { console.log('click action button 1') } }
        type='action'
      >
        Edit
      </IconTextButton>
    )
  }
}

export const CloseButton = {
  args: {
    ..._default.args,
    onClose: () => { console.log('click close button') },
    extra: ['20.02.2024 15:13:22']
  }
}

export const HeadWithIcon = {
  args: {
    ..._default.args,
    icon: 'eye'
  }
}

export const ToggleButton = {
  args: {
    title: 'Manufacturer Uppercase',
    extra: [<Switch
      key="toggle-switch"
      labelLeft={ 'Toggle' }
      onChange={ () => { console.log('change') } }
            ></Switch>]
  }
}

export const Image = {
  args: {
    image: {
      src: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
      alt: 'Pimcore Logo'
    },
    children:
  <Fragment>
    <Flex
      align="center"
      justify="space-between"
    >
      <div>Lorem ipsum dolor</div>
      <IconButton
        icon={ { value: 'eye' } }
        onClick={ () => { console.log('click button') } }
      />
    </Flex>
  </Fragment>
  }
}

export const Actions = {
  args: {
    ..._default.args,
    actions: [
      <IconButton
        icon={ { value: 'trash' } }
        key={ 'icon-button-01' }
        onClick={ () => { console.log('click trash button') } }
        type='link'
      />,
      <IconButton
        icon={ { value: 'refresh' } }
        key={ 'icon-button-02' }
        onClick={ () => { console.log('click refresh button') } }
        type='link'
      />
    ]
  }
}

export const Footer = {
  args: {
    ..._default.args,
    footer: <Flex gap="small"><Input /><Button>ok</Button></Flex>
  }
}
