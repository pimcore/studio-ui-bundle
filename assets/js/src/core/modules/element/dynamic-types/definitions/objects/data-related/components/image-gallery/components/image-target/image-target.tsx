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
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import type { ImageGalleryValueItem } from '../../image-gallery'
import { useTranslation } from 'react-i18next'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/components/menu/selection/selection-provider'
import { isEmpty } from 'lodash'
import { useStyles } from '../../image-gallery.styles'

interface ImageGalleryImageTargetProps {
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  disabled?: boolean
  width: string
  height: string
}

export const ImageGalleryImageTarget = ({ index, value, setValue, disabled, width, height }: ImageGalleryImageTargetProps): React.JSX.Element => {
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

  const { styles } = useStyles()

  return (
    <Droppable
      className={ styles.imageItem }
      isValidContext={ (info: DragAndDropInfo) => true }
      isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
      onDrop={ (info: DragAndDropInfo) => {
        const newValue = [...value]
        newValue[index] = { image: { type: 'asset', id: info.data.id as number }, hotspots: [], marker: [], crop: {} }
        setValue(newValue)
      } }
      variant="outline"
    >
      <AssetTarget
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
        title={ t(disabled !== true ? 'image.dnd-target' : 'empty') }
        width={ width }
      />
    </Droppable>
  )
}
