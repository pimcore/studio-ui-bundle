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
import React from 'react'
import { PreviewCard as PreviewCardComponent, SizeTypes } from './preview-card'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '../icon/icon'

// @todo refactor die to naming and component splitting
const config: Meta = {
  title: 'Components/__Refactor__/PreviewCard',
  component: PreviewCardComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const dropdownItems: DropdownProps['menu']['items'] = [
  {
    key: 'locate-in-tree',
    icon: <Icon value="target" />,
    label: 'preview-card.locate-in-tree'
  }
]

export const _default = {
  args: {
    name: 'Pimconaout0_123.jpg',
    imgSrc: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
    dropdownItems,
    size: SizeTypes.MEDIUM,
    onClick: (e) => {
      console.log('Card clicked')
    }
  }
}
