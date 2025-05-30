/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Element, getElementIcon } from '@Pimcore/modules/element/element-helper'
import { type DocumentGetTreeApiResponse, type DocumentPermissions } from '../../document-api-slice.gen'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type DataTransformerSourceNode, type DataTransformerReturnType } from '@Pimcore/components/element-tree/types/node-api-hook'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const transformApiDataToNodes = (node: DataTransformerSourceNode, data: DocumentGetTreeApiResponse, maxItemsPerNode: number | undefined): DataTransformerReturnType => {
  const nodes: TreeNode[] = []

  const documentData = data.items
  documentData.forEach((documentNode) => {
    nodes.push({
      id: documentNode.id.toString(),
      elementType: elementTypes.document,
      icon: getElementIcon(documentNode as Element, { type: 'name', value: 'document' }),
      label: documentNode.key,
      type: documentNode.type,
      parentId: documentNode.parentId.toString(),
      hasChildren: documentNode.hasChildren,
      locked: documentNode.locked,
      isLocked: documentNode.isLocked,
      isPublished: documentNode.published,
      metaData: {
        document: documentNode
      },
      permissions: documentNode.permissions ?? [] as unknown as DocumentPermissions,
      internalKey: `${node.internalKey}-${documentNode.id}`
    })
  })

  const total = data.totalItems ?? maxItemsPerNode

  return { nodes, total }
}
