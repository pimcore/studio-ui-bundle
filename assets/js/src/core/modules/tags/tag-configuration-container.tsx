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

import React, { useEffect, useState } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import type {
  Tag
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { Title } from '@Pimcore/components/title/title'

export interface TagConfigurationContainerProps {
  isLoading: boolean
  tags: Tag[]
}
const TagConfigurationContainer = ({ tags, isLoading }: TagConfigurationContainerProps): React.JSX.Element => {
  const [defaultCheckedTags, setDefaultCheckedTags] = useState<React.Key[]>(
    tags?.map(tag => tag.id.toString())
  )

  console.log('----> isLoading', isLoading)

  useEffect(() => {
    setDefaultCheckedTags(tags.map(tag => tag.id.toString()))
  }, [tags])

  if (tags === undefined) {
    return <div>Failed to load tags</div>
  }

  const treeData = createTreeStructure({ tags, loadingNodes: new Set() })

  return (
    <Flex
      gap="small"
      vertical
    >
      <Title>Tag Configuration</Title>
      <TreeElement
        checkStrictly
        checkedKeys={ { checked: defaultCheckedTags, halfChecked: [] } }
        defaultExpandedKeys={ ['root'] }
        onCheck={ () => { console.log('checked') } }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}

export { TagConfigurationContainer }
