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
import { HotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hotspot-markers-modal'
import { fromIHotspots, toIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import type { HotspotImageValue } from './hotspot-image'
import _ from 'lodash'
import {
  HotspotDataProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-data-provider'

interface HotspotImagePreviewProps {
  assetId: number
  height: number | string
  width: number | string
  value: HotspotImageValue
  onChange?: (value: HotspotImageValue) => void
  markerModalOpen: boolean
  setMarkerModalOpen: (open: boolean) => void
  disabled?: boolean
}

export const HotspotImagePreview = forwardRef(function HotspotImagePreview (
  { assetId, height, width, value, onChange, markerModalOpen, setMarkerModalOpen, disabled }: HotspotImagePreviewProps,
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

  return (
    <div ref={ ref }>
      <ImagePreview
        assetId={ assetId }
        height={ height }
        onHotspotsDataButtonClick={ hasHotspotData() ? () => { setMarkerModalOpen(true) } : undefined }
        thumbnailSettings={ value.crop ?? undefined }
        width={ width }
      />

      { markerModalOpen && (
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
      ) }
    </div>
  )
})
