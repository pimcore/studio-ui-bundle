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

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import {
  ReloadButton
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/components/reload-button/reload-button'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { type MenuProps } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const { unpublishContextMenuItem } = useUnpublish('data-object')
  const { renameContextMenuItem } = useRename('data-object')
  const { deleteContextMenuItem } = useDelete('data-object')
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)

  const items: DropdownMenuProps['items'] = [
    unpublishContextMenuItem(dataObject as DataObject),
    deleteContextMenuItem(dataObject as DataObject),
    renameContextMenuItem(dataObject as DataObject)
  ]

  const visibleItems = items.filter(item => (item !== null && 'hidden' in item) ? item?.hidden === false : false)

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === ContextMenuActionName.unpublish) {
      setIsOpen(true)
    }
  }

  return (
    <ButtonGroup>
      <ReloadButton />

      {visibleItems.length > 0 && (
        <Dropdown
          menu={ {
            items,
            onClick: handleMenuClick
          } }
          open={ isOpen }
        >
          <DropdownButton key={ 'dropdown-button' }>
            {t('toolbar.more')}
          </DropdownButton>
        </Dropdown>
      )}
    </ButtonGroup>
  )
}
