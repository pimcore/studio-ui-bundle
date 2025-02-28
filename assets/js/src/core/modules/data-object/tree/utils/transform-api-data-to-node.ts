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
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { type DataObjectGetTreeApiResponse, type DataObjectPermissions } from '../../data-object-api-slice.gen'

export interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

export const transformApiDataToNodes = (node: TreeNodeProps, data: DataObjectGetTreeApiResponse, maxItemsPerNode: number | undefined): DataTransformerReturnType => {
  const nodes: TreeNodeProps[] = []

  const dataObjectData = data.items
  dataObjectData.forEach((dataObjectNode) => {
    nodes.push({
      id: dataObjectNode.id.toString(),
      icon: getElementIcon(dataObjectNode, { type: 'name', value: 'data-object' }),
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
      elementType: 'data-object',
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
