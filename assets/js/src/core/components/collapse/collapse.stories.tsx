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

import type { Meta, StoryObj } from '@storybook/react'
import { Collapse, type CollapseProps } from './collapse'
import { Extra as CollapseItemDefault } from './item/collapse-item.stories'

const config: Meta = {
  title: 'Components/Layout/Collapse/Collapse',
  component: Collapse,
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<CollapseProps> = {
  args: {
    items: [
      {
        key: '1',
        ...CollapseItemDefault.args
      },

      {
        key: '2',
        ...CollapseItemDefault.args
      },

      {
        key: '3',
        ...CollapseItemDefault.args
      }
    ]
  }
}

export const Accordion: StoryObj<CollapseProps> = {
  args: {
    ..._default.args,
    accordion: true
  }
}

export const HandleUniqueItems: StoryObj<CollapseProps> = {
  args: {
    ..._default.args,
    items: [
      {
        key: '1',
        ...CollapseItemDefault.args
      },

      {
        key: '2',
        ...CollapseItemDefault.args,
        bordered: false,
        theme: 'primary',
        hasContentSeparator: false
      },

      {
        key: '3',
        ...CollapseItemDefault.args
      }
    ],
    bordered: true,
    theme: 'success'
  }
}
