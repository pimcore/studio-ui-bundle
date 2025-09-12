/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { TreeContainer } from '@Pimcore/modules/user/management/tree/tree-container'
import { ManagementDetail } from '@Pimcore/modules/user/management/detail/management-detail'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import type { TreeDataNode } from 'antd'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
import { findNodeByKey } from '@Pimcore/modules/user/management/tree/tree-helper'
import { Spin } from '@Pimcore/components/spin/spin'
import { createTreeNodeTestId } from '@Pimcore/utils/test-id-generator'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'

const ManagementContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { getUserTree } = useUserManagementHelper()

  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])

  const treeParentItem = {
    title: t('user-management.tree.all'),
    key: 0,
    icon: <Icon value={ 'folder' } />,
    'data-testid': createTreeNodeTestId(0, 'folder'),
    children: [],
    actions: [
      { key: 'add-folder', icon: 'folder-plus' },
      { key: 'add-user', icon: 'add-user' }
    ]
  }
  const [treeData, setTreeData] = React.useState<TreeDataItem[]>([treeParentItem])

  const createNodeByResponse = (items: any): TreeDataItem[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      selectable: item.type === 'user',
      allowDrop: item.type !== 'user',
      allowDrag: item.type === 'user',
      icon: item.type === 'user' ? <Icon value={ 'user' } /> : <Icon value={ 'folder' } />,
      'data-testid': createTreeNodeTestId(item.id as string | number, item.type as string),
      actions: item.type === 'user'
        ? [
            { key: 'clone-user', icon: 'copy' },
            { key: 'remove-user', icon: 'trash' }
          ]
        : [
            { key: 'add-folder', icon: 'folder-plus' },
            { key: 'add-user', icon: 'add-user' },
            { key: 'remove-folder', icon: 'trash' }
          ],
      children: [],
      isLeaf: item.children === false
    }))
  }

  const updateTreeData = (key, items): void => {
    setNodeLoading(key, false)

    setTreeData((data: TreeDataItem[]): TreeDataItem[] => {
      const parentNode = findNodeByKey(data, key)
      if (parentNode !== undefined) {
        parentNode.children = parentNode.children ?? []

        if (items.length === 0) {
          parentNode.isLeaf = true
          setExpandedKeys(expandedKeys.filter((k) => k !== key))
        } else {
          parentNode.isLeaf = false
        }

        const newChildren = createNodeByResponse(items)

        const newKeys = new Set(newChildren.map((child) => child.key))
        parentNode.children = parentNode.children.filter((child) => newKeys.has(child.key))

        const existingKeys = new Set(parentNode.children.map((child) => child.key))
        parentNode.children = [
          ...parentNode.children,
          ...newChildren.filter((child) => !existingKeys.has(child.key))
        ]
      }

      return [...data]
    })
  }

  const handleOnLoadData = async (node: TreeDataNode): Promise<void> => {
    await getUserTree({ parentId: Number(node.key) }).then(response => {
      updateTreeData(node.key, response.items)
    })
  }

  const setNodeLoading = (key: any, isLoading: boolean): void => {
    const node = findNodeByKey(treeData, key)
    if (node !== undefined) {
      node.switcherIcon = isLoading
        ? <Spin type="classic" />
        : undefined
    }

    setTreeData([...treeData])
  }

  const reloadTree = async (key: any): Promise<void> => {
    if (key === undefined) {
      key = 0
    }

    const { items } = await getUserTree({ parentId: key })
    updateTreeData(key, items)
  }

  const sidebar = {
    id: 'user-tree',
    minSize: 170,
    children: [
      <TreeContainer
        expandedKeys={ expandedKeys }
        key="user-tree"
        onLoadTreeData={ handleOnLoadData }
        onReloadTree={ async (keys) => {
          for (const key of keys) {
            setNodeLoading(key, true)
            await reloadTree(key)
          }
        } }
        onSetExpandedKeys={ (keys) => {
          setExpandedKeys(keys)
        } }
        onUpdateTreeData={ updateTreeData }
        treeData={ treeData }
      />
    ]
  }

  const main = {
    id: 'user-detail',
    minSize: 600,
    children: [
      <ManagementDetail
        key="user-detail"
        onCloneUser={ async (data, parentId) => {
          setNodeLoading(parentId, true)
          await reloadTree(parentId)
        } }
        onRemoveItem={ async (id, parentId) => {
          setNodeLoading(parentId, true)
          await reloadTree(parentId)
        } }
      />
    ]
  }

  return (
    <ConfigLayout
      leftItem={ sidebar }
      rightItem={ main }
    />
  )
}

export { ManagementContainer }
