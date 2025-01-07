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
import { InputNumber } from './input-number'

const config: Meta = {
  title: 'Components/Data Entry/InputNumber',
  component: InputNumber
}

export default config

export const _default = {}

export const Small = {
  args: {
    size: 'small'
  }
}

export const Disabled = {
  args: {
    disabled: true,
    value: 10
  }
}

export const WithFormattedValue = {
  args: {
    formatter: (value: any) => `$ ${value}`,
    value: 1000
  }
}

export const WithOutOfRangeValue = {
  args: {
    value: 11,
    min: 5,
    max: 10
  }
}

export const WithWarning = {
  args: {
    status: 'warning'
  }
}
