/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef, useCallback } from 'react'
import { MIN_WIDTH, MIN_HEIGHT, DEFAULT_HEIGHT } from '../image-dimensions'

interface AssetDimensions {
  width: number
  height: number
}

interface UseAssetDimensionsReturn {
  getSmartDimensions: (currentAssetId?: number) => AssetDimensions | null
  handlePreviewResize: (dimensions: AssetDimensions) => void
  handleAssetTargetResize: (dimensions: AssetDimensions) => void
}

/**
 * Hook to manage asset dimensions with minimum constraints and reference tracking
 * Provides smart dimension selection based on asset ID transitions:
 * - When changing from image to image: use lastPreviewDimensions (keep image size)
 * - When changing from empty to image: use lastAssetTargetDimensions (use target size)
 */
export const useAssetDimensions = (): UseAssetDimensionsReturn => {
  const lastPreviewDimensionsRef = useRef<AssetDimensions | null>(null)
  const assetTargetDimensionsRef = useRef<AssetDimensions | null>(null)
  const cachedDimensionsRef = useRef<AssetDimensions | null>(null)

  const lastAssetIdRef = useRef<number | undefined>(undefined)
  const hasEverHadImageRef = useRef(false)
  const isCurrentlyEmptyRef = useRef(true)

  const normalize = (d: AssetDimensions): AssetDimensions => ({
    width: Math.max(d.width, MIN_WIDTH),
    height: Math.max(d.height, MIN_HEIGHT)
  })

  const detectAssetChange = (currentAssetId?: number): boolean => {
    if (lastAssetIdRef.current !== currentAssetId) {
      lastAssetIdRef.current = currentAssetId
      cachedDimensionsRef.current = null
      return true
    }
    return false
  }

  const updateEmptyState = (isEmpty: boolean): void => {
    if (isEmpty && !isCurrentlyEmptyRef.current) {
      isCurrentlyEmptyRef.current = true
    }
  }

  const selectDimensionSource = (): AssetDimensions | null => {
    if (!hasEverHadImageRef.current && !isCurrentlyEmptyRef.current) {
      // First image ever, not from empty state - natural size
      return null
    } else if (isCurrentlyEmptyRef.current) {
      // Coming from empty state - use AssetTarget dimensions
      return assetTargetDimensionsRef.current
    } else {
      // Coming from another image - use previous image dimensions
      return lastPreviewDimensionsRef.current
    }
  }

  const finalizeImageTransition = (dimensions: AssetDimensions | null): void => {
    hasEverHadImageRef.current = true
    isCurrentlyEmptyRef.current = false
    cachedDimensionsRef.current = dimensions
  }

  const handlePreviewResize = (dimensions: AssetDimensions): void => {
    const norm = normalize(dimensions)
    lastPreviewDimensionsRef.current = norm
    assetTargetDimensionsRef.current = norm
  }

  const handleAssetTargetResize = (dimensions: AssetDimensions): void => {
    const norm = normalize(dimensions)
    if (isCurrentlyEmptyRef.current) {
      assetTargetDimensionsRef.current = norm
    }
  }

  const getSmartDimensions = useCallback((currentAssetId?: number): AssetDimensions | null => {
    const isEmpty = currentAssetId === undefined

    detectAssetChange(currentAssetId)

    if (isEmpty) {
      updateEmptyState(true)
      return assetTargetDimensionsRef.current
    }

    if (cachedDimensionsRef.current !== null) {
      return cachedDimensionsRef.current
    }

    const selectedDimensions = selectDimensionSource()
    finalizeImageTransition(selectedDimensions)
    
    return selectedDimensions
  }, [])

  return {
    getSmartDimensions,
    handlePreviewResize,
    handleAssetTargetResize
  }
}
