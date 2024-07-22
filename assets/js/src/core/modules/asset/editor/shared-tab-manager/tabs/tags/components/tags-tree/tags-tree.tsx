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

import React, { type Key } from 'react'
import { Input, Tree, type TreeProps } from 'antd'
import { type Tag } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'
import {
  useStyle
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree.styles'
import {
  type TagsTreeContainerProps
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree-container'

interface TagsTreeProps extends TagsTreeContainerProps {
  tags: Tag[]
  setFilter: (filter: string) => void
  isLoading?: boolean
}

export const TagsTree = ({ tags, setFilter, isLoading, defaultCheckedTags, setDefaultCheckedTags }: TagsTreeProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { Search } = Input
  const { createTreeStructure } = useCreateTreeStructure()

  const treeData = createTreeStructure({ tags })

  const onCheck: TreeProps['onCheck'] = (checkedKeys: { checked: Key[], halfChecked: Key[] }, info) => {
    setDefaultCheckedTags(checkedKeys.checked)
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
        expandedKeys={ ['root'] }
        onCheck={ onCheck }
        showIcon
        treeData={ treeData }
      />
    </>
  )
}
