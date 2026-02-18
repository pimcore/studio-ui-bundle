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
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import type { DragAndDropInfo } from '@sdk/components'
import type { ImageGalleryValueItem } from '../../image-gallery'
import { useTranslation } from 'react-i18next'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { isEmpty } from 'lodash'
import { useStyles } from '../../image-gallery.styles'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'

interface ImageGalleryImageTargetProps {
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  disabled?: boolean
  width: string
  height: string
}

export const ImageGalleryImageTarget = ({ index, value, setValue, disabled, width, height }: ImageGalleryImageTargetProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      asset: true,
      object: false,
      document: false
    },
    config: {
      assets: {
        allowedTypes: ['image']
      }
    },
    onFinish: (event) => {
      if (!isEmpty(event.items)) {
        const newValue = [...value]
        newValue[index] = { image: { type: 'asset', id: event.items[0].data.id }, hotspots: [], marker: [], crop: {} }
        setValue(newValue)
      }
    }
  })

  const handleDroppableDrop = (info): void => {
    const newValue = [...value]
    newValue[index] = { image: { type: 'asset', id: info.data.id as number }, hotspots: [], marker: [], crop: {} }
    setValue(newValue)
  }

  return (
    <Droppable
      className={ styles.imageItem }
      disabled={ disabled }
      isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
      isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
      onDrop={ handleDroppableDrop }
      variant="outline"
    >
      <AssetTarget
        addIcon
        dndIcon={ disabled !== true }
        height={ height }
        onRemove={ value[index] === undefined
          ? undefined
          : () => {
              const newValue = [...value]
              newValue.splice(index, 1)
              setValue(newValue)
            } }
        onSearch={ openElementSelector }
        title={ t(disabled === true ? 'empty' : 'image.add.and.dnd') }
        width={ width }
      />
    </Droppable>
  )
}
