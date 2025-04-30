/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
