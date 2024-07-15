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

import { TreeNode } from '@Pimcore/components/tree/node/tree-node'
import { defaultProps, Tree } from '@Pimcore/components/tree/tree'
import { PagerContainer } from '@Pimcore/modules/asset/tree/pager/pager-container'
import React from 'react'
import { type TreeContainerProps } from '@Pimcore/modules/asset/tree/tree-container'
import {
  useNodeApiHook
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-node-api-hook'

export const TagsTree = ({ id = 0 }: TreeContainerProps): React.JSX.Element => {
  return (
    <Tree
      checkable
      hide
      maxItemsPerNode={ 20 }
      nodeApiHook={ useNodeApiHook }
      nodeId={ id }
      renderNode={ TreeNode }
      renderNodeContent={ defaultProps.renderNodeContent }
      renderPager={ PagerContainer }
    />
  )
}
