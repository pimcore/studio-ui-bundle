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
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import {
  useTagGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
export const TagsTreeFiltersContainer = ({ checkedKeys, setCheckedKeys }: { checkedKeys: any, setCheckedKeys: any }): React.JSX.Element => {
  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999
  })

  if (tagsLoading) {
    return <Content loading />
  }

  if (tags?.items === undefined) {
    return <div>Failed to load tags</div>
  }

  const treeData = createTreeStructure({ tags: tags.items, loadingNodes: new Set<string>() })

  const handleCheck = (currentCheckedKeys: { checked: Key[], halfChecked: Key[] }): void => {
    const checkedKeysList = currentCheckedKeys.checked

    // Set state for visualization in the Tree
    setCheckedKeys(checkedKeysList)
  }

  return (
    <Flex
      gap={ 'small' }
      vertical
    >
      <TreeElement
        checkStrictly
        checkedKeys={ { checked: checkedKeys, halfChecked: [] } }
        onCheck={ handleCheck }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}
