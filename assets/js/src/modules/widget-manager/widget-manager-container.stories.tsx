/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { type Meta } from '@storybook/react'
import { WidgetManagerContainer } from './widget-manager-container'

const config: Meta = {
  title: 'Pimcore studio/Modules/Widget Manager',
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
