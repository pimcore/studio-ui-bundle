import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { TreeContext } from '@Pimcore/components/tree/tree'
import { type ApiAssetsGetCollectionApiResponse, useApiAssetsGetCollectionQuery } from '@Pimcore/modules/asset/api/asset.gen'
import { type UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { type Dispatch, type SetStateAction, useContext, useState } from 'react'

interface AssetTreeAdditionalTreeProps {
  pager?: number
}

interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

export const useNodeApiHook = (node: TreeNodeProps): {
  apiHookResult: UseQueryHookResult<any>
  dataTransformer: (data: ApiAssetsGetCollectionApiResponse) => DataTransformerReturnType
  setAdditionalQueryParams: Dispatch<SetStateAction<AssetTreeAdditionalTreeProps | undefined>>
} => {
  const [additionalQueryParams, setAdditionalQueryParams] = useState<AssetTreeAdditionalTreeProps>()
  const { maxItemsPerNode } = useContext(TreeContext)
  const apiHookResult = useApiAssetsGetCollectionQuery({ parentId: parseInt(node.id), itemsPerPage: maxItemsPerNode, page: 1, ...additionalQueryParams })

  function dataTransformer (data: ApiAssetsGetCollectionApiResponse): DataTransformerReturnType {
    const nodes: TreeNodeProps[] = []

    const assetData = data['hydra:member']
    assetData.forEach((assetNode) => {
      nodes.push({
        id: assetNode.id,
        icon: 'folder',
        label: assetNode.filename,
        children: [],
        hasChildren: assetNode.children,
        metaData: {
          asset: assetNode
        },
        level: node.level + 1
      })
    })

    const total = data['hydra:totalItems'] ?? maxItemsPerNode

    return { nodes, total }
  }

  return { apiHookResult, dataTransformer, setAdditionalQueryParams } as const
}
