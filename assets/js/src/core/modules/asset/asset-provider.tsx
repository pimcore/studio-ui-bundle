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

import React, { createContext, useMemo } from 'react'

export interface IAssetContext {
  id: number
}

export interface IAssetProviderProps {
  id: number
  children?: React.ReactNode
}

export const AssetContext = createContext<IAssetContext>({ id: 0 })

export const AssetProvider = ({ id, children }: IAssetProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <AssetContext.Provider value={ { id } }>
      {children}
    </AssetContext.Provider>
  ), [id])
}
