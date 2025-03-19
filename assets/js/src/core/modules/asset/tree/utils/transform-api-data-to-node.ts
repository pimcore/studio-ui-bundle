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

import { type AssetGetTreeApiResponse, type AssetPermissions } from '../../asset-api-slice.gen'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type DataTransformerSourceNode, type DataTransformerReturnType } from '@Pimcore/components/element-tree/types/node-api-hook'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const transformApiDataToNodes = (node: DataTransformerSourceNode, data: AssetGetTreeApiResponse, maxItemsPerNode: number | undefined): DataTransformerReturnType => {
  const nodes: TreeNode[] = []

  const assetData = data.items
  assetData.forEach((assetNode) => {
    nodes.push({
      id: assetNode.id.toString(),
      elementType: elementTypes.asset,
      icon: getElementIcon(assetNode, { type: 'name', value: 'unknown' }),
      label: assetNode.filename!,
      type: assetNode.type,
      parentId: assetNode.parentId.toString(),
      hasChildren: assetNode.hasChildren,
      isLocked: assetNode.isLocked,
      metaData: {
        asset: assetNode
      },
      permissions: assetNode.permissions ?? [] as AssetPermissions,
      internalKey: `${node.internalKey}-${assetNode.id}`
    })
  })

  const total = data.totalItems ?? maxItemsPerNode

  return { nodes, total }
}
