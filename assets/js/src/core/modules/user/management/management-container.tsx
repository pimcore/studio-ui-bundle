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

import React, { useCallback } from 'react'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { TreeContainer } from '@Pimcore/modules/user/management/tree/tree-container'
import { ManagementDetail } from '@Pimcore/modules/user/management/detail/management-detail'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import type { TreeDataNode } from 'antd'
import { findNodeByKey, findParentByKey } from '@Pimcore/modules/user/management/tree/tree-helper'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'

const ManagementContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { getUserTree } = useUserHelper()

  const treeParentItem = {
    title: t('user-management.tree.all'),
    key: '0',
    icon: <Icon value={ 'folder' } />,
    children: [],
    actions: [
      { key: 'add-folder', icon: 'folder-plus' },
      { key: 'add-user', icon: 'add-user' }
    ]
  }
  const [treeData, setTreeData] = React.useState<TreeDataItem[]>([treeParentItem])
  const [treeIsLoading, setTreeIsLoading] = React.useState<boolean>(false)

  const createNodeByResponse = useCallback((items: any): TreeDataNode[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      selectable: item.type === 'user',
      allowDrop: item.type !== 'user',
      icon: item.type === 'user' ? <Icon value={ 'user' } /> : <Icon value={ 'folder' } />,
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
  }, [treeData])

  const updateTreeData = (key, items, add?): void => {
    setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
      const parentNode = findNodeByKey(data, key)
      if (parentNode !== undefined) {
        parentNode.children = parentNode.children ?? []

        if (add === true) {
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
    await getUserTree({ parentId: Number(node.key) }).then(response => {
      updateTreeData(node.key, response.items)
    })
  }

  const reloadTree = async (): Promise<void> => {
    setTreeIsLoading(true)

    const { items } = await getUserTree({ parentId: 0 })
    updateTreeData('0', items)
    setTreeIsLoading(false)
  }

  const sidebar = {
    id: 'user-tree',
    size: 20,
    minSize: 170,
    children: [
      <TreeContainer
        isLoading={ treeIsLoading }
        key="user-tree"
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
        onReloadTree={ async () => {
          await reloadTree()
        } }
        onRemoveItem={ (key) => {
          const parent = findParentByKey(treeData, key)
          if (parent?.children !== undefined) {
            const updatedTreeData = parent.children.filter((child: TreeDataNode) => child.key !== key)
            setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
              parent.children = updatedTreeData
              return [...data]
            })
          }
        } }
        onUpdateTreeData={ updateTreeData }
        treeData={ treeData }
      />
    ]
  }

  const main = {
    id: 'user-detail',
    size: 80,
    minSize: 600,
    children: [
      <ManagementDetail
        key="user-detail"
        onCloneUser={ async () => {
          await reloadTree()
        } }
        onRemoveItem={ async () => {
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

export { ManagementContainer }
