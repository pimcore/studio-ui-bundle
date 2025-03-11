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

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import ButtonGroup from 'antd/es/button/button-group'
import React, { useContext } from 'react'
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
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { ReloadPopconfirm } from '@Pimcore/components/reload-popconfirm/reload-popconfirm'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { asset } = useAssetDraft(id)
  const { renameContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', asset!.id))
  const { deleteContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', asset!.id))
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
      <ReloadPopconfirm
        hasDataChanged={ hasDataChanged }
        onReload={ onReload }
        title={ t('toolbar.reload.confirmation') }
      >
        <IconButton
          icon={ { value: 'refresh' } }
        >
          {t('toolbar.reload')}
        </IconButton>

      </ReloadPopconfirm>

      {visibleItems.length > 0 && (
        <Dropdown menu={ { items } }>
          <DropdownButton key={ 'dropdown-button' }>
            {t('toolbar.more')}
          </DropdownButton>
        </Dropdown>
      )}
    </ButtonGroup>
  )

  function hasDataChanged (): boolean {
    return Object.keys(asset?.changes ?? {}).length > 0
  }

  function onReload (): void {
    refreshElement(id)
  }
}
