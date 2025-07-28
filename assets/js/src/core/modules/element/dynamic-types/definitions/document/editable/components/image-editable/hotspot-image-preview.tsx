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
  setMarkerModalOpen: (open: boolean) => void
  disabled?: boolean
}

export const DocumentHotspotImagePreview = forwardRef(function DocumentHotspotImagePreview (
  { assetId, height, width, value, onChange, setMarkerModalOpen, disabled }: DocumentHotspotImagePreviewProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  return (
    <div ref={ ref }>
      <ImagePreview
        assetId={ assetId }
        height={ height }
        thumbnailSettings={ value.crop ?? undefined }
        width={ width }
      />

      {/* No need for local modal management - using centralized modal system */}
    </div>
  )
})
