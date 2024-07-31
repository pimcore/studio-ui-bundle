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

import React, { useContext, useEffect } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { AssetContext } from '../../asset-provider'
import { type UpdateAssetByIdApiArg, useUpdateAssetByIdMutation } from '../../asset-api-slice.gen'
import { useMessage } from '@Pimcore/components/message/useMessage'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { asset, properties, removeTrackedChanges, customMetadata } = useAssetDraft(id!)
  const hasChanges = asset?.modified === true
  const [saveAsset, { isLoading, isSuccess }] = useUpdateAssetByIdMutation()
  const messageApi = useMessage()

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success(t('save-success'))
      removeTrackedChanges()
    }
  }, [isSuccess])

  return (
    <ToolbarView
      pinnableToolbarElements={
    [
      {
        iconName: 'refresh',
        label: t('toolbar.reload'),
        pinning: true
      }
    ]
  }
      renderSaveButton={
        <Button
          disabled={ !hasChanges || isLoading }
          onClick={ onSaveClick }
          type="primary"
        >
          {t('toolbar.save-and-publish')}

          {isLoading && '...'}
        </Button>
      }
    />
  )

  function onSaveClick (): void {
    if (asset?.changes === undefined) return

    const update: UpdateAssetByIdApiArg['body']['data'] = {}
    if (asset.changes.properties === true) {
      const propertyUpdate = properties?.map((property) => {
        if (typeof property.data === 'object') {
          return {
            ...property,
            data: property?.data?.id ?? null
          }
        }

        return property
      })

      update.properties = propertyUpdate?.filter((property) => !property.inherited)
    }

    if (asset.changes.customMetadata === true) {
      update.metadata = customMetadata
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
