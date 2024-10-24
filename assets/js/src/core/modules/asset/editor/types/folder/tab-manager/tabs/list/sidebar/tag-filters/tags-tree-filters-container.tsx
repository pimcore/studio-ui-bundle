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

import { useTagGetCollectionQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { Tree } from 'antd'
import React, { type Key } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'

export const TagsTreeFiltersContainer = ({ addOrUpdateFieldFilter, checkedKeys, setCheckedKeys }: { addOrUpdateFieldFilter: (value: any) => void, checkedKeys: any, setCheckedKeys: any }): React.JSX.Element => {
  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999
  })

  const { createTreeStructure } = useCreateTreeStructure()

  if (tagsLoading) {
    return <Content loading />
  }

  if (tags?.items === undefined) {
    return <div>Failed to load tags</div>
  }

  const treeData = createTreeStructure({ tags: tags.items })

  const handleCheck = (checkedKeys: { checked: Key[], halfChecked: Key[] }): void => {
    const checkedKeysList = checkedKeys.checked
    const formattedValue = checkedKeysList.map(Number)

    setCheckedKeys(checkedKeysList)
    addOrUpdateFieldFilter(formattedValue)
  }

  return (
    <>
      <Flex
        gap={ 'small' }
        vertical
      >
        <Tree
          checkStrictly
          checkable
          checkedKeys={ { checked: checkedKeys, halfChecked: [] } }
          defaultExpandedKeys={ ['root'] }
          onCheck={ handleCheck }
          showIcon
          treeData={ treeData }
        />
      </Flex>
    </>
  )
}
