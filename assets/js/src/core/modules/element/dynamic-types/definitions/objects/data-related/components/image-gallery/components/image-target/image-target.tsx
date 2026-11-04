/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import type { DragAndDropInfo } from '@sdk/components'
import type { ImageGalleryValueItem } from '../../image-gallery'
import { useTranslation } from 'react-i18next'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { isEmpty } from 'lodash'
import { useStyles } from '../../image-gallery.styles'
import { getDraggedElements, isElementDrag } from '@Pimcore/components/drag-and-drop/element-drag'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import { imageUploadAccept } from '@Pimcore/modules/asset/utils/upload-accept'

interface ImageGalleryImageTargetProps {
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  disabled?: boolean
  width: string
  height: string
  uploadPath?: string
}

/** The dragged image assets - a single image, or every image of a dragged set. */
const getDraggedImages = (info: DragAndDropInfo): Array<{ id: number }> => {
  if (!isElementDrag(info, [elementTypes.asset])) {
    return []
  }

  return getDraggedElements<{ id: number, type?: string }>(info).filter(asset => asset.type === 'image')
}

export const ImageGalleryImageTarget = ({ index, value, setValue, disabled, width, height, uploadPath }: ImageGalleryImageTargetProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const modal = useAlertModal()
  const { triggerUpload } = useUploadModal({})

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Multiple,
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
        const newItems: ImageGalleryValueItem[] = event.items.map((item) => (
          { image: { type: 'asset', id: item.data.id }, hotspots: [], marker: [], crop: {} }
        ))
        const newValue = [...value]
        newValue.splice(index, 1, ...newItems)
        setValue(newValue)
      }
    }
  })

  const handleFileSystemUpload = async (asset: any): Promise<void> => {
    const newValue = [...value]
    newValue[index] = { image: { type: 'asset', id: asset.id as number }, hotspots: [], marker: [], crop: {} }
    setValue(newValue)
  }

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: uploadPath ?? '',
      accept: imageUploadAccept,
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

  /**
   * Fills this slot with the dropped images, in the same way the element selector
   * does for several picked images. Anything that is not an image is skipped.
   */
  const handleDroppableDrop = (info: DragAndDropInfo): void => {
    const images = getDraggedImages(info)
    const skippedCount = getDraggedElements(info).length - images.length

    if (skippedCount > 0) {
      modal.warn({
        content: t('relation.drop.not-allowed-elements-skipped', { count: skippedCount })
      })
    }

    if (images.length === 0) {
      return
    }

    const newItems: ImageGalleryValueItem[] = images.map(image => (
      { image: { type: 'asset', id: image.id }, hotspots: [], marker: [], crop: {} }
    ))
    const newValue = [...value]
    newValue.splice(index, 1, ...newItems)
    setValue(newValue)
  }

  return (
    <InlineUpload
      accept={ imageUploadAccept }
      assetType="image"
      disabled={ disabled }
      onSuccess={ handleFileSystemUpload }
      targetFolderPath={ uploadPath ?? '' }
    >
      <Droppable
        className={ styles.imageItem }
        disabled={ disabled }
        isValidContext={ (info: DragAndDropInfo) => isElementDrag(info, [elementTypes.asset, elementTypes.document, elementTypes.dataObject]) }
        isValidData={ (info: DragAndDropInfo) => getDraggedImages(info).length > 0 }
        onDrop={ handleDroppableDrop }
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
          onSearch={ disabled === true ? undefined : openElementSelector }
          onUpload={ disabled === true ? undefined : handleUpload }
          removeLabel={ t('image-gallery.delete-frame') }
          title={ t(disabled === true ? 'empty' : 'image.add.and.dnd') }
          width={ width }
        />
      </Droppable>
    </InlineUpload>
  )
}
