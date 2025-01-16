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

import React from 'react'
import { type Meta } from '@storybook/react'
import { Popconfirm } from './popconfirm'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Feedback/Popconfirm',
  component: Popconfirm,
  args: {
    children: (
      <Button>Click on me!</Button>
    ),
    title: 'This is a Popconfirm'
  }
}

export default config

export const _default = {}

export const WithDescription = {
  args: {
    title: 'Popconfirm title',
    description: 'Popconfirm description'
  }
}

export const WithCustomButtonsLabels = {
  args: {
    okText: 'Yes',
    cancelText: 'No'
  }
}

export const WithCustomPlacement = {
  args: {
    placement: 'bottomLeft'
  }
}

export const WithCustomIcon = {
  args: {
    icon: (
      <Icon value={ 'image-05' } />
    )
  }
}
