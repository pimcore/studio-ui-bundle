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
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { ImageTarget } from '@Pimcore/components/image-target/image-target'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import type { ImageGalleryValueItem } from '../../image-gallery'
import { useTranslation } from 'react-i18next'

interface ImageGalleryImageTargetProps {
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
}

export const ImageGalleryImageTarget = ({ index, value, setValue }: ImageGalleryImageTargetProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Droppable
      isValidContext={ (info: DragAndDropInfo) => true }
      isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
      onDrop={ (info: DragAndDropInfo) => {
        const newValue = [...value]
        newValue[index] = { image: { type: 'asset', id: info.data.id as number } }
        setValue(newValue)
      } }
      variant="outline"
    >
      <ImageTarget
        dndIcon
        height={ 100 }
        onRemove={ value[index] === undefined
          ? undefined
          : (event) => {
              event.stopPropagation()
              const newValue = [...value]
              newValue.splice(index, 1)
              setValue(newValue)
            } }
        title={ t('image.dnd-target') }
        uploadIcon
        width={ 200 }
      />
    </Droppable>
  )
}
