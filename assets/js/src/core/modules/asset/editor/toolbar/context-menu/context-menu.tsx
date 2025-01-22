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

import { Popconfirm } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import ButtonGroup from 'antd/es/button/button-group'
import React, { useContext, useState } from 'react'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { useClearThumbnails } from '@Pimcore/modules/asset/actions/clear-thumbnails/use-clear-thumbnails'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { getContextMenuCacheKey } from '@Pimcore/modules/element/element-helper'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { asset } = useAssetDraft(id)
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)
  const { renameContextMenuItem } = useRename('asset', getContextMenuCacheKey('asset', 'delete', asset!.id))
  const { deleteContextMenuItem } = useDelete('asset', getContextMenuCacheKey('asset', 'delete', asset!.id))
  const { downloadContextMenuItem } = useDownload()
  const { createZipDownloadContextMenuItem } = useZipDownload({ type: 'folder' })
  const { refreshElement } = useElementRefresh('asset')
  const {
    clearImageThumbnailContextMenuItem,
    clearVideoThumbnailContextMenuItem,
    clearPdfThumbnailContextMenuItem
  } = useClearThumbnails()

  const items: DropdownMenuProps['items'] = [
    renameContextMenuItem(asset as Asset, () => { refreshElement(asset!.id) }),
    deleteContextMenuItem(asset as Asset),
    downloadContextMenuItem(asset as Asset),
    createZipDownloadContextMenuItem(asset as Asset),
    clearImageThumbnailContextMenuItem(asset as Asset),
    clearVideoThumbnailContextMenuItem(asset as Asset),
    clearPdfThumbnailContextMenuItem(asset as Asset)
  ]
  const visibleItems = items.filter(item => (item !== null && 'hidden' in item) ? item?.hidden === false : false)

  return (
    <ButtonGroup>
      <Popconfirm
        onCancel={ onCancel }
        onConfirm={ onConfirm }
        onOpenChange={ onOpenChange }
        open={ popConfirmOpen }
        title={ t('toolbar.reload.confirmation') }
      >
        <IconButton
          icon={ { value: 'refresh' } }
        >
          {t('toolbar.reload')}
        </IconButton>
      </Popconfirm>

      {visibleItems.length > 0 && (
        <Dropdown menu={ { items } }>
          <DropdownButton key={ 'dropdown-button' }>
            {t('toolbar.more')}
          </DropdownButton>
        </Dropdown>
      )}
    </ButtonGroup>
  )

  function onOpenChange (newOpen: boolean): void {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (Object.keys(asset?.changes ?? {}).length > 0) {
      setPopConfirmOpen(true)
    } else {
      refreshElement(asset!.id)
    }
  }

  function onConfirm (): void {
    setPopConfirmOpen(false)
    refreshElement(asset!.id)
  }

  function onCancel (): void {
    setPopConfirmOpen(false)
  }
}
