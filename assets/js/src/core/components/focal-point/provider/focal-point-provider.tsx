/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef, useState } from 'react'
import type { ImageData as AssetImageData } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { FocalPointContext } from '../context/focal-point-context'

export const FocalPointProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [coordinates, setCoordinates] = useState<NonNullable<AssetImageData['focalPoint']>>({ x: 0, y: 0 })

  const [isActive, setIsActive] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  return useMemo(() => (
    <FocalPointContext.Provider value={ {
      isActive,
      setIsActive,
      coordinates,
      setCoordinates,
      disabled,
      setDisabled,
      containerRef
    } }
    >
      {children}
    </FocalPointContext.Provider>
  ), [isActive, coordinates, disabled, children])
}
