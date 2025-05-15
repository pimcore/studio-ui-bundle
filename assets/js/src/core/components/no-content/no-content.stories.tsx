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
import { NoContent } from '@Pimcore/components/no-content/no-content'

const config: Meta = {
  title: 'Components/Data Display/No Content',
  component: NoContent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {}
}

export const CustomText = {
  args: {
    text: 'This is a custom text'
  }
}
