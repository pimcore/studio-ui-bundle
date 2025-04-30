/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { Slider } from './slider'

const config: Meta = {
  title: 'Components/Data Entry/Slider',
  component: Slider,
  argTypes: {
    onChange: { action: 'changed' }
  }
}

export default config

export const _default = {
  args: {
    value: 35,
    min: 0,
    max: 100,
    allowClear: true,
    showValue: true
  }
}
