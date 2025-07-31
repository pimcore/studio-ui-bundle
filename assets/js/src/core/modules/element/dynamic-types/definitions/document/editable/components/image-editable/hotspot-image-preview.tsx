/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageEditablePreview } from './image-editable-preview'
import { type Hotspot, type Marker } from '../../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { type CropSettings } from '../../../../objects/data-related/helpers/hotspot-image/types/crop-types'
import { Icon } from '@Pimcore/components/icon/icon'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'

interface DocumentHotspotImageValue {
  image: { type: 'asset', id: number } | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}

interface DocumentHotspotImagePreviewProps {
  assetId: number
  height?: number | string
  width?: number | string
  containerWidth: number
  value: DocumentHotspotImageValue
  onChange?: (value: DocumentHotspotImageValue) => void
  setMarkerModalOpen: () => void
  setCropModalOpen: () => void
  handleSearch: () => void
  handleLocateInTree: () => void
  handleUpload: () => void
  emptyValue: () => void
  disabled?: boolean
  disableInlineUpload?: boolean
  imgAttributes?: Record<string, string>
  focalPointContextMenuItem?: boolean
  onResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number, height: number } | null
}

export const DocumentHotspotImagePreview = ({ 
  assetId, 
  height, 
  width, 
  containerWidth, 
  value, 
  onChange, 
  setMarkerModalOpen, 
  setCropModalOpen, 
  handleSearch, 
  handleLocateInTree, 
  handleUpload, 
  emptyValue, 
  disabled, 
  disableInlineUpload, 
  imgAttributes, 
  focalPointContextMenuItem,
  onResize,
  lastImageDimensions 
}: DocumentHotspotImagePreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()

  const handleOpen = (): void => {
    if (!isNil(assetId)) {
      void openElement({
        id: assetId,
        type: 'asset'
      })
    }
  }

  const handleSetFocalPoint = (): void => {
    // Same as open - open the asset in the editor where focal point can be set
    handleOpen()
  }

  const dropdownItems: DropdownProps['menu']['items'] = useMemo(() => {
    const items: DropdownProps['menu']['items'] = []

    if (focalPointContextMenuItem === true) {
      items.push({
        key: 'set-focal-point',
        icon: <Icon value="target" />,
        label: t('focal-point.set'),
        disabled: disabled === true || isNil(assetId),
        onClick: handleSetFocalPoint
      })
    }

    items.push(
      {
        key: 'crop',
        icon: <Icon value="crop" />,
        label: t('crop'),
        disabled: disabled === true || isNil(assetId),
        onClick: () => { setCropModalOpen() }
      },
      {
        key: 'hotspots-markers',
        icon: <Icon value="location-marker" />,
        label: t('hotspots.edit'),
        disabled: disabled === true || isNil(assetId),
        onClick: () => { setMarkerModalOpen() }
      },
      {
        key: 'empty',
        icon: <Icon value="trash" />,
        label: t('empty'),
        disabled: disabled === true || isNil(assetId),
        onClick: emptyValue
      },
      {
        key: 'open',
        icon: <Icon value="open-folder" />,
        label: t('open'),
        disabled: disabled === true || isNil(assetId),
        onClick: handleOpen
      },
      {
        key: 'locate-in-tree',
        icon: <Icon value="target" />,
        label: t('element.locate-in-tree'),
        disabled: disabled === true || isNil(assetId),
        onClick: handleLocateInTree
      },
      {
        key: 'search',
        icon: <Icon value="search" />,
        label: t('search'),
        disabled,
        onClick: handleSearch
      }
    )

    if (disableInlineUpload !== true) {
      items.push({
        key: 'upload',
        icon: <Icon value="upload-cloud" />,
        label: t('upload'),
        disabled: disabled === true,
        onClick: handleUpload
      })
    }

    return items
  }, [disabled, assetId, focalPointContextMenuItem, disableInlineUpload, handleSetFocalPoint, setCropModalOpen, setMarkerModalOpen, handleUpload, emptyValue, handleOpen, handleLocateInTree, handleSearch, t])

  return (
    <div>
      <ImageEditablePreview
        assetId={ assetId }
        containerWidth={ containerWidth }
        dropdownItems={ dropdownItems }
        height={ height }
        imgAttributes={ imgAttributes }
        lastImageDimensions={ lastImageDimensions }
        onResize={ onResize }
        thumbnailSettings={ value.crop }
        width={ width }
      />
    </div>
  )
}
