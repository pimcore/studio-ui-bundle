import React, { createContext, useMemo } from 'react'

export interface IAssetContext {
  id?: number
}

export interface IAssetProviderProps {
  id: number
  children: React.ReactNode
}

export const AssetContext = createContext<IAssetContext>({})

export const AssetProvider = ({ id, children }: IAssetProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <AssetContext.Provider value={ { id } }>
      {children}
    </AssetContext.Provider>
  ), [id])
}
