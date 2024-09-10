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

import React, { useContext, useEffect, useState } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { AssetContext } from '../../asset-provider'
import { api, type AssetUpdateByIdApiArg, useAssetUpdateByIdMutation } from '../../asset-api-slice-enhanced'
import { useMessage } from '@Pimcore/components/message/useMessage'
import ButtonGroup from 'antd/es/button/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { Popconfirm } from 'antd'
import { type CustomMetadata as CustomMetadataApi } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { type DataProperty as DataPropertyApi } from '@Pimcore/modules/asset/properties-api-slice.gen'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const dispatch = useAppDispatch()
  const { asset, properties, removeTrackedChanges, removeAssetFromState, customMetadata, imageSettings } = useAssetDraft(id!)
  const hasChanges = asset?.modified === true
  const [saveAsset, { isLoading, isSuccess }] = useAssetUpdateByIdMutation()
  const messageApi = useMessage()
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success(t('save-success'))
      removeTrackedChanges()
    }
  }, [isSuccess])

  return (
    <ToolbarView>
      <ButtonGroup>
        <Popconfirm
          onCancel={ onCancel }
          onConfirm={ onConfirm }
          onOpenChange={ onOpenChange }
          open={ popConfirmOpen }
          title={ t('toolbar.reload.confirmation') }
        >
          <IconButton
            icon='refresh'
          >
            {t('toolbar.reload')}
          </IconButton>
        </Popconfirm>
      </ButtonGroup>

      <Button
        disabled={ !hasChanges || isLoading }
        loading={ isLoading }
        onClick={ onSaveClick }
        type="primary"
      >
        {t('toolbar.save-and-publish')}
      </Button>
    </ToolbarView>
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
    dispatch(api.util.invalidateTags(invalidatingTags.ASSET_DETAIL_ID(id!)))
  }

  function onSaveClick (): void {
    if (asset?.changes === undefined) return

    const update: AssetUpdateByIdApiArg['body']['data'] = {}
    if (asset.changes.properties) {
      const propertyUpdate = properties?.map((property: DataProperty): DataPropertyApi => {
        const { rowId, ...propertyApi } = property

        if (typeof propertyApi.data === 'object') {
          return {
            ...propertyApi,
            data: propertyApi?.data?.id ?? null
          }
        }

        return propertyApi
      })

      update.properties = propertyUpdate?.filter((property) => !property.inherited)
    }

    if (asset.changes.customMetadata) {
      update.metadata = customMetadata?.map((metadata: CustomMetadata): CustomMetadataApi => {
        const { rowId, ...metadataApi } = metadata
        return metadataApi
      })
    }

    if (asset.changes.imageSettings) {
      update.image = imageSettings
    }

    const savePromise = saveAsset({
      id: id!,
      body: {
        data: {
          ...update
        }
      }
    })

    savePromise.catch((error) => {
      console.error(error)
    })
  }
}
