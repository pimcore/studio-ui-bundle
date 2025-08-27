/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import { MIN_WIDTH, MIN_HEIGHT } from '../image-dimensions'

interface AssetDimensions {
  width: number
  height: number
}

interface UseAssetDimensionsReturn {
  lastDimensions: AssetDimensions | null
  handleResize: (dimensions: AssetDimensions) => void
}

/**
 * Hook to manage asset dimensions with minimum constraints and reference tracking
 * Used by both image and PDF editables to track resized dimensions
 */
export const useAssetDimensions = (): UseAssetDimensionsReturn => {
  const lastDimensionsRef = useRef<AssetDimensions | null>(null)

  const handleResize = (dimensions: AssetDimensions): void => {
    const minWidth = Math.max(dimensions.width, MIN_WIDTH)
    const minHeight = Math.max(dimensions.height, MIN_HEIGHT)
    lastDimensionsRef.current = { width: minWidth, height: minHeight }
  }

  return {
    lastDimensions: lastDimensionsRef.current,
    handleResize
  }
}
