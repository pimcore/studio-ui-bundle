import React, { createContext } from 'react'
import type { selectAssetById } from '@Pimcore/modules/asset/store/asset-draft-slice'

export type AssetContextType = ReturnType<typeof selectAssetById>
export const AssetContext = createContext<AssetContextType | null>(null)

const AssetProvider = ({ asset, children }: { asset: ReturnType<typeof selectAssetById>, children: React.ReactNode }): React.JSX.Element => {
  return (
        <AssetContext.Provider value={asset}>
            {children}
        </AssetContext.Provider>
  )
}

export default AssetProvider
