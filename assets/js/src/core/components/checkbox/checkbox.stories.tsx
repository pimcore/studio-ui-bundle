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
import { Checkbox } from './checkbox'

const config: Meta = {
  title: 'Components/Controls/Checkbox',
  component: Checkbox
}

export default config

export const _default = {}

export const Checked = {
  args: {
    checked: true
  }
}

export const Disabled = {
  args: {
    checked: true,
    disabled: true
  }
}

export const Indeterminated = {
  args: {
    indeterminate: true
  }
}
