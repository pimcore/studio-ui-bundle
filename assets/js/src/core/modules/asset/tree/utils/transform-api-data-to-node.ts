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
import { type AssetGetTreeApiResponse, type AssetPermissions } from '../../asset-api-slice.gen'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'

export interface DataTransformerReturnType {
  nodes: TreeNodeProps[]
  total: number
}

export const transformApiDataToNodes = (node: TreeNodeProps, data: AssetGetTreeApiResponse, maxItemsPerNode: number | undefined): DataTransformerReturnType => {
  const nodes: TreeNodeProps[] = []

  const assetData = data.items
  assetData.forEach((assetNode) => {
    nodes.push({
      id: assetNode.id.toString(),
      icon: getElementIcon(assetNode, { type: 'name', value: 'unknown' }),
      label: assetNode.filename!,
      type: assetNode.type,
      parentId: assetNode.parentId.toString(),
      children: [],
      hasChildren: assetNode.hasChildren,
      isLocked: assetNode.isLocked,
      metaData: {
        asset: assetNode
      },
      permissions: assetNode.permissions ?? [] as AssetPermissions,
      level: node.level + 1,
      elementType: 'asset',
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
