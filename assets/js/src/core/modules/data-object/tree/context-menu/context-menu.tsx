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
import { useTranslation } from 'react-i18next'
import { defaultProps, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { useAddObject } from '../../actions/add-object/use-add-object'

export interface DataObjectTreeContextMenuProps {
  node: TreeNodeProps
  children: React.ReactNode
}

export const DataObjectTreeContextMenu = (props: DataObjectTreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const node = props.node ?? defaultProps
  const { addFolderTreeContextMenuItem } = useAddFolder('data-object')
  const { renameTreeContextMenuItem } = useRename('data-object', getElementActionCacheKey('data-object', 'rename', parseInt(node.id)))
  const { deleteTreeContextMenuItem } = useDelete('data-object', getElementActionCacheKey('data-object', 'delete', parseInt(node.id)))
  const { refreshTreeContextMenuItem } = useRefreshTree('data-object')
  const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteTreeContextMenuItem, pasteCutContextMenuItem } = useCopyPaste('data-object')
  const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = useLock('data-object')
  const { addObjectTreeContextMenuItem } = useAddObject()

  const items: DropdownMenuProps['items'] = [
    addObjectTreeContextMenuItem(node),
    addFolderTreeContextMenuItem(node),
    renameTreeContextMenuItem(node),
    copyTreeContextMenuItem(node),
    pasteTreeContextMenuItem(node),
    cutTreeContextMenuItem(node),
    pasteCutContextMenuItem(parseInt(node.id)),
    deleteTreeContextMenuItem(node),

    {
      label: t('element.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon value={ 'more' } />,
      hidden: isLockMenuHidden(node),
      children: [
        {
          label: t('element.lock'),
          key: 'advanced-lock',
          icon: <Icon value={ 'lock' } />,
          hidden: isLockMenuHidden(node),
          children: [
            lockTreeContextMenuItem(node),
            lockAndPropagateTreeContextMenuItem(node),
            unlockTreeContextMenuItem(node),
            unlockAndPropagateTreeContextMenuItem(node)
          ]
        }
      ]
    },
    refreshTreeContextMenuItem(node)
  ]

  return (
    <>
      <Dropdown
        menu={ { items } }
        trigger={ ['contextMenu'] }
      >
        {props.children}
      </Dropdown>
    </>
  )
}
