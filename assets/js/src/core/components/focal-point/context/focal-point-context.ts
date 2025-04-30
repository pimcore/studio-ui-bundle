/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { ImageData as AssetImageData } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import React from 'react'

export interface FocalPointContextProps {
  coordinates: NonNullable<AssetImageData['focalPoint']>
  setCoordinates: (coordinates: NonNullable<AssetImageData['focalPoint']>) => void
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  containerRef: React.RefObject<HTMLDivElement>
}

export const FocalPointContext = React.createContext<FocalPointContextProps | undefined>(undefined)
