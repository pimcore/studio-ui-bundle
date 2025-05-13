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
import { TextArea } from './textarea'

const config: Meta = {
  title: 'Components/Data Entry/TextArea',
  component: TextArea
}

export default config

export const _default = {}

export const Small = {
  args: {
    size: 'small'
  }
}

export const WithError = {
  args: {
    status: 'error'
  }
}

export const WithCustomAutosize = {
  args: {
    autoSize: {
      minRows: 5,
      maxRows: 6
    }
  }
}
