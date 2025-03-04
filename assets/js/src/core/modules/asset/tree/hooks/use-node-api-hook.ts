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

import { TreeContext } from '@Pimcore/components/element-tree/element-tree'
import {
  type AssetGetTreeApiResponse,
  api
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useContext } from 'react'
import { transformApiDataToNodes } from '../utils/transform-api-data-to-node'
import { useTreeFilter } from '@Pimcore/modules/element/tree/provider/tree-filter-provider/use-tree-filter'
import { type NodeApiHookReturnType, type DataTransformerReturnType, type DataTransformerSourceNode } from '@Pimcore/components/element-tree/types/node-api-hook'
import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type NodeState } from '@Pimcore/components/element-tree/hooks/use-element-tree'

export const useNodeApiHook = (node: DataTransformerSourceNode, pageSize?: number): NodeApiHookReturnType => {
  const { maxItemsPerNode } = useContext(TreeContext)
  const { treeFilterArgs } = useTreeFilter()
  const dispatch = useAppDispatch()

  function dataTransformer (data: AssetGetTreeApiResponse): DataTransformerReturnType {
    return transformApiDataToNodes(node, data, maxItemsPerNode)
  }

  async function fetchApiHookResult (nodeState: NodeState): Promise<DataTransformerReturnType | undefined> {
    const treeFetcher = dispatch(api.endpoints.assetGetTree.initiate({ parentId: parseInt(node.id), pageSize: pageSize ?? maxItemsPerNode!, page: nodeState.page, idSearchTerm: nodeState.searchTerm, ...treeFilterArgs }))

    return await treeFetcher
      .then(({ data, isSuccess, isError, error }) => {
        if (isError) {
          trackError(new ApiError(error))
          return undefined
        }

        if (isSuccess) {
          return dataTransformer(data)
        }

        return undefined
      })
      .catch(() => undefined)
  }

  return { fetchApiHookResult, dataTransformer } as const
}
