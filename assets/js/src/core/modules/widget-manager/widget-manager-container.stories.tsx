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
import { WidgetManagerContainer } from './widget-manager-container'

const config: Meta = {
  title: 'Modules/Widget Manager',
  component: WidgetManagerContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        parameters: {
          height: '555px'
        }
      }
    }
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '600px'
      }
    }
  }
}
