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
import { NumericRange } from './numeric-range'

const config: Meta = {
  title: 'Components/Data Entry/NumericRange',
  component: NumericRange,
  argTypes: {
    onChange: { action: 'changed' }
  }
}

export default config

export const _default = {
  args: {
    value: { minimum: 3, maximum: 10 }
  }
}
