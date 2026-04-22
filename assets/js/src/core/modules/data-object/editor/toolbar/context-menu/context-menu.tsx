/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import {
  ReloadButton
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/components/reload-button/reload-button'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type DataObjectEditorContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useShareViaNotification } from '@Pimcore/modules/notifications/actions/share-via-notification/use-share-via-notification'
import { isNil } from 'lodash'
import { type MenuProps } from 'antd'
import React, { type ReactElement, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)

  const contextMenuProps: DataObjectEditorContextMenuProps = {
    target: dataObject as DataObject,
    onComplete: () => { setIsOpen(undefined) }
  }

  const items: DropdownMenuProps['items'] = useContextMenuSlot(contextMenuConfig.dataObjectEditorToolbar.name, contextMenuProps)

  const { shareViaNotificationContextMenuItem, shareViaNotificationModal } = useShareViaNotification(
    isNil(dataObject)
      ? undefined
      : { type: 'object', id: dataObject.id, fullPath: dataObject.fullPath ?? undefined }
  )

  const allItems = [...items, shareViaNotificationContextMenuItem]

  const visibleItems = allItems.filter(item => (item !== null && 'hidden' in item) ? item?.hidden === false : false)

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === ContextMenuActionName.unpublish) {
      setIsOpen(true)
    }
  }

  const buttonGroupItems: ReactElement[] = []

  buttonGroupItems.push(
    <ReloadButton key="reload-button" />
  )

  if (visibleItems.length > 0) {
    buttonGroupItems.push(
      <Dropdown
        key="dropdown-button"
        menu={ {
          items: allItems,
          onClick: handleMenuClick
        } }
        open={ isOpen }
      >
        <DropdownButton>
          {t('toolbar.more')}
        </DropdownButton>
      </Dropdown>
    )
  }

  return (
    <>
      <ButtonGroup
        items={ buttonGroupItems }
        noSpacing
      />
      {shareViaNotificationModal}
    </>
  )
}
