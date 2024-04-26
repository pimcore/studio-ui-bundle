import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node';
import { type GetAssetsApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen';
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