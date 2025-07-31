/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { TreeContainer } from '@Pimcore/modules/user/roles/tree/tree-container'
import { Detail } from '@Pimcore/modules/user/roles/detail/detail'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import type { TreeDataNode } from 'antd'
import { findNodeByKey } from '@Pimcore/modules/user/management/tree/tree-helper'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'
import { Spin } from '@Pimcore/components/spin/spin'

const RoleContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { getRoleTree } = useRoleHelper()

  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])

  const treeParentItem = {
    title: t('roles.tree.all'),
    key: 0,
    icon: <Icon value={ 'folder' } />,
    children: [],
    actions: [
      { key: 'add-folder', icon: 'folder-plus' },
      { key: 'add-role', icon: 'add-user' }
    ]
  }
  const [treeData, setTreeData] = useState<TreeDataItem[]>([treeParentItem])

  const createNodeByResponse = (items: any): TreeDataNode[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      selectable: item.type === 'role',
      allowDrop: item.type !== 'role',
      allowDrag: item.type === 'role',
      icon: item.type === 'role' ? <Icon value={ 'user' } /> : <Icon value={ 'folder' } />,
      actions: item.type === 'role'
        ? [
            { key: 'clone-role', icon: 'copy' },
            { key: 'remove-role', icon: 'trash' }
          ]
        : [
            { key: 'add-folder', icon: 'folder-plus' },
            { key: 'add-role', icon: 'add-user' },
            { key: 'remove-folder', icon: 'trash' }
          ],
      children: [],
      isLeaf: item.children === false
    }))
  }

  const updateTreeData = (key, items): void => {
    setNodeLoading(key, false)

    setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
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
    await getRoleTree({ parentId: Number(node.key) }).then(response => {
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

    const { items } = await getRoleTree({ parentId: key })
    updateTreeData(key, items)
  }

  const sidebar = {
    id: 'role-tree',
    size: 20,
    minSize: 170,
    children: [
      <TreeContainer
        expandedKeys={ expandedKeys }
        key="role-tree"
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
    id: 'role-detail',
    size: 80,
    minSize: 600,
    children: [
      <Detail
        key="role-detail"
        onCloneRole={ async (data, parentId) => {
          setNodeLoading(parentId, true)
          await reloadTree(parentId)
        } }
        onRemoveRole={ async (id, parentId) => {
          setNodeLoading(parentId, true)
          await reloadTree(parentId)
        } }
      />
    ]
  }

  return (
    <SplitLayout
      leftItem={ sidebar }
      rightItem={ main }
      withDivider
      withToolbar
    />
  )
}

export { RoleContainer }
