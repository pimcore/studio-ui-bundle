import { createContext } from 'react'

export interface IAssetContext {
  id?: number
}

export const AssetContext = createContext<IAssetContext>({})
