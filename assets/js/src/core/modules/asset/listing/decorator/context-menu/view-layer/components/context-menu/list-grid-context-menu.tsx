/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { type MenuProps } from 'antd'
import React, { useState } from 'react'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'

export const ListGridContextMenu = (props: ListGridContextMenuProps): React.JSX.Element => {
  const { row } = props
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)

  const context = {
    row,
    onComplete: () => { setIsOpen(undefined) }
  }

  const items = useContextMenuSlot(contextMenuConfig.assetListGrid.name, context)

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === ContextMenuActionName.locateInTree) {
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
