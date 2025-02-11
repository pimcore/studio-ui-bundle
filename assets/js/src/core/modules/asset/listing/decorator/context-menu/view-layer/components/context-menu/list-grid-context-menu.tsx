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

import { type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import React from 'react'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useOpen } from '@Pimcore/modules/element/actions/open/open'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'

export const ListGridContextMenu = (props: ListGridContextMenuProps): React.JSX.Element => {
  const { row } = props
  const { openGridContextMenuItem } = useOpen('asset')
  const { renameGridContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', Number(row.id)))
  const { deleteGridContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', Number(row.id)))
  const { downloadGridContextMenuItem } = useDownload()

  const items = [
    openGridContextMenuItem(row),
    renameGridContextMenuItem(row),
    deleteGridContextMenuItem(row),
    downloadGridContextMenuItem(row)
  ].filter(Boolean) as DropdownMenuProps['items']

  return (
    <Dropdown
      key={ row.id }
      menu={ { items } }
      trigger={ ['contextMenu'] }
    >
      {props.children}
    </Dropdown>
  )
}
