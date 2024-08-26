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
import { type PinnableToolbarElement, Toolbar as ToolbarComponent } from './toolbar'
import i18n from '@Pimcore/app/i18n'
import { Button } from 'antd'
import React from 'react'

const config: Meta = {
  title: 'Components/Controls/Toolbar',
  component: ToolbarComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const pinnableToolbarElements: PinnableToolbarElement[] = [
  {
    iconName: 'translation',
    label: 'toolbar.translate',
    pinning: true
  },
  {
    iconName: 'expand-alt-outlined',
    label: 'toolbar.expand',
    displayingArrowIcon: true
  },
  {
    iconName: 'eye-outlined',
    label: 'toolbar.preview'
  },
  {
    iconName: 'share-alt-outlined',
    label: 'toolbar.share',
    pinning: true
  },
  {
    iconName: 'edit-outlined',
    label: 'toolbar.rename'
  },
  {
    iconName: 'trash',
    label: 'toolbar.delete'
  },
  {
    iconName: 'download-02',
    label: 'toolbar.download',
    pinning: true
  },
  {
    iconName: 'refresh',
    label: 'toolbar.reload'
  },
  {
    iconName: 'target',
    label: 'toolbar.locate-in-tree'
  }
]

export const _default = {
  args: {
    pinnableToolbarElements,
    renderSaveButton: <Button type='primary'>{ i18n.t('toolbar.save-and-publish') }</Button>
  }
}
