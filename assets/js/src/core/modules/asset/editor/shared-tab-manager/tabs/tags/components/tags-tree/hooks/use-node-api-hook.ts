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

import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { TreeContext } from '@Pimcore/components/tree/tree'
import { type UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { type Dispatch, type SetStateAction, useContext, useState } from 'react'
import {
  type GetTagsApiResponse,
  useGetTagsQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'

interface AssetTreeAdditionalTreeProps {
  pager?: number
}

interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

interface NodeApiHookReturnType {
  apiHookResult: UseQueryHookResult<any>
  dataTransformer: (data: GetTagsApiResponse) => DataTransformerReturnType
  mergeAdditionalQueryParams: Dispatch<SetStateAction<AssetTreeAdditionalTreeProps | undefined>>
}

export const useNodeApiHook = (node: TreeNodeProps): NodeApiHookReturnType => {
  const [additionalQueryParams, setAdditionalQueryParams] = useState<AssetTreeAdditionalTreeProps>()
  const { maxItemsPerNode } = useContext(TreeContext)
  const apiHookResult = useGetTagsQuery({ parentId: parseInt(node.id), pageSize: maxItemsPerNode, page: 1, ...additionalQueryParams })

  function dataTransformer (data: GetTagsApiResponse): DataTransformerReturnType {
    const nodes: TreeNodeProps[] = []

    const tagData = data?.items ?? []
    tagData.forEach((tag) => {
      nodes.push({
        id: tag.id!.toString(),
        icon: tag.iconName ?? 'file-question-02',
        label: tag.text!,
        children: [],
        hasChildren: tag.hasChildren,
        level: node.level + 1,
        ...(() => {
          if (node.level === -1) {
            return { internalKey: `${tag.id}` }
          }

          return { internalKey: `${node.internalKey}-${tag.id}` }
        })()
      })
    })

    const total = Number(42) ?? maxItemsPerNode // ToDo: change after it was added to the API

    return { nodes, total }
  }

  function mergeAdditionalQueryParams (newParams: AssetTreeAdditionalTreeProps): void {
    const params = { ...additionalQueryParams, ...newParams }

    setAdditionalQueryParams(params)
  }

  return { apiHookResult, dataTransformer, mergeAdditionalQueryParams } as const
}
