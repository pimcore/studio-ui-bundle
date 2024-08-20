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

import React, { useMemo, useState } from 'react'
import type { ImageData as AssetImageData } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { FocalPointContext } from '../context/focal-point-context'

export const FocalPointProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [coordinates, setCoordinates] = React.useState<NonNullable<AssetImageData['focalPoint']>>({
    x: 0,
    y: 0
  })
  const [isActive, setIsActive] = React.useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false) // to freeze the focal point

  return useMemo(() => (
    <FocalPointContext.Provider value={ {
      isActive,
      setIsActive,
      coordinates,
      setCoordinates,
      disabled,
      setDisabled
    } }
    >
      {children}
    </FocalPointContext.Provider>
  ), [isActive, coordinates, disabled])
}
