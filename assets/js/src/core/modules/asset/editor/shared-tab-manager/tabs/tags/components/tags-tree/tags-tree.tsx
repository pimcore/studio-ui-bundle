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

import React, { type Key, useState } from 'react'
import { Input, Tree, type TreeProps } from 'antd'
import {
  type AssignTagForElementApiArg,
  type Tag,
  useBatchReplaceTagsForElementsMutation
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'
import {
  useStyle
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree.styles'

interface TagsTreeProps {
  elementId: number
  elementType: AssignTagForElementApiArg['elementType']
  tags: Tag[]
  setFilter: (filter: string) => void
  isLoading?: boolean
  defaultCheckedTags: React.Key[]
  setDefaultCheckedTags: (tags: React.Key[]) => void
}

export const TagsTree = ({ elementId, elementType, tags, setFilter, isLoading, defaultCheckedTags, setDefaultCheckedTags }: TagsTreeProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { Search } = Input
  const { createTreeStructure } = useCreateTreeStructure()
  const [replaceTagsMutation] = useBatchReplaceTagsForElementsMutation()
  const treeData = createTreeStructure({ tags })
  const [isAssignRunning, setIsAssignRunning] = useState<boolean>(false)

  console.log(isAssignRunning)
  console.log(defaultCheckedTags)

  const applyTagsToElement = async (checkedKeys: { checked: Key[], halfChecked: Key[] }): Promise<void> => {
    setIsAssignRunning(true)
    await replaceTagsMutation({
      elementType,
      elementTagIdCollection: {
        elementIds: [elementId],
        tagIds: checkedKeys.checked.map(Number)
      }
    })
    setIsAssignRunning(false)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys: { checked: Key[], halfChecked: Key[] }, info) => {
    setDefaultCheckedTags(checkedKeys.checked)
    void applyTagsToElement(checkedKeys)
  }

  return (
    <>
      <Search
        className={ styles.search }
        loading={ isLoading }
        onChange={ (e) => {
          const { value } = e.target

          setFilter(value)
        } }
        placeholder="Search"
        style={ { marginBottom: 8 } }
      />

      <Tree
        checkStrictly
        checkable
        checkedKeys={ { checked: defaultCheckedTags, halfChecked: [] } }
        className={ styles.tree }
        defaultExpandedKeys={ ['root'] }
        onCheck={ onCheck }
        showIcon
        treeData={ treeData }
      />
    </>
  )
}
