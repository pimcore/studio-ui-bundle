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

import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { TreeContext } from '@Pimcore/components/element-tree/element-tree'
import {
  type AssetGetTreeApiResponse,
  useAssetGetTreeQuery
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import { type Dispatch, type SetStateAction, useContext, useState } from 'react'
import { transformApiDataToNodes } from '../utils/transform-api-data-to-node'
import { useTreeFilter } from '@Pimcore/modules/element/tree/provider/tree-filter-provider/use-tree-filter'

interface AssetTreeAdditionalTreeProps {
  pager?: number
}

interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

interface NodeApiHookReturnType {
  apiHookResult: TypedUseQueryHookResult<any, unknown, any, any>
  dataTransformer: (data: AssetGetTreeApiResponse) => DataTransformerReturnType
  mergeAdditionalQueryParams: Dispatch<SetStateAction<AssetTreeAdditionalTreeProps | undefined>>
}

export const useNodeApiHook = (node: TreeNodeProps): NodeApiHookReturnType => {
  const [additionalQueryParams, setAdditionalQueryParams] = useState<AssetTreeAdditionalTreeProps>()
  const { maxItemsPerNode } = useContext(TreeContext)
  const { treeFilterArgs } = useTreeFilter()
  const apiHookResult = useAssetGetTreeQuery({ parentId: parseInt(node.id), pageSize: maxItemsPerNode!, page: 1, ...treeFilterArgs, ...additionalQueryParams })

  function dataTransformer (data: AssetGetTreeApiResponse): DataTransformerReturnType {
    return transformApiDataToNodes(node, data, maxItemsPerNode)
  }

  function mergeAdditionalQueryParams (newParams: AssetTreeAdditionalTreeProps): void {
    const params = { ...additionalQueryParams, ...newParams }

    setAdditionalQueryParams(params)
  }

  return { apiHookResult, dataTransformer, mergeAdditionalQueryParams } as const
}
