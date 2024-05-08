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
import { type TreeNodeProps } from '../../../../components/tree/node/tree-node';
import { type GetAssetsApiResponse } from '../../../../modules/asset/asset-api-slice.gen';
import { type UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { type Dispatch, type SetStateAction } from 'react';
interface AssetTreeAdditionalTreeProps {
    pager?: number;
}
interface DataTransformerReturnType {
    nodes: TreeNodeProps[];
    total: number;
}
interface NodeApiHookReturnType {
    apiHookResult: UseQueryHookResult<any>;
    dataTransformer: (data: GetAssetsApiResponse) => DataTransformerReturnType;
    mergeAdditionalQueryParams: Dispatch<SetStateAction<AssetTreeAdditionalTreeProps | undefined>>;
}
export declare const useNodeApiHook: (node: TreeNodeProps) => NodeApiHookReturnType;
export {};
//# sourceMappingURL=use-node-api-hook.d.ts.map