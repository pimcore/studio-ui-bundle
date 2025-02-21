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

import React, { useState } from 'react'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import type { ImageGalleryValueItem } from '../../image-gallery'
import type { UniqueIdentifier } from '@dnd-kit/core'
import {
  fromIHotspots,
  toIHotspots
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import {
  type HotspotMarkersModalContainerRef
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import { isEmpty } from 'lodash'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import {
  CropModal
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/crop-modal'
import {
  type CropSettings
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { SelectionType } from '@Pimcore/components/dropdown/selection/selection-provider'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'

interface ImageGalleryImagePreviewProps {
  item: ImageGalleryValueItem
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  disabled?: boolean
  hotspotMarkersModalContainer: React.RefObject<HotspotMarkersModalContainerRef>
}

export const ImageGalleryImagePreview = ({ item, index, value, setValue, disabled, hotspotMarkersModalContainer }: ImageGalleryImagePreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()
  const [markerModalOpen, setMarkerModalOpen] = useState(false)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const messageApi = useMessage()
  const { confirm } = useFormModal()
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

  const hotspots = toIHotspots(item.hotspots ?? [], item.marker ?? [])

  const hideMarkerModal = (): void => {
    setMarkerModalOpen(false)
  }

  const onHotspotsChange = (iHotspots: IHotspot[]): void => {
    const { hotspots, marker } = fromIHotspots(iHotspots)
    const newValue = value.map((v, i) => i === index ? { ...v, hotspots, marker } : v)
    setValue(newValue)
  }

  if (hotspotMarkersModalContainer.current !== null) {
    const hotspotMarkersModalProps = {
      disabled,
      hotspots,
      imageId: item.image!.id,
      open: markerModalOpen,
      onClose: hideMarkerModal,
      onChange: onHotspotsChange
    }
    hotspotMarkersModalContainer.current?.setModal(index, hotspotMarkersModalProps)
  }

  const onCropChange = (crop: CropSettings | null): void => {
    const newValue = value.map((v, i) => i === index ? { ...v, crop: crop ?? {} } : v)
    setValue(newValue)
  }

  const hideCropModal = (): void => {
    setCropModalOpen(false)
  }

  const clearValueData = async (): Promise<void> => {
    setValue(value.map((v, i) => i === index ? { ...v, hotspots: [], marker: [], crop: {} } : v))
    await messageApi.success(t('hotspots.data-cleared'))
  }

  const hasHotspotData = (index: number): boolean => {
    return !isEmpty(value[index].hotspots) || !isEmpty(value[index].marker)
  }

  const hasValueData = (index: number): boolean => {
    return hasHotspotData(index) || !isEmpty(value[index].crop)
  }

  const replaceImage = (newImage: ImageValue): void => {
    if (hasValueData(index)) {
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
      newValue[index] = { ...newValue[index], image }
    }

    setValue(newValue)
  }

  return (
    <>
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
        onSort={ (info: DragAndDropInfo, dragId: UniqueIdentifier, dropId: UniqueIdentifier) => {
          const newValue = [...value]
          const dragValue = value[Number(dragId)]
          const dropValue = value[Number(dropId)]
          if (dragValue !== undefined && dropValue !== undefined) {
            newValue.splice(Number(dragId), 1)
            newValue.splice(Number(dropId), 0, dragValue)
            setValue(newValue)
          }
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
                setValue(newValue)
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
              onClick: async () => {
                setCropModalOpen(true)
              }
            },
            {
              label: t(disabled === true ? 'hotspots.show' : 'hotspots.edit'),
              key: 'hotspots-edit',
              icon: <Icon value={ 'new-marker' } />,
              onClick: async () => {
                setMarkerModalOpen(true)
              }
            },
            {
              hidden: !hasValueData(index) || disabled === true,
              label: t('hotspots.clear-data'),
              key: 'clear-data',
              icon: <Icon value={ 'remove-marker' } />,
              onClick: clearValueData
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
              label: t('empty'),
              key: 'empty',
              icon: <Icon value={ 'trash' } />,
              onClick: async () => {
                setValue(value.map((v, i) => i === index ? { image: null, hotspots: [], marker: [], crop: {} } : v))
              }
            }
          ] }
          height={ 100 }
          onHotspotsDataButtonClick={ hasHotspotData(index) ? () => { setMarkerModalOpen(true) } : undefined }
          style={ { backgroundColor: '#fff' } }
          thumbnailSettings={ item.crop }
          width={ 200 }
        />
      </Droppable>
      { cropModalOpen && (
        <CropModal
          crop={ isEmpty(item.crop) ? null : item.crop }
          disabled={ disabled }
          imageId={ item.image!.id }
          onChange={ onCropChange }
          onClose={ hideCropModal }
          open={ cropModalOpen }
        />
      ) }
    </>
  )
}
