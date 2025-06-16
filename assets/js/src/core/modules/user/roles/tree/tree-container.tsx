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
import { type TreeDataNode } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { ToolbarTree } from '@Pimcore/modules/user/management/toolbar/toolbar-tree'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { useStyle } from '@Pimcore/modules/user/management/tree/tree-container.styles'
import { findParentByKey, findNodeByKey } from '@Pimcore/modules/user/management/tree/tree-helper'
import { Icon } from '@Pimcore/components/icon/icon'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'

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
  const { openRole, addNewRole, addNewFolder, removeRole, cloneRole, removeFolder, moveRoleById } = useRoleHelper()
  const { styles } = useStyle()
  const classNames = [styles.treeContainer]

  const modal = useFormModal()

  const handleAddRole = (key: number): void => {
    modal.input({
      title: t('roles.add-role'),
      label: t('roles.add-role.label'),
      onOk: async (value: string) => {
        await addNewRole({ parentId: key, name: value })
        onReloadTree([key])
      }
    })
  }
  const handleAddFolder = (key: number): void => {
    modal.input({
      title: t('roles.add-folder'),
      label: t('roles.add-folder.label'),
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
          actions={ [
            {
              key: 'add-role',
              label: t('tree.actions.add-role'),
              icon: <Icon value='add-user'></Icon>,
              onClick: () => { handleAddRole(0) }
            },
            {
              key: 'add-folder',
              label: t('tree.actions.add-folder'),
              icon: <Icon value='folder-plus'></Icon>,
              onClick: () => { handleAddFolder(0) }
            }
          ] }
          onReload={ () => { onReloadTree([0]) } }
        />
      }
    >
      <Content
        className={ classNames.join(', ') }
      >
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
              case 'add-role':
                handleAddRole(key)

                break
              case 'clone-role':
                modal.input({
                  title: t('roles.clone-role'),
                  label: t('roles.clone-role.label'),
                  onOk: async (value: string) => {
                    const parentId = findParentByKey(treeData, key)?.key
                    const data = await cloneRole({ id: key, name: value })

                    if (data !== undefined) {
                      onReloadTree([parentId])
                    }
                  }
                })

                break
              case 'remove-role':
                modal.confirm({
                  title: t('roles.remove-role'),
                  content: t('roles.remove-role.text'),
                  onOk: async () => {
                    await removeRole({ id: Number(key) })
                    onReloadTree([findParentByKey(treeData, key)?.key])
                  }
                })

                break
              case 'remove-folder':
                modal.confirm({
                  title: t('roles.remove-folder'),
                  content: t('roles.remove-folder.text'),
                  onOk: async () => {
                    await removeFolder({ id: Number(key) })
                    onReloadTree([findParentByKey(treeData, key)?.key])
                  }
                })

                break
            }
          } }
          onDragAndDrop={ async (params) => {
            const data = await moveRoleById({ id: Number(params.dragNode.key), parentId: Number(params.node.key) })

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
              openRole(Number(key))
            }
          } }
          treeData={ treeData }
        />
      </Content>
    </ContentLayout>
  )
}

export { TreeContainer }
