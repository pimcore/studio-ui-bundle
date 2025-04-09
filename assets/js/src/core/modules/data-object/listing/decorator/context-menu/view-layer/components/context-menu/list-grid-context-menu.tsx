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

import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { useOpen } from '@Pimcore/modules/element/actions/open/open'
import { type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { type MenuProps } from 'antd'
import React, { useState } from 'react'

export const ListGridContextMenu = (props: ListGridContextMenuProps): React.JSX.Element => {
  const { row } = props
  const { openGridContextMenuItem } = useOpen('data-object')
  const { deleteGridContextMenuItem } = useDelete('data-object')
  const { locateInTreeGridContextMenuItem } = useLocateInTree('data-object')
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)

  const items = [
    openGridContextMenuItem(row),
    locateInTreeGridContextMenuItem(row, () => { setIsOpen(false) }),
    deleteGridContextMenuItem(row) // () => { setIsOpen(false) }
  ].filter(Boolean) as DropdownMenuProps['items']

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'delete' || e.key === 'locate-in-tree') {
      setIsOpen(true)
    }
  }

  return (
    <Dropdown
      key={ row.id }
      menu={ {
        items,
        onClick: handleMenuClick
      } }
      open={ isOpen }
      trigger={ ['contextMenu'] }
    >
      {props.children}
    </Dropdown>
  )
}
