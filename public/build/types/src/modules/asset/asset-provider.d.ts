import React from 'react';
export interface IAssetContext {
    id?: number;
}
export interface IAssetProviderProps {
    id: number;
    children: React.ReactNode;
}
export declare const AssetContext: React.Context<IAssetContext>;
export declare const AssetProvider: ({ id, children }: IAssetProviderProps) => React.JSX.Element;
//# sourceMappingURL=asset-provider.d.ts.map