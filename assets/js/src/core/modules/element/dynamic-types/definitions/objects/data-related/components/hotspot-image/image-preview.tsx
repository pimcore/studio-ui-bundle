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
import { toIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { HotspotImageValue } from './hotspot-image'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import _ from 'lodash'

interface HotspotImagePreviewProps {
  assetId: number
  height: number | string
  width: number | string
  value: HotspotImageValue
  onChange?: (value: HotspotImageValue) => void
  markerModalOpen: boolean
  setMarkerModalOpen: (imageId: number, hotspots?: IHotspot[] | null, crop?: CropSettings | null) => void
  disabled?: boolean
}

export const HotspotImagePreview = forwardRef(function HotspotImagePreview (
  { assetId, height, width, value, onChange, markerModalOpen, setMarkerModalOpen, disabled }: HotspotImagePreviewProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const hasHotspotData = (): boolean => {
    return !_.isEmpty(value.hotspots) || !_.isEmpty(value.marker)
  }

  const handleOpenHotspotMarkersModal = (): void => {
    const hotspots = toIHotspots(value.hotspots ?? [], value.marker ?? [])
    setMarkerModalOpen(assetId, hotspots, value.crop)
  }

  return (
    <div ref={ ref }>
      <ImagePreview
        assetId={ assetId }
        height={ height }
        onHotspotsDataButtonClick={ hasHotspotData() ? handleOpenHotspotMarkersModal : undefined }
        thumbnailSettings={ value.crop ?? undefined }
        width={ width }
      />
    </div>
  )
})
