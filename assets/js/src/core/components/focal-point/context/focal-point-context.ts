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
