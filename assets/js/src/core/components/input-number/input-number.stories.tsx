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
