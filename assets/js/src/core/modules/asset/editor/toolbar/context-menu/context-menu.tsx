/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import React, { type ReactElement, useContext } from 'react'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { ReloadPopconfirm } from '@Pimcore/components/reload-popconfirm/reload-popconfirm'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type AssetEditorContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { useShareViaNotification } from '@Pimcore/modules/notifications/actions/share-via-notification/use-share-via-notification'
import { isNil } from 'lodash'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { asset } = useAssetDraft(id)
  const { refreshElement } = useElementRefresh('asset')

  const contextMenuProps: AssetEditorContextMenuProps = {
    target: asset as Asset
  }

  const items: DropdownMenuProps['items'] = useContextMenuSlot(contextMenuConfig.assetEditorToolbar.name, contextMenuProps)

  const { shareViaNotificationContextMenuItem, shareViaNotificationModal } = useShareViaNotification(
    isNil(asset)
      ? undefined
      : { type: 'asset', id: asset.id, fullPath: asset.fullPath ?? undefined }
  )

  const allItems = [...items, shareViaNotificationContextMenuItem]

  const visibleItems = allItems.filter(item => (item !== null && 'hidden' in item) ? item?.hidden === false : false)

  const buttonGroupItems: ReactElement[] = []

  buttonGroupItems.push(
    <ReloadPopconfirm
      hasDataChanged={ hasDataChanged }
      key="reload-button"
      onReload={ onReload }
      title={ t('toolbar.reload.confirmation') }
    >
      <IconButton
        icon={ { value: 'refresh' } }
      >
        {t('toolbar.reload')}
      </IconButton>
    </ReloadPopconfirm>
  )

  if (visibleItems.length > 0) {
    buttonGroupItems.push(
      <Dropdown
        key="more-button"
        menu={ { items: allItems } }
      >
        <DropdownButton key="dropdown-button">
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

  function hasDataChanged (): boolean {
    return Object.keys(asset?.changes ?? {}).length > 0
  }

  function onReload (): void {
    refreshElement(id, true)
  }
}
