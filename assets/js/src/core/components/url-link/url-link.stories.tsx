/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import { UrlLink } from './url-link'

const config: Meta = {
  title: 'Components/Controls/UrlLink',
  component: UrlLink,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: 'https://pimcore.com',
    text: 'Pimcore Website'
  }
}

export const NoText = {
  args: {
    value: 'https://pimcore.com'
  }
}

export const Empty = {
  args: {
    value: ''
  }
}
