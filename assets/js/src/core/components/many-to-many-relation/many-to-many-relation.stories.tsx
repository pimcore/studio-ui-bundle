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

/**
 * Every filterable column offers a filter dropdown in its header. The filters
 * of all columns are combined and applied to the rows in the grid.
 */
export const WithColumnFilters: Story = {
  args: {
    ...Default.args,
    width: 600,
    value: [
      ...(Default.args?.value ?? []),
      {
        id: 3,
        type: 'object',
        subtype: 'Category',
        fullPath: '/Categories/Furniture',
        isPublished: true
      },
      {
        id: 4,
        type: 'document',
        subtype: 'page',
        fullPath: '/Home/Furniture',
        isPublished: true
      }
    ]
  }
}

export const WithoutColumnFilters: Story = {
  args: {
    ...Default.args,
    enableColumnFilters: false
  }
}

export const WithMaxItems: Story = {
  args: {
    ...Default.args,
    maxItems: 3
  }
}
