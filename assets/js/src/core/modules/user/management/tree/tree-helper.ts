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

import type { TreeDataNode } from 'antd'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'

export const findNodeByKey = (data: TreeDataNode[], key: any): TreeDataItem | undefined => {
  for (const node of data) {
    if (node.key === key) {
      return node
    }
    if (node.children !== undefined && node.children !== null) {
      const found = findNodeByKey(node.children, key)
      if (found !== undefined) {
        return found
      }
    }
  }
  return undefined
}

export const findParentByKey = (data: TreeDataNode[], key: any, parent: TreeDataNode | null = null): TreeDataNode | null => {
  for (const node of data) {
    if (node.key === key) {
      return parent
    }
    if (node.children !== undefined && node.children !== null) {
      const found = findParentByKey(node.children, key, node)
      if (found !== null) {
        return found
      }
    }
  }
  return null
}
