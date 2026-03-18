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
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { type DragAndDropInfo } from '@sdk/components'
import type { ImageGalleryValueItem } from '../../image-gallery'
import {
  fromIHotspots,
  toIHotspots
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'
import { isEmpty, isNil } from 'lodash'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { useCropModal } from '@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal'
import { useHotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal'
import { type DataTemplates } from '@Pimcore/modules/element/components/hotspot-markers-modal/hotspot-markers-modal'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'

interface ImageGalleryImagePreviewProps {
  item: ImageGalleryValueItem
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  setInternalValue: (value: ImageGalleryValueItem[]) => void
  disabled?: boolean
  width: string
  height: string
  ratioX?: number
  ratioY?: number
  predefinedDataTemplates?: DataTemplates | string | null
  uploadPath?: string
}

export const ImageGalleryImagePreview = ({ item, index, value, setInternalValue, setValue, disabled, width, height, ratioX, ratioY, predefinedDataTemplates, uploadPath }: ImageGalleryImagePreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()
  const messageApi = useMessage()
  const { confirm } = useFormModal()
  const { triggerUpload } = useUploadModal({})

  const { openModal: openCropModal } = useCropModal({
    disabled,
    ratioX,
    ratioY,
    onChange: (crop) => {
      if (!isNil(item.image?.id)) {
        const newValue = value.map((v, i) => i === index ? { ...v, crop: crop ?? {} } : v)
        setValue(newValue)
      }
    }
  })

  const { openModal: openHotspotMarkersModal } = useHotspotMarkersModal({
    disabled,
    predefinedDataTemplates,
    onChange: (hotspots) => {
      const { hotspots: newHotspots, marker: newMarkers } = fromIHotspots(hotspots)
      const newValue = value.map((v, i) => i === index ? { ...v, hotspots: newHotspots, marker: newMarkers } : v)
      setValue(newValue)
    }
  })

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
        replaceImage({
          type: elementTypes.asset,
          id: event.items[0].data.id
        })
      }
    }
  })

  const clearHotspotsData = async (): Promise<void> => {
    setValue(value.map((v, i) => i === index ? { ...v, hotspots: [], marker: [] } : v))
    await messageApi.success(t('hotspots.data-cleared'))
  }

  const hasHotspotData = (index: number): boolean => {
    return !isEmpty(value[index].hotspots) || !isEmpty(value[index].marker)
  }

  const replaceImage = (newImage: ImageValue): void => {
    if (hasHotspotData(index)) {
      confirm({
        title: t('hotspots.clear-data'),
        content: t('hotspots.clear-data.dnd-message'),
        okText: t('yes'),
        cancelText: t('no'),
        onOk: () => {
          setImage(index, newImage, true)
        },
        onCancel: () => {
          setImage(index, newImage, false)
        }
      })
    } else {
      setImage(index, newImage, true)
    }
  }

  const setImage = (index: number, image: ImageValue, replaceValueData: boolean): void => {
    const newValue = [...value]

    if (replaceValueData) {
      newValue[index] = { image, hotspots: [], marker: [], crop: {} }
    } else {
      newValue[index] = { ...newValue[index], crop: {}, image }
    }

    setValue(newValue)
  }

  const handleOpenCropModal = (): void => {
    if (!isNil(item.image?.id)) {
      openCropModal(
        item.image.id,
        item.crop
      )
    }
  }
  const handleOpenHotspotMarkersModal = (): void => {
    if (!isNil(item.image?.id)) {
      const hotspots = toIHotspots(item.hotspots ?? [], item.marker ?? [])
      openHotspotMarkersModal(item.image.id, hotspots, item.crop)
    }
  }
  const handleFileSystemUpload = async (asset): Promise<void> => {
    setImage(index, asset as ImageValue, true)
  }

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: uploadPath ?? '',
      accept: 'image/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          setImage(index, assets[0] as ImageValue, true)
        }
      }
    })
  }, [triggerUpload])

  return (
    <InlineUpload
      accept="image/*"
      assetType="image"
      disabled={ disabled }
      onSuccess={ handleFileSystemUpload }
      targetFolderPath={ uploadPath ?? '' }
    >
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => {
          if (disabled === true) {
            return false
          }
          if (info.sortable! !== undefined) {
            return true
          }
          return info.type === 'asset' || info.type === 'document' || info.type === 'data-object' || info.type === 'unknown'
        } }
        isValidData={ (info: DragAndDropInfo) => {
          if (info.sortable! !== undefined || info.type === 'unknown') {
            return true
          }
          return ((info.type === 'asset' && info.data.type === 'image')) || info.type === 'unknown'
        } }
        onDrop={ (info: DragAndDropInfo) => {
          const newImage: ImageValue = { type: 'asset', id: info.data.id as number }
          replaceImage(newImage)
        } }
        variant="outline"
      >
        <ImagePreview
          assetId={ item.image!.id }
          bordered
          dropdownItems={ [
            {
              hidden: disabled,
              key: 'add',
              label: t('add'),
              icon: <Icon value={ 'new' } />,
              onClick: () => {
                const newValue = [...value]
                newValue.splice(index + 1, 0, { image: null, hotspots: [], marker: [], crop: {} })
                setInternalValue(newValue)
              }
            },
            {
              hidden: disabled,
              key: 'delete',
              label: t('delete'),
              icon: <Icon value={ 'trash' } />,
              onClick: () => {
                const newValue = [...value]
                newValue.splice(index, 1)
                setValue(newValue)
              }
            },
            {
              label: t('crop'),
              key: 'crop',
              icon: <Icon value={ 'crop' } />,
              onClick: handleOpenCropModal
            },
            {
              label: t(disabled === true ? 'hotspots.show' : 'hotspots.edit'),
              key: 'hotspots-edit',
              icon: <Icon value={ 'new-marker' } />,
              onClick: handleOpenHotspotMarkersModal
            },
            {
              hidden: !hasHotspotData(index) || disabled === true,
              label: t('hotspots.clear-data'),
              key: 'clear-data',
              icon: <Icon value={ 'remove-marker' } />,
              onClick: clearHotspotsData
            },
            {
              label: t('element.open'),
              key: 'open',
              icon: <Icon value={ 'open-folder' } />,
              onClick: async () => {
                openAsset({
                  config: {
                    id: item.image!.id
                  }
                })
              }
            },
            {
              hidden: disabled,
              key: 'search',
              label: t('search'),
              icon: <Icon value={ 'search' } />,
              onClick: () => {
                openElementSelector()
              }
            },
            {
              hidden: disabled,
              icon: <Icon value="upload-cloud" />,
              key: 'upload',
              label: t('upload'),
              onClick: handleUpload
            },
            {
              hidden: disabled,
              label: t('empty'),
              key: 'empty',
              icon: <Icon value={ 'trash' } />,
              onClick: async () => {
                setValue(value.map((v, i) => i === index ? { image: null, hotspots: [], marker: [], crop: {} } : v))
              }
            }
          ] }
          height={ height }
          onHotspotsDataButtonClick={ hasHotspotData(index) ? handleOpenHotspotMarkersModal : undefined }
          style={ { backgroundColor: '#fff' } }
          thumbnailSettings={ item.crop }
          width={ width }
        />
      </Droppable>
    </InlineUpload>
  )
}
