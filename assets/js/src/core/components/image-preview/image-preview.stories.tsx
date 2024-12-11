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
import { ImagePreview } from './image-preview'

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
