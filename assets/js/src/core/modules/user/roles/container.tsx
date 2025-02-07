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

import React, { useState } from 'react'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { TreeContainer } from '@Pimcore/modules/user/roles/tree/tree-container'
import { Detail } from '@Pimcore/modules/user/roles/detail/detail'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import type { TreeDataNode } from 'antd'
import { findNodeByKey, findParentByKey } from '@Pimcore/modules/user/management/tree/tree-helper'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'

const RoleContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { getRoleTree } = useRoleHelper()

  const treeParentItem = {
    title: t('roles.tree.all'),
    key: '0',
    icon: <Icon value={ 'folder' } />,
    children: [],
    actions: [
      { key: 'add-folder', icon: 'folder-plus' },
      { key: 'add-role', icon: 'add-user' }
    ]
  }
  const [treeData, setTreeData] = useState<TreeDataItem[]>([treeParentItem])
  const [treeIsLoading, setTreeIsLoading] = useState<boolean>(false)

  const createNodeByResponse = (items: any): TreeDataNode[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      selectable: item.type === 'role',
      allowDrop: item.type !== 'role',
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

  const updateTreeData = (key, items, add?): void => {
    setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
      const parentNode = findNodeByKey(data, key)
      if (parentNode !== undefined) {
        parentNode.children = parentNode.children ?? []

        if (add === true) {
          parentNode.isLeaf = false
          parentNode.children.push(...createNodeByResponse(items))
          parentNode.children.sort((a, b) => (typeof a.title === 'string' ? a.title : '').localeCompare(typeof b.title === 'string' ? b.title : ''))
        } else {
          parentNode.children = createNodeByResponse(items)
        }
      }
      return [...data]
    })
  }

  const handleOnLoadData = async (node: TreeDataNode): Promise<void> => {
    await getRoleTree({ parentId: Number(node.key) }).then(response => {
      updateTreeData(node.key, response.items)
    })
  }

  const reloadTree = async (): Promise<void> => {
    setTreeIsLoading(true)
    setTreeData([treeParentItem])

    const { items } = await getRoleTree({ parentId: 0 })
    updateTreeData('0', items)

    setTreeIsLoading(false)
  }

  const sidebar = {
    id: 'role-tree',
    size: 20,
    minSize: 170,
    children: [
      <TreeContainer
        isLoading={ treeIsLoading }
        key="role-tree"
        onLoadTreeData={ handleOnLoadData }
        onMoveItem={ (dragNode, dropKey) => {
          const parent = findParentByKey(treeData, dragNode.key)
          const newParent = findNodeByKey(treeData, dropKey)

          if (parent?.children !== undefined && (newParent !== undefined)) {
            parent.children = parent.children.filter(child => child.key !== dragNode.key)
            newParent.children = [...(newParent.children ?? []), dragNode]

            setTreeData([...treeData])
          }
        } }
        onReloadTree={ reloadTree }
        onRemoveItem={ (key) => {
          const parent = findParentByKey(treeData, key)
          if (parent?.children !== undefined) {
            const updatedTreeData = parent.children.filter((child: TreeDataNode) => child.key !== key)
            setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
              parent.children = updatedTreeData
              return [...data]
            })

            if (parent?.children.length === 0) {
              parent.isLeaf = true
            }
          }
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
        onCloneRole={ async (data) => {
          await reloadTree()
        } }
        onRemoveRole={ async (id) => {
          await reloadTree()
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
