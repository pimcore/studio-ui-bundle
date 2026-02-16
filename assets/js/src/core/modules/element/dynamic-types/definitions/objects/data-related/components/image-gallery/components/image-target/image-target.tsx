/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {useCallback} from 'react'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import type { DragAndDropInfo } from '@sdk/components'
import type { ImageGalleryValueItem } from '../../image-gallery'
import { useTranslation } from 'react-i18next'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import {isEmpty, isNil} from 'lodash'
import { useStyles } from '../../image-gallery.styles'
import {isValidElementType} from "@Pimcore/modules/element/utils/element-type";
import {InlineUpload} from "@Pimcore/components/inline-upload";
import {useUploadModal} from "@Pimcore/components/modal-upload/hooks/use-upload-modal";

interface ImageGalleryImageTargetProps {
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  disabled?: boolean
  width: string
  height: string,
  uploadPath: string
}

export const ImageGalleryImageTarget = ({ index, value, setValue, disabled, width, height, uploadPath }: ImageGalleryImageTargetProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { triggerUpload } = useUploadModal({})

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

  const handleFileSystemUpload = async (asset: any): Promise<void> => {
    const newValue = [...value]
    newValue[index] = { image: { type: 'asset', id: asset.id as number }, hotspots: [], marker: [], crop: {} }
    setValue(newValue)
  }

  const handleDroppableDrop = (info) => {
    const newValue = [...value]
    newValue[index] = { image: { type: 'asset', id: info.data.id as number }, hotspots: [], marker: [], crop: {} }
    setValue(newValue)
  }

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: uploadPath,
      accept: 'image/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          const newValue = [...value]
          newValue[index] = { image: { type: 'asset', id: assets[0].id as number }, hotspots: [], marker: [], crop: {} }
          setValue(newValue)
        }
      }
    })
  }, [triggerUpload])


  // Determine the shape based on whether an image is selected
  const droppableShape = isNil(value?.image?.id) ? 'round' : 'angular'

  return (
      <InlineUpload
          accept="image/*"
          assetType="image"
          disabled={ disabled }
          onSuccess={ handleFileSystemUpload }
          targetFolderPath={ uploadPath }
      >
        <Droppable
            className={ styles.imageItem }
            disabled={ disabled }
            // dropClass={ props.config?.dropClass }
            isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
            isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
            onDrop={ handleDroppableDrop }
            shape={ droppableShape }
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
              // onUpload={ props.config?.disableInlineUpload === true ? undefined : handleUpload }
              onUpload={ handleUpload }
              title={ t(disabled !== true ? 'image.dnd-target' : 'empty') }
              width={ width }
          />
        </Droppable>
      </InlineUpload>
  )
}
