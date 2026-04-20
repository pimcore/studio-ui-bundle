/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { Icon } from '@Pimcore/components/icon/icon'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { api, useClassSelectOptionGetTreeQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import type { SelectOptionTreeItem, SelectOptionTreeFolder } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import React, { useCallback, useEffect, useState } from 'react'
import { SelectOptionEditorProvider } from './context/select-option-editor-provider'
import { SelectOptionDetailContainer } from './components/detail/select-option-detail-container'
import { TreeContainer } from './components/tree/tree-container'

type TreeApiItem = SelectOptionTreeItem | SelectOptionTreeFolder

const isFolder = (node: TreeApiItem): node is SelectOptionTreeFolder => {
  return 'children' in node && Array.isArray(node.children)
}

const createNodesByResponse = (items: TreeApiItem[]): TreeDataItem[] => {
  return [...items]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => {
      if (isFolder(item)) {
        return {
          title: item.name,
          key: item.id,
          selectable: false,
          icon: <Icon
            type={ item.icon.type }
            value={ (item.icon.value !== undefined && item.icon.value !== '') ? item.icon.value : 'folder' }
                />,
          isLeaf: false,
          children: [...item.children]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((child) => ({
              title: child.name,
              key: child.id,
              icon: <Icon
                value={ 'select-type' }
                    />,
              isLeaf: true,
              actions: [
                { key: 'delete', icon: 'trash' }
              ]
            }))
        }
      }

      return {
        title: item.name,
        key: item.id,
        icon: <Icon
          value={ 'select-type' }
              />,
        isLeaf: true,
        actions: [
          { key: 'delete', icon: 'trash' }
        ]
      }
    })
}

const SelectOptionWidgetInner = (): React.JSX.Element => {
  const { data, isFetching } = useClassSelectOptionGetTreeQuery({ withGroup: true })
  const dispatch = useAppDispatch()
  const [treeData, setTreeData] = useState<TreeDataItem[]>([])
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (data?.items !== undefined) {
      setTreeData(createNodesByResponse(data.items))
    }
  }, [data])

  const handleReloadTree = useCallback((): void => {
    dispatch(api.util.invalidateTags(invalidatingTags.SELECT_OPTION_COLLECTION()))
  }, [dispatch])

  const sidebar = {
    id: 'select-option-editor.sidebar',
    minSize: 170,
    children: [
      <TreeContainer
        expandedKeys={ expandedKeys }
        isFetching={ isFetching }
        key="select-option-editor.sidebar"
        onReloadTree={ handleReloadTree }
        onSetExpandedKeys={ setExpandedKeys }
        treeData={ treeData }
      />
    ]
  }

  const main = {
    id: 'select-option-editor.main',
    minSize: 600,
    children: [
      <SelectOptionDetailContainer key="select-option-editor.main.detailTab" />
    ]
  }

  return (
    <ConfigLayout
      leftItem={ sidebar }
      rightItem={ main }
    />
  )
}

export const SelectOptionWidget = (): React.JSX.Element => {
  return (
    <SelectOptionEditorProvider>
      <SelectOptionWidgetInner />
    </SelectOptionEditorProvider>
  )
}
