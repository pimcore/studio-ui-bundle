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

import {
  api,
  type AssetGetTreeApiArg
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { transformApiDataToNodes } from '../utils/transform-api-data-to-node'
import { useTreeFilter } from '@Pimcore/modules/element/tree/provider/tree-filter-provider/use-tree-filter'
import { type NodeApiHookReturnType, type DataTransformerReturnType, type DataTransformerSourceNode } from '@Pimcore/components/element-tree/types/node-api-hook'
import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type NodeState } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'

export const useNodeApiHook = (): NodeApiHookReturnType => {
  const { pageSize, treeFilterArgs } = useTreeFilter()
  const dispatch = useAppDispatch()

  async function fetchRoot (id: number): Promise<DataTransformerReturnType | undefined> {
    const node: DataTransformerSourceNode = { id: '0', internalKey: '0' }
    const rootNodePqlQuery = id === 1 ? undefined : 'id = ' + id
    return await fetch(node, { pageSize: 1, page: 1, excludeFolders: false, pathIncludeParent: true, pathIncludeDescendants: false, pqlQuery: rootNodePqlQuery })
  }

  async function fetchChildren (node: DataTransformerSourceNode, nodeState: NodeState): Promise<DataTransformerReturnType | undefined> {
    return await fetch(node, { parentId: parseInt(node.id), pageSize, page: nodeState.page, idSearchTerm: nodeState.searchTerm, ...treeFilterArgs })
  }

  async function fetch (node: DataTransformerSourceNode, args: AssetGetTreeApiArg): Promise<DataTransformerReturnType | undefined> {
    const treeFetcher = dispatch(api.endpoints.assetGetTree.initiate(args, { forceRefetch: true }))

    return await treeFetcher
      .then(({ data, isSuccess, isError, error }) => {
        if (isError) {
          trackError(new ApiError(error))
          return undefined
        }

        if (isSuccess) {
          return transformApiDataToNodes(node, data, pageSize)
        }

        return undefined
      })
      .catch(() => undefined)
  }

  return { fetchRoot, fetchChildren } as const
}
