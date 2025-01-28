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
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { Title } from '@Pimcore/components/title/title'
import { Box } from '@Pimcore/components/box/box'

export interface TagConfigurationContainerProps {
  isLoading: boolean
  tags: Tag[]
}

export interface TreeAction {
  key: string
  icon: string
}

const TagConfigurationContainer = ({ tags, isLoading }: TagConfigurationContainerProps): React.JSX.Element => {
  const tagActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' },
          { key: 'rename-tag', icon: 'edit' },
          { key: 'delete-tag', icon: 'trash' }

        ]

  const onActionsClick = (key: string, type: string): void => {
    switch (type) {
      case 'add-tag':
        console.log('add-tag clicked:', key)
        break
      case 'rename-tag':
        console.log('rename-tag clicked:', key)
        break
      case 'delete-tag':
        console.log('delete-tag clicked:', key)
    }
  }

  const treeData = createTreeStructure({ tags, loadingNodes: new Set(), actions: tagActions })

  return (
    <Box
      margin={ 'small' }
    >
      <Title>Tag Configuration</Title>
      <TreeElement
        checkStrictly
        defaultExpandedKeys={ ['root'] }
        onActionsClick={ onActionsClick }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Box>
  )
}

export { TagConfigurationContainer }
