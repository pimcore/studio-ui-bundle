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
import { IconButton } from './icon-button'

const config: Meta = {
  title: 'Components/Controls/Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    icon: { value: 'trash' },
    loading: false
  }
}

export const Secondary = {
  args: {
    ..._default.args,
    theme: 'secondary'
  }
}

export const Primary = {
  args: {
    ..._default.args,
    type: 'primary'
  }
}

export const Outlined = {
  args: {
    ..._default.args,
    type: 'default'
  }
}
