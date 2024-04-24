import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { TreeContext } from '@Pimcore/components/tree/tree'
import { type GetAssetsApiResponse, useGetAssetsQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { type Dispatch, type SetStateAction, useContext, useState } from 'react'

interface AssetTreeAdditionalTreeProps {
  pager?: number
}

interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

interface NodeApiHookReturnType {
  apiHookResult: UseQueryHookResult<any>
  dataTransformer: (data: GetAssetsApiResponse) => DataTransformerReturnType
  mergeAdditionalQueryParams: Dispatch<SetStateAction<AssetTreeAdditionalTreeProps | undefined>>
}

export const useNodeApiHook = (node: TreeNodeProps): NodeApiHookReturnType => {
  const [additionalQueryParams, setAdditionalQueryParams] = useState<AssetTreeAdditionalTreeProps>()
  const { maxItemsPerNode } = useContext(TreeContext)
  const apiHookResult = useGetAssetsQuery({ parentId: parseInt(node.id), pageSize: maxItemsPerNode, page: 1, ...additionalQueryParams })

  function dataTransformer (data: GetAssetsApiResponse): DataTransformerReturnType {
    const nodes: TreeNodeProps[] = []

    const assetData = data.items!
    assetData.forEach((assetNode) => {
      nodes.push({
        id: assetNode.id!.toString(),
        icon: assetNode.iconName ?? 'file-question-02',
        label: assetNode.filename!,
        children: [],
        hasChildren: assetNode.hasChildren,
        metaData: {
          asset: assetNode
        },
        level: node.level + 1,
        ...(() => {
          if (node.level === -1) {
            return { internalKey: `${assetNode.id}` }
          }

          return { internalKey: `${node.internalKey}-${assetNode.id}` }
        })()
      })
    })

    const total = data.totalItems ?? maxItemsPerNode

    return { nodes, total }
  }

  function mergeAdditionalQueryParams (newParams: AssetTreeAdditionalTreeProps): void {
    const params = { ...additionalQueryParams, ...newParams }

    setAdditionalQueryParams(params)
  }

  return { apiHookResult, dataTransformer, mergeAdditionalQueryParams } as const
}
