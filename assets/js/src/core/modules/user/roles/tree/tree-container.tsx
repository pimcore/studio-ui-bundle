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
  isLoading: boolean
  onLoadTreeData: (node: TreeDataNode) => Promise<void>
  onUpdateTreeData: (key: any, items: any, add?: boolean) => void
  onReloadTree: () => void
  onRemoveItem: (key: any) => void
  onMoveItem: (dragNode: any, dropKey: any) => void
}
const TreeContainer = ({ treeData, isLoading, onUpdateTreeData, onLoadTreeData, onReloadTree, onRemoveItem, onMoveItem, ...props }: ITreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openRole, addNewRole, addNewFolder, removeRole, cloneRole, removeFolder, moveRoleById } = useRoleHelper()
  const { styles } = useStyle()
  const classNames = [styles.treeContainer]

  const [expandedKeys, setExpandedKeys] = React.useState<any[]>(['0'])
  const modal = useFormModal()

  const handleAddRole = (key: string): void => {
    modal.input({
      title: t('roles.add-role'),
      label: t('roles.add-role.label'),
      onOk: async (value: string) => {
        const data = await addNewRole({ parentId: parseInt(key), name: value })
        if (data !== undefined) {
          onUpdateTreeData(key, [data], true)
        }
      }
    })
  }
  const handleAddFolder = (key: string): void => {
    modal.input({
      title: t('roles.add-folder'),
      label: t('roles.add-folder.label'),
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
          actions={ [
            {
              key: 'add-role',
              label: t('tree.actions.add-role'),
              icon: <Icon value='add-user'></Icon>,
              onClick: () => { handleAddRole('0') }
            },
            {
              key: 'add-folder',
              label: t('tree.actions.add-folder'),
              icon: <Icon value='folder-plus'></Icon>,
              onClick: () => { handleAddFolder('0') }
            }
          ] }
          onReload={ onReloadTree }
        />
      }
    >
      <Content
        className={ classNames.join(', ') }
        loading={ isLoading }
      >
        <Tree
          defaultExpandedKeys={ expandedKeys }
          draggable
          onActionsClick={ (key: string, action: string) => {
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
                    const parentId = (findParentByKey(treeData, key)?.key)?.toString()
                    const data = await cloneRole({ id: parseInt(key), name: value })

                    if (data !== undefined) {
                      onUpdateTreeData(parentId, [data], true)
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

                    onRemoveItem(key)
                  }
                })

                break
              case 'remove-folder':
                modal.confirm({
                  title: t('roles.remove-folder'),
                  content: t('roles.remove-folder.text'),
                  onOk: async () => {
                    await removeFolder({ id: Number(key) })

                    onRemoveItem(key)
                  }
                })

                break
            }
          } }
          onDragAndDrop={ async (params) => {
            const data = await moveRoleById({ id: Number(params.dragNode.key), parentId: Number(params.node.key) })

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
