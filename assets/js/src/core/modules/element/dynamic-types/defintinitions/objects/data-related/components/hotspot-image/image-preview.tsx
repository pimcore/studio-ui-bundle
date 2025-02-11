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

import React, { forwardRef, type MutableRefObject } from 'react'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { HotspotMarkersModal } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal'
import { fromIHotspots, toIHotspots } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { HotspotImageValue } from './hotspot-image'
import _ from 'lodash'
import {
  CropModal
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/crop-modal'
import type {
  CropSettings
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/crop-types'

interface HotspotImagePreviewProps {
  assetId: number
  height: number | string
  width: number | string
  value: HotspotImageValue
  onChange?: (value: HotspotImageValue) => void
  cropModalOpen: boolean
  markerModalOpen: boolean
  setCropModalOpen: (open: boolean) => void
  setMarkerModalOpen: (open: boolean) => void
  disabled?: boolean
}

export const HotspotImagePreview = forwardRef(function HotspotImagePreview (
  { assetId, height, width, value, onChange, cropModalOpen, setCropModalOpen, markerModalOpen, setMarkerModalOpen, disabled }: HotspotImagePreviewProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const handleHotspotsChange = (iHotspots: IHotspot[]): void => {
    const { hotspots, marker } = fromIHotspots(iHotspots)
    const newValue: HotspotImageValue = { ...value, hotspots, marker }
    onChange?.(newValue)
  }

  const hasHotspotData = (): boolean => {
    return !_.isEmpty(value.hotspots) || !_.isEmpty(value.marker)
  }

  const hideMarkerModal = (): void => {
    setMarkerModalOpen(false)
  }

  const hideCropModal = (): void => {
    setCropModalOpen(false)
  }

  const onCropChange = (crop: CropSettings | null): void => {
    const newValue: HotspotImageValue = { ...value, crop: crop ?? {} }
    onChange?.(newValue)
  }

  return (
    <div ref={ ref }>
      <ImagePreview
        assetId={ assetId }
        height={ height }
        onHotspotsDataButtonClick={ hasHotspotData() ? () => { setMarkerModalOpen(true) } : undefined }
        thumbnailSettings={ value.crop ?? undefined }
        width={ width }
      />

      { cropModalOpen && (
        <CropModal
          crop={ value.crop }
          disabled={ disabled }
          imageId={ value.image!.id }
          onChange={ onCropChange }
          onClose={ hideCropModal }
          open={ cropModalOpen }
        />
      ) }

      { markerModalOpen && (
        <HotspotMarkersModal
          disabled={ disabled }
          hotspots={ toIHotspots(value.hotspots ?? [], value.marker ?? []) }
          imageId={ assetId }
          onChange={ handleHotspotsChange }
          onClose={ hideMarkerModal }
          open={ markerModalOpen }
        />
      ) }
    </div>
  )
})
