/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type Meta } from '@storybook/react'
import { ImagePreview } from './image-preview'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Data Display/ImagePreview',
  component: ImagePreview,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'This component is used to display an image preview with specified width and height. The component has a max-width of 100% and the image is displayed centered within the given box. This component can also be used within a droppable component to allow drag and drop of images.'
      }
    }
  }
}

export default config

export const _default = {
  args: {
    width: 300,
    height: 300,
    style: {
      border: '1px dashed #d9d9d9'
    }
  }
}

export const WithDropdownItems = {
  args: {
    width: 300,
    height: 300,
    style: {
      border: '1px dashed #d9d9d9'
    },
    dropdownItems: [
      {
        key: 'open',
        label: 'Open',
        icon: <Icon value="open-folder" />
      },
      {
        key: 'search',
        label: 'Search',
        icon: <Icon value="search" />
      },
      { type: 'divider', key: 'empty-divider' },
      {
        key: 'empty',
        label: 'Empty',
        icon: <Icon value="trash" />
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'ImagePreview with dropdown items. The three-dots button (top-right) opens the context menu. Destructive actions appear last, separated by a divider.'
      }
    }
  }
}
