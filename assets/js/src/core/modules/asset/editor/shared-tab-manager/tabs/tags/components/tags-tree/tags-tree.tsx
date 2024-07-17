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

import React from 'react'
import { Tree } from 'antd'
import { useGetTagsQuery } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'
import {
  useStyle
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree.styles'

export const TagsTree = (): React.JSX.Element => {
  const { styles } = useStyle()
  const { data, isLoading } = useGetTagsQuery({
    page: 1,
    pageSize: 9999
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && data === undefined) {
    return <div>No data</div>
  }

  const treeData = useCreateTreeStructure({ tags: data!.items! })

  return (
    <Tree
      checkable
      className={ styles.tree }
      showIcon
      treeData={ treeData }
    />
  )
}
