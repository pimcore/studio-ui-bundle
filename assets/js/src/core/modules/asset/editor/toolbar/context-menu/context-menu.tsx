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
import { api, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
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
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { id } = useContext(AssetContext)
  const { asset, removeAssetFromState } = useAssetDraft(id)
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)
  const { renameContextMenuItem } = useRename('asset')
  const { deleteContextMenuItem } = useDelete('asset')
  const { downloadContextMenuItem } = useDownload()
  const { createZipDownloadContextMenuItem } = useZipDownload({ elementType: 'asset', type: 'folder' })
  const { clearThumbnailContextMenuItem } = useClearThumbnails()
  const { refreshElementTab } = useRefreshTree('asset')

  const items: DropdownMenuProps['items'] = [
    renameContextMenuItem(asset as Asset, () => { refreshElementTab(asset!.id) }),
    deleteContextMenuItem(asset as Asset),
    downloadContextMenuItem(asset as Asset),
    createZipDownloadContextMenuItem(asset as Asset),
    clearThumbnailContextMenuItem(asset as Asset)
  ]
  const visibleItems = items.filter(item => (item !== null && 'hidden' in item) ? item?.hidden === false : false)

  return (
    <>
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
    </>
  )

  function onOpenChange (newOpen: boolean): void {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (Object.keys(asset?.changes ?? {}).length > 0) {
      setPopConfirmOpen(true)
    } else {
      refreshAsset()
    }
  }

  function onConfirm (): void {
    setPopConfirmOpen(false)
    refreshAsset()
  }

  function onCancel (): void {
    setPopConfirmOpen(false)
  }

  function refreshAsset (): void {
    removeAssetFromState()
    dispatch(api.util.invalidateTags(invalidatingTags.ASSET_DETAIL_ID(id)))
  }
}
