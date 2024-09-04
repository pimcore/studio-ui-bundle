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
import { DropdownMenu as DropdownMenuComponent, type DropdownMenuItemProps } from './dropdown-menu'
import React from 'react'
import { IconButton } from '../../icon-button/icon-button'

const config: Meta = {
  title: 'OLD/Components/Controls/Dropdowns/DropdownMenu',
  component: DropdownMenuComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const children: React.JSX.Element =
  (
    <IconButton
      icon='dots-horizontal'
      size="small"
      type='dashed'
    />
  )

const dropdownItems: DropdownMenuItemProps[] = [
  {
    onClick: (e) => {
      e.stopPropagation()
      console.log('clicked div')
    },
    iconLeft: 'target',
    label: 'preview-card.locate-in-tree',
  },
  {
    iconLeft: 'info-circle-outlined',
    label: 'preview-card.info',
    iconRight: {
      name: 'right-outlined',
      onClick: (e) => {
        e.stopPropagation()
        console.log('clicked icon right')
      }
    }
  },
  {
    iconLeft: 'rich-edit',
    label: 'preview-card.rename'
  },
  {
    iconLeft: 'download-02',
    label: 'preview-card.download-zip'
  },
  {
    iconLeft: 'trash',
    label: 'preview-card.delete'
  },
  {
    iconLeft: 'info-circle-outlined',
    label: 'preview-card.info',
    iconToLabel: { name: 'right-outlined' },
    iconRight: { name: 'pin-02' }
  }
]

export const _default = {
  args: {
    children,
    placement: 'bottomLeft',
    dropdownItems
  }
}
