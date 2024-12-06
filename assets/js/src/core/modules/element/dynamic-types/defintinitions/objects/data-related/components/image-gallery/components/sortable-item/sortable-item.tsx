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

import React from 'react'
import {
  ImageGalleryImageTarget
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image-gallery/components/image-target/image-target'
import {
  ImageGalleryImagePreview
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image-gallery/components/image-preview/image-preview'
import {
  type ImageGalleryValue,
  type ImageGalleryValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image-gallery/image-gallery'

export interface ImageGallerySortableItemProps {
  id: string
  index: number
  item: ImageGalleryValueItem
  value: ImageGalleryValue
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValue>>
}

export const ImageGallerySortableItem = ({ id, index, item, value, setValue }: ImageGallerySortableItemProps): React.JSX.Element => {
  if (item.image !== null) {
    return (
      <ImageGalleryImagePreview
        index={ index }
        item={ item }
        setValue={ setValue }
        value={ value }
      />
    )
  }

  return (
    <ImageGalleryImageTarget
      index={ index }
      setValue={ setValue }
      value={ value }
    />
  )
}
