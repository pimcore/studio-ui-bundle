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