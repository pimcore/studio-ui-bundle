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
import { type Document } from '@Pimcore/modules/document/document-api-slice.gen'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { type MenuProps } from 'antd'
import React, { type ReactElement, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReloadButton } from './components/reload-button/reload-button'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type DocumentEditorContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { useShareViaNotification } from '@Pimcore/modules/notifications/actions/share-via-notification/use-share-via-notification'
import { isNil } from 'lodash'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)

  const contextMenuProps: DocumentEditorContextMenuProps = {
    target: document as Document,
    onComplete: () => { setIsOpen(undefined) }
  }

  // Get context menu items from registry
  const items: DropdownMenuProps['items'] = useContextMenuSlot(contextMenuConfig.documentEditorToolbar.name, contextMenuProps)

  const { shareViaNotificationContextMenuItem, shareViaNotificationModal } = useShareViaNotification(
    isNil(document)
      ? undefined
      : { type: 'document', id: document.id, fullPath: document.fullPath ?? undefined }
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
    <ReloadButton key={ 'reload-button' } />
  )

  if (visibleItems.length > 0) {
    buttonGroupItems.push(
      <Dropdown
        key={ 'dropdown-button' }
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
