/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject } from 'react'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { HotspotMarkersModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal'
import { fromIHotspots, toIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import {
  HotspotDataProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-data-provider'
import { type Hotspot, type Marker } from '../../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { type CropSettings } from '../../../../objects/data-related/helpers/hotspot-image/types/crop-types'

interface DocumentHotspotImageValue {
  image: { type: 'asset', id: number } | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}

interface DocumentHotspotImagePreviewProps {
  assetId: number
  height: number | string
  width: number | string
  value: DocumentHotspotImageValue
  onChange?: (value: DocumentHotspotImageValue) => void
  markerModalOpen: boolean
  setMarkerModalOpen: (open: boolean) => void
  disabled?: boolean
}

export const DocumentHotspotImagePreview = forwardRef(function DocumentHotspotImagePreview (
  { assetId, height, width, value, onChange, markerModalOpen, setMarkerModalOpen, disabled }: DocumentHotspotImagePreviewProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const handleHotspotsChange = (iHotspots: IHotspot[]): void => {
    const { hotspots, marker } = fromIHotspots(iHotspots)
    const newValue: DocumentHotspotImageValue = { ...value, hotspots, marker }
    onChange?.(newValue)
  }

  const hideMarkerModal = (): void => {
    setMarkerModalOpen(false)
  }

  return (
    <div ref={ ref }>
      <ImagePreview
        assetId={ assetId }
        height={ height }
        thumbnailSettings={ value.crop ?? undefined }
        width={ width }
      />

      {markerModalOpen && (
        <HotspotDataProvider>
          <HotspotMarkersModal
            crop={ value.crop }
            disabled={ disabled }
            hotspots={ toIHotspots(value.hotspots ?? [], value.marker ?? []) }
            imageId={ assetId }
            onChange={ handleHotspotsChange }
            onClose={ hideMarkerModal }
            open={ markerModalOpen }
          />
        </HotspotDataProvider>
      )}
    </div>
  )
})
