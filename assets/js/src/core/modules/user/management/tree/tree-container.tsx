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

import React, { useEffect, useCallback } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { TreeElement as Tree, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { type TreeDataNode } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { ToolbarTree } from '@Pimcore/modules/user/management/toolbar/toolbar-tree'
import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Content } from '@Pimcore/components/content/content'
import { useStyle } from '@Pimcore/modules/user/management/tree/tree-container.styles'
import { TreeAutocomplete } from '@Pimcore/modules/user/management/tree/tree-autocomplete'

interface ITreeContainerProps {
  loading?: boolean
}

const TreeContainer = ({ loading = true, ...props }: ITreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openUser, moveUserById, getUserTree, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder } = useUserHelper()
  const [isLoading, setIsLoading] = React.useState<boolean>(loading)
  const { styles } = useStyle()
  const classNames = [styles.treeContainer]

  const [treeData, setTreeData] = React.useState<TreeDataItem[]>([
    {
      title: t('user-management.tree.all'),
      key: '0',
      icon: <Icon name={ 'folder' } />,
      children: [],
      actions: [
        { key: 'add-folder', icon: 'folder-plus' },
        { key: 'add-user', icon: 'user-plus-01' }
      ]
    }
  ])

  const [expandedKeys, setExpandedKeys] = React.useState<string[]>(['0'])

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

  const findNodeByKey = (data: TreeDataNode[], key: any): TreeDataItem | undefined => {
    for (const node of data) {
      if (node.key === key) {
        return node
      }
      if (node.children !== undefined && node.children !== null) {
        const found = findNodeByKey(node.children, key)
        if (found !== undefined) {
          return found
        }
      }
    }
    return undefined
  }

  const findParentByKey = (data: TreeDataNode[], key: any, parent: TreeDataNode | null = null): TreeDataNode | null => {
    for (const node of data) {
      if (node.key === key) {
        return parent
      }
      if (node.children !== undefined && node.children !== null) {
        const found = findParentByKey(node.children, key, node)
        if (found !== null) {
          return found
        }
      }
    }
    return null
  }

  const createNodeByResponse = useCallback((items: any): TreeDataNode[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      selectable: item.type === 'user',
      allowDrop: item.type !== 'user',
      icon: item.type === 'user' ? <Icon name={ 'user-01' } /> : <Icon name={ 'folder' } />,
      actions: item.type === 'user'
        ? [
            { key: 'clone-user', icon: 'copy-03' },
            { key: 'remove-user', icon: 'delete-outlined' }
          ]
        : [
            { key: 'add-folder', icon: 'folder-plus' },
            { key: 'add-user', icon: 'user-plus-01' },
            { key: 'remove-folder', icon: 'delete-outlined' }
          ],
      children: [],
      isLeaf: item.children === false
    }))
  }, [treeData])

  const handleOnLoadData = async (node: TreeDataNode): Promise<void> => {
    await getUserTree({ parentId: node.key }).then(response => {
      updateTreeData(node.key, response.items)
    })
  }

  const modal = useFormModal()

  const reloadTree = (): void => {
    setIsLoading(true)

    getUserTree({ parentId: 0 }).then(response => {
      updateTreeData('0', response.items)
      setExpandedKeys(['0'])

      setIsLoading(false)
    }).catch(e => {
      console.error(e)
    })
  }
  useEffect((): void => {
    reloadTree()
  }, [loading])

  const handleAddUser = (key: string): void => {
    modal.input({
      title: t('user-management.add-user'),
      label: t('user-management.add-user.label'),
      onOk: async (value: string) => {
        const data = await addNewUser({ parentId: parseInt(key), name: value })
        if (data !== undefined) {
          updateTreeData(key, [data], true)
        }
      }
    })
  }
  const handleAddFolder = (key: string): void => {
    modal.input({
      title: t('user-management.add-folder'),
      label: t('user-management.add-folder.label'),
      onOk: async (value: string) => {
        const data = await addNewFolder({ parentId: parseInt(key), name: value })
        if (data !== undefined) {
          updateTreeData(key, [data], true)
        }
      }
    })
  }
  return (
    <ContentToolbarSidebarLayout
      renderToolbar={
        <ToolbarTree
          onAddFolder={ () => { handleAddFolder('0') } }
          onAddUser={ () => { handleAddUser('0') } }
          onReload={ reloadTree }
        />
      }
    >
      <Content className={ classNames.join(', ') }>
        <TreeAutocomplete />

        <Tree
          defaultExpandedKeys={ expandedKeys }
          draggable
          onActionsClick={ (key: string, action: string) => {
            switch (action) {
              case 'add-folder':
                handleAddFolder(key)

                break
              case 'add-user':
                handleAddUser(key)

                break
              case 'clone-user':
                modal.input({
                  title: t('user-management.clone-user'),
                  label: t('user-management.clone-user.label'),
                  onOk: async (value: string) => {
                    const parentId = (findParentByKey(treeData, key)?.key)?.toString()
                    const data = await cloneUser({ id: parseInt(key), name: value })

                    if (data !== undefined) {
                      updateTreeData(parentId, [data], true)
                    }
                  }
                })

                break
              case 'remove-user':
                modal.confirm({
                  title: t('user-management.remove-user'),
                  content: t('user-management.remove-user.text'),
                  onOk: async () => {
                    await removeUser({ id: key })

                    const parent = findParentByKey(treeData, key)
                    if (parent?.children !== undefined) {
                      const updatedTreeData = parent.children.filter((child: TreeDataNode) => child.key !== key)
                      setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
                        parent.children = updatedTreeData
                        return [...data]
                      })
                    }
                  }
                })

                break
              case 'remove-folder':
                modal.confirm({
                  title: t('user-management.remove-folder'),
                  content: t('user-management.remove-folder.text'),
                  onOk: async () => {
                    await removeFolder({ id: key })

                    const parent = findParentByKey(treeData, key)
                    if (parent?.children !== undefined) {
                      const updatedTreeData = parent.children.filter((child: TreeDataNode) => child.key !== key)
                      setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
                        parent.children = updatedTreeData
                        return [...data]
                      })
                    }
                  }
                })

                break
            }
          } }
          onDragAndDrop={ async (params) => {
            await moveUserById({ id: params.dragNode.key, parentId: params.node.key })
            // todo reload tree
          } }
          onLoadData={ handleOnLoadData }
          onSelected={ (key) => {
            if (findNodeByKey(treeData, key)?.selectable === true) {
              openUser(key)
            }
          } }
          treeData={ treeData }
        />
      </Content>
      { isLoading
        ? (
          <div>todo</div>
          )
        : <></>}
    </ContentToolbarSidebarLayout>
  )
}

export { TreeContainer }
