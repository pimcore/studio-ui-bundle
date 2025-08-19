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
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { ResponsiveAssetPreview } from '../../helpers/responsive-asset-preview/responsive-asset-preview'
import { generatePdfThumbnailUrl } from './utils/pdf-thumbnail-sizing'

interface PdfEditablePreviewProps {
  assetId?: number
  width?: number | string
  height?: number | string
  containerWidth: number
  className?: string
  dropdownItems?: DropdownProps['menu']['items']
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number, height: number } | null
}

export const PdfEditablePreview = ({
  assetId,
  width,
  height,
  containerWidth,
  ...props
}: PdfEditablePreviewProps): React.JSX.Element => {
  const thumbnailUrl = useMemo(() => {
    if (assetId === undefined) {
      return undefined
    }

    return generatePdfThumbnailUrl({
      assetId,
      width,
      height,
      containerWidth,
      fallbackSrc: undefined
    })
  }, [assetId, width, height, containerWidth])

  return (
    <ResponsiveAssetPreview
      { ...props }
      assetId={ assetId }
      thumbnailUrl={ thumbnailUrl }
    />
  )
}
