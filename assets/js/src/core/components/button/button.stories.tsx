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
import { Button } from './button'

const config: Meta = {
  title: 'Components/Controls/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    loading: false,
    children: 'Button',
    onClick: () => { console.log('Button clicked') }
  }
}

export const Primary = {
  args: {
    ..._default.args,
    type: 'primary'
  }
}

export const Text = {
  args: {
    ..._default.args,
    type: 'text'
  }
}

export const Link = {
  args: {
    ..._default.args,
    type: 'link'
  }
}
