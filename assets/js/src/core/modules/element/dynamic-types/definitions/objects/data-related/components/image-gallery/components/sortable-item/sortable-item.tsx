/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import {
  ImageGalleryImageTarget
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target'
import {
  ImageGalleryImagePreview
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview'
import {
  type ImageGalleryValue,
  type ImageGalleryValueItem
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery'
import { useStyles } from '../../image-gallery.styles'

export interface ImageGallerySortableItemProps {
  id: string
  index: number
  item: ImageGalleryValueItem
  value: ImageGalleryValue
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValue>>
  setInternalValue: (value: ImageGalleryValue) => void
  disabled?: boolean
  width: string
  height: string
}

export const ImageGallerySortableItem = ({ id, index, item, value, setValue, setInternalValue, disabled, width, height }: ImageGallerySortableItemProps): React.JSX.Element => {
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

  const { styles } = useStyles()

  return (
    <div
      ref={ setNodeRef }
      { ...attributes }
      { ...listeners }
      className={ styles.imageItem }
      style={ active?.data.current?.sortable !== undefined ? style : undefined }
    >
      { item.image !== null
        ? (
          <ImageGalleryImagePreview
            disabled={ disabled }
            height={ height }
            index={ index }
            item={ item }
            setInternalValue={ setInternalValue }
            setValue={ setValue }
            value={ value }
            width={ width }
          />
          )
        : (
          <ImageGalleryImageTarget
            disabled={ disabled }
            height={ height }
            index={ index }
            setValue={ setValue }
            value={ value }
            width={ width }
          />
          )
        }
    </div>
  )
}
