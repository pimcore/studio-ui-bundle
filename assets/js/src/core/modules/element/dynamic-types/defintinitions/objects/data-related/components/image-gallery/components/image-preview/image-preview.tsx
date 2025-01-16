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
import {
  type Hotspot, type Marker
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import {
  type HotspotMarkersModalContainerRef
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import _ from 'lodash'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'

interface ImageGalleryImagePreviewProps {
  item: ImageGalleryValueItem
  index: number
  value: ImageGalleryValueItem[]
  setValue: React.Dispatch<React.SetStateAction<ImageGalleryValueItem[]>>
  disabled?: boolean
  onHotspotsChange?: (hotspots: Hotspot[], marker: Marker[]) => void
  hotspotMarkersModalContainer: React.RefObject<HotspotMarkersModalContainerRef>
}

export const ImageGalleryImagePreview = ({ item, index, value, setValue, disabled, onHotspotsChange, hotspotMarkersModalContainer }: ImageGalleryImagePreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openAsset } = useAssetHelper()
  const [markerModalOpen, setMarkerModalOpen] = useState(false)
  const messageApi = useMessage()
  const { confirm } = useFormModal()

  const hotspots = toIHotspots(item.hotspots ?? [], item.marker ?? [])

  const hideMarkerModal = (): void => {
    setMarkerModalOpen(false)
  }

  const onModalHotspotsChange = (iHotspots: IHotspot[]): void => {
    const { hotspots, marker } = fromIHotspots(iHotspots)
    onHotspotsChange?.(hotspots, marker)
  }

  if (hotspotMarkersModalContainer.current !== null) {
    const hotspotMarkersModalProps = {
      hotspots,
      imageId: item.image!.id,
      open: markerModalOpen,
      onClose: hideMarkerModal,
      onChange: onModalHotspotsChange
    }
    hotspotMarkersModalContainer.current?.setModal(index, hotspotMarkersModalProps)
  }

  const clearValueData = async (): Promise<void> => {
    setValue(value.map((v, i) => i === index ? { ...v, hotspots: [], marker: [] } : v))
    await messageApi.success(t('hotspots.data-cleared'))
  }

  const hasValueData = (index: number): boolean => {
    return !_.isEmpty(value[index].hotspots) || !_.isEmpty(value[index].marker)
  }

  const setImage = (index: number, image: ImageValue, replaceValueData: boolean): void => {
    const newValue = [...value]

    if (replaceValueData) {
      newValue[index] = { image }
    } else {
      newValue[index] = { ...newValue[index], image }
    }

    setValue(newValue)
  }

  return (
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
            disabled,
            key: 'add',
            label: t('add'),
            icon: <Icon value={ 'new' } />,
            onClick: () => {
              const newValue = [...value]
              newValue.splice(index + 1, 0, { image: null })
              setValue(newValue)
            }
          },
          {
            disabled,
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
            label: t('hotspots.edit'),
            key: 'hotspots-edit',
            icon: <Icon value={ 'new-marker' } />,
            onClick: async () => {
              setMarkerModalOpen(true)
            }
          },
          {
            disabled: !hasValueData(index),
            label: t('hotspots.clear-data'),
            key: 'hotspots-edit',
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
            label: t('empty'),
            key: 'open',
            icon: <Icon value={ 'trash' } />,
            onClick: async () => {
              setValue(value.map((v, i) => i === index ? { image: null, hotspots: null, marker: null } : v))
            }
          }
        ] }
        height={ 100 }
        style={ { backgroundColor: '#fff' } }
        width={ 200 }
      />
    </Droppable>
  )
}
