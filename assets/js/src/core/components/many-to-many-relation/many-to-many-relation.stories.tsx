/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import { ManyToManyRelation } from './many-to-many-relation'
import type { ManyToManyRelationProps } from './many-to-many-relation'

const meta: Meta<typeof ManyToManyRelation> = {
  title: 'Components/Data Entry/ManyToManyRelation',
  component: ManyToManyRelation,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    allowToClearRelation: true,
    maxItems: null,
    pathFormatterClass: null,
    width: 400,
    height: 300,
    assetInlineDownloadAllowed: true,
    assetsAllowed: true,
    objectsAllowed: true,
    documentsAllowed: true,
    allowedClasses: null,
    allowedAssetTypes: null,
    allowedDocumentTypes: null,
    value: [
      {
        id: 1,
        type: 'object',
        subtype: 'Product',
        fullPath: '/Products/Example Product',
        isPublished: true
      },
      {
        id: 2,
        type: 'asset',
        subtype: 'image',
        fullPath: '/Assets/Images/example.jpg',
        isPublished: null
      }
    ]
  }
}

export const Empty: Story = {
  args: {
    allowToClearRelation: true,
    maxItems: null,
    pathFormatterClass: null,
    width: 400,
    height: 300,
    assetInlineDownloadAllowed: true,
    assetsAllowed: true,
    objectsAllowed: true,
    documentsAllowed: true,
    allowedClasses: null,
    allowedAssetTypes: null,
    allowedDocumentTypes: null,
    value: null
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  }
}

export const WithMaxItems: Story = {
  args: {
    ...Default.args,
    maxItems: 3
  }
}
