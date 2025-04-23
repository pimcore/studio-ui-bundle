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

import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { type DataObjectGetTreeApiResponse, type DataObjectPermissions } from '../../data-object-api-slice.gen'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type DataTransformerSourceNode, type DataTransformerReturnType } from '@Pimcore/components/element-tree/types/node-api-hook'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const transformApiDataToNodes = (node: DataTransformerSourceNode, data: DataObjectGetTreeApiResponse, maxItemsPerNode: number | undefined): DataTransformerReturnType => {
  const nodes: TreeNode[] = []

  const dataObjectData = data.items
  dataObjectData.forEach((dataObjectNode) => {
    nodes.push({
      id: dataObjectNode.id.toString(),
      elementType: elementTypes.dataObject,
      icon: getElementIcon(dataObjectNode, { type: 'name', value: 'data-object' }),
      label: dataObjectNode.key!,
      type: dataObjectNode.type,
      parentId: dataObjectNode.parentId.toString(),
      hasChildren: dataObjectNode.hasChildren,
      locked: dataObjectNode.locked,
      isLocked: dataObjectNode.isLocked,
      isPublished: dataObjectNode.published,
      metaData: {
        dataObject: dataObjectNode
      },
      permissions: dataObjectNode.permissions ?? [] as DataObjectPermissions,
      internalKey: `${node.internalKey}-${dataObjectNode.id}`
    })
  })

  const total = data.totalItems ?? maxItemsPerNode

  return { nodes, total }
}
