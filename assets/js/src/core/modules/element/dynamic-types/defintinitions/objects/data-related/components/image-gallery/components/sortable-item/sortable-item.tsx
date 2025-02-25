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

import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
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
import {
  type HotspotMarkersModalContainerRef
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container'

export interface ImageGallerySortableItemProps {
  id: string
  index: number
  item: ImageGalleryValueItem
  value: ImageGalleryValue
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValue>>
  disabled?: boolean
  hotspotMarkersModalContainer: React.RefObject<HotspotMarkersModalContainerRef>
}

export const ImageGallerySortableItem = ({ id, index, item, value, setValue, disabled, hotspotMarkersModalContainer }: ImageGallerySortableItemProps): React.JSX.Element => {
  const sortable = useSortable({
    id,
    transition: {
      duration: 300,
      easing: 'linear'
    }
  })
  const { attributes, listeners, setNodeRef, transform, transition, active } = sortable

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={ setNodeRef }
      { ...attributes }
      { ...listeners }
      style={ active?.data.current?.sortable !== undefined ? style : undefined }
    >
      { item.image !== null
        ? (
          <ImageGalleryImagePreview
            disabled={ disabled }
            hotspotMarkersModalContainer={ hotspotMarkersModalContainer }
            index={ index }
            item={ item }
            setValue={ setValue }
            value={ value }
          />
          )
        : (
          <ImageGalleryImageTarget
            disabled={ disabled }
            index={ index }
            setValue={ setValue }
            value={ value }
          />
          )
        }
    </div>
  )
}
