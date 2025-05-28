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
  expandedKeys: any[]
  onLoadTreeData: (node: TreeDataNode) => Promise<void>
  onReloadTree: (keys: any[]) => void
  onSetExpandedKeys: (keys: any[]) => void
  onUpdateTreeData: (key: any, items: any, add?: boolean) => void
}
const TreeContainer = ({ expandedKeys, treeData, onLoadTreeData, onReloadTree, onSetExpandedKeys, onUpdateTreeData, ...props }: ITreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openUser, moveUserById, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder } = useUserHelper()
  const { styles } = useStyle()
  const classNames = [styles.treeContainer]

  const modal = useFormModal()

  const handleAddUser = (key: number): void => {
    modal.input({
      title: t('user-management.add-user'),
      label: t('user-management.add-user.label'),
      onOk: async (value: string) => {
        await addNewUser({ parentId: key, name: value })
        onReloadTree([key])
      }
    })
  }
  const handleAddFolder = (key: number): void => {
    modal.input({
      title: t('user-management.add-folder'),
      label: t('user-management.add-folder.label'),
      onOk: async (value: string) => {
        await addNewFolder({ parentId: key, name: value })
        onReloadTree([key])
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <ToolbarTree
          onAddFolder={ () => { handleAddFolder(0) } }
          onAddItem={ () => { handleAddUser(0) } }
          onReload={ () => { onReloadTree([0]) } }
        />
      }
    >
      <Content
        className={ classNames.join(', ') }
      >
        <TreeAutocomplete />

        <Tree
          defaultExpandedKeys={ expandedKeys }
          draggable
          expandedKeys={ expandedKeys }
          onActionsClick={ (key: string | number, action: string) => {
            if (typeof key === 'string') {
              key = parseInt(key)
            }

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
                    const parentId = findParentByKey(treeData, key)?.key
                    const data = await cloneUser({ id: key, name: value })

                    if (data !== undefined) {
                      onReloadTree([parentId])
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
                    onReloadTree([findParentByKey(treeData, key)?.key])
                  }
                })

                break
              case 'remove-folder':
                modal.confirm({
                  title: t('user-management.remove-folder'),
                  content: t('user-management.remove-folder.text'),
                  onOk: async () => {
                    await removeFolder({ id: Number(key) })
                    onReloadTree([findParentByKey(treeData, key)?.key])
                  }
                })

                break
            }
          } }
          onDragAndDrop={ async (params) => {
            const data = await moveUserById({ id: Number(params.dragNode.key), parentId: Number(params.node.key) })

            if (data !== undefined) {
              onReloadTree([findParentByKey(treeData, params.dragNode.key)?.key, params.node.key])
            }
          } }
          onExpand={ (keys) => {
            onSetExpandedKeys(keys)
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
