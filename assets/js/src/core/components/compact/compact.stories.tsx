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

import type { Meta } from '@storybook/react'
import { Compact } from './compact'
import React from 'react'
import { Button } from '../button/button'
import { IconButton } from '../icon-button/icon-button'
import { Input } from 'antd'
import { IconTextButton } from '../icon-text-button/icon-text-button'

const config: Meta = {
  title: 'Components/Layout/Spacing/Compact',
  component: Compact,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    children: <>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <IconButton
        icon={ { value: 'trash' } }
        type='primary'
      />
    </>
  }
}

export const Horizontal = {
  args: {
    ..._default.args,
    direction: 'horizontal'
  }
}

export const Vertical = {
  args: {
    ..._default.args,
    direction: 'vertical'
  }
}

export const WithInputComponents = {
  args: {
    children: <>
      <Input placeholder='Input 1' />
      <IconButton
        icon={ { value: 'group' } }
        type='primary'
      />
    </>,
    size: 10
  }
}

export const WithInputComponents2 = {
  args: {
    children: <>
      <Input placeholder='Input 1' />
      <IconTextButton
        icon={ { value: 'group' } }
        type='primary'
      >Choose</IconTextButton>
    </>,
    size: 10
  }
}
