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
  type DataObjectGetTreeApiResponse,
  type DataObjectPermissions,
  useDataObjectGetTreeQuery
} from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { type Dispatch, type SetStateAction, useContext, useState } from 'react'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'

interface DataObjectTreeAdditionalTreeProps {
  pager?: number
}

interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

interface NodeApiHookReturnType {
  apiHookResult: UseQueryHookResult<any>
  dataTransformer: (data: DataObjectGetTreeApiResponse) => DataTransformerReturnType
  mergeAdditionalQueryParams: Dispatch<SetStateAction<DataObjectTreeAdditionalTreeProps | undefined>>
}

export const useNodeApiHook = (node: TreeNodeProps): NodeApiHookReturnType => {
  const [additionalQueryParams, setAdditionalQueryParams] = useState<DataObjectTreeAdditionalTreeProps>()
  const { maxItemsPerNode } = useContext(TreeContext)
  const apiHookResult = useDataObjectGetTreeQuery({ parentId: parseInt(node.id), pageSize: maxItemsPerNode, page: 1, ...additionalQueryParams })

  function dataTransformer (data: DataObjectGetTreeApiResponse): DataTransformerReturnType {
    const nodes: TreeNodeProps[] = []

    const dataObjectData = data.items
    dataObjectData.forEach((dataObjectNode) => {
      nodes.push({
        id: dataObjectNode.id.toString(),
        icon: getElementIcon(dataObjectNode, { type: 'name', value: 'mainObject' }),
        label: dataObjectNode.key!,
        type: dataObjectNode.type,
        parentId: dataObjectNode.parentId.toString(),
        children: [],
        hasChildren: dataObjectNode.hasChildren,
        isLocked: dataObjectNode.isLocked,
        metaData: {
          dataObject: dataObjectNode
        },
        permissions: dataObjectNode.permissions ?? [] as DataObjectPermissions,
        level: node.level + 1,
        ...(() => {
          if (node.level === -1) {
            return { internalKey: `${dataObjectNode.id}` }
          }

          return { internalKey: `${node.internalKey}-${dataObjectNode.id}` }
        })()
      })
    })

    const total = data.totalItems ?? maxItemsPerNode

    return { nodes, total }
  }

  function mergeAdditionalQueryParams (newParams: DataObjectTreeAdditionalTreeProps): void {
    const params = { ...additionalQueryParams, ...newParams }

    setAdditionalQueryParams(params)
  }

  return { apiHookResult, dataTransformer, mergeAdditionalQueryParams } as const
}
