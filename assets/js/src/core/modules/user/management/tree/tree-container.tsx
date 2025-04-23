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
import { TreeElement as Tree, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { type TreeDataNode } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { ToolbarTree } from '@Pimcore/modules/user/management/toolbar/toolbar-tree'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { useStyle } from '@Pimcore/modules/user/management/tree/tree-container.styles'
import { TreeAutocomplete } from '@Pimcore/modules/user/management/tree/tree-autocomplete'
import { findParentByKey, findNodeByKey } from '@Pimcore/modules/user/management/tree/tree-helper'

interface ITreeContainerProps {
  treeData: TreeDataItem[]
  isLoading: boolean
  onLoadTreeData: (node: TreeDataNode) => Promise<void>
  onUpdateTreeData: (key: any, items: any, add?: boolean) => void
  onReloadTree: () => void
  onRemoveItem: (key: any) => void
  onMoveItem: (dragNode: any, dropKey: any) => void
}
const TreeContainer = ({ treeData, isLoading, onUpdateTreeData, onLoadTreeData, onReloadTree, onRemoveItem, onMoveItem, ...props }: ITreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openUser, moveUserById, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder } = useUserHelper()
  const { styles } = useStyle()
  const classNames = [styles.treeContainer]

  const [expandedKeys, setExpandedKeys] = React.useState<any[]>(['0'])
  const modal = useFormModal()

  const handleAddUser = (key: string): void => {
    modal.input({
      title: t('user-management.add-user'),
      label: t('user-management.add-user.label'),
      onOk: async (value: string) => {
        const data = await addNewUser({ parentId: parseInt(key), name: value })
        if (data !== undefined) {
          onUpdateTreeData(key, [data], true)
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
          onUpdateTreeData(key, [data], true)
        }
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <ToolbarTree
          onAddFolder={ () => { handleAddFolder('0') } }
          onAddItem={ () => { handleAddUser('0') } }
          onReload={ onReloadTree }
        />
      }
    >
      <Content
        className={ classNames.join(', ') }
        loading={ isLoading }
      >
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
                      onUpdateTreeData(parentId, [data], true)
                    }
                  }
                })

                break
              case 'remove-user':
                modal.confirm({
                  title: t('user-management.remove-user'),
                  content: t('user-management.remove-user.text'),
                  onOk: async () => {
                    await removeUser({ id: Number(key) })

                    onRemoveItem(key)
                  }
                })

                break
              case 'remove-folder':
                modal.confirm({
                  title: t('user-management.remove-folder'),
                  content: t('user-management.remove-folder.text'),
                  onOk: async () => {
                    await removeFolder({ id: Number(key) })

                    onRemoveItem(key)
                  }
                })

                break
            }
          } }
          onDragAndDrop={ async (params) => {
            const data = await moveUserById({ id: Number(params.dragNode.key), parentId: Number(params.node.key) })

            if (data !== undefined) {
              onMoveItem(params.dragNode, params.node.key)
            }
          } }
          onExpand={ (keys) => {
            setExpandedKeys(keys)
          } }
          onLoadData={ onLoadTreeData }
          onSelected={ (key) => {
            if (findNodeByKey(treeData, key)?.selectable === true) {
              openUser(Number(key))
            }
          } }
          treeData={ treeData }
        />
      </Content>
    </ContentLayout>
  )
}

export { TreeContainer }
