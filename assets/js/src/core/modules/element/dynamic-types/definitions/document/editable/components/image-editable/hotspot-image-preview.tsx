/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type MutableRefObject, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ResponsiveImagePreview } from '@Pimcore/components/image-preview/responsive-image-preview'
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
  value: DocumentHotspotImageValue
  onChange?: (value: DocumentHotspotImageValue) => void
  setMarkerModalOpen: () => void
  setCropModalOpen: () => void
  handleSearch: () => void
  handleLocateInTree: () => void
  emptyValue: () => void
  disabled?: boolean
}

export const DocumentHotspotImagePreview = function DocumentHotspotImagePreview (
  { assetId, height, width, value, onChange, setMarkerModalOpen, setCropModalOpen, handleSearch, handleLocateInTree, emptyValue, disabled }: DocumentHotspotImagePreviewProps
): React.JSX.Element {
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

  const dropdownItems: DropdownProps['menu']['items'] = useMemo(() => [
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
      disabled: disabled,
      onClick: handleSearch
    }
  ], [disabled, assetId, setCropModalOpen, setMarkerModalOpen, emptyValue, handleOpen, handleLocateInTree, handleSearch, t])

  return (
    <ResponsiveImagePreview
      assetId={ assetId }
      dropdownItems={ dropdownItems }
      height={ height }
      thumbnailSettings={ value.crop }
      width={ width }
    />
  )
}
