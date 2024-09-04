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
import { Button } from '@Pimcore/components/button/button'
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { AssetContext } from '../../asset-provider'
import { type AssetUpdateByIdApiArg, useAssetUpdateByIdMutation } from '../../asset-api-slice.gen'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  useSaveSchedules
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { asset, properties, removeTrackedChanges, customMetadata, imageSettings } = useAssetDraft(id!)
  const hasChanges = asset?.modified === true
  const [saveAsset, { isLoading, isSuccess, isError }] = useAssetUpdateByIdMutation()
  const { saveSchedules, isLoading: isSchedulesLoading, isSuccess: isSchedulesSuccess, isError: isSchedulesError } = useSaveSchedules('asset', id!, false)
  const messageApi = useMessage()

  useEffect(() => {
    if (isSuccess && isSchedulesSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success(t('save-success'))
      removeTrackedChanges()
    }
  }, [isSuccess, isSchedulesSuccess])

  useEffect(() => {
    if (isError || isSchedulesError) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error(t('save-failed'))
    }
  }, [isError, isSchedulesError])

  return (
    <ToolbarView justify='flex-end'>
      <Button
        disabled={ !hasChanges || isLoading || isSchedulesLoading }
        loading={ isLoading || isSchedulesLoading }
        onClick={ onSaveClick }
        type="primary"
      >
        {t('toolbar.save-and-publish')}
      </Button>
    </ToolbarView>
  )

  function onSaveClick (): void {
    if (asset?.changes === undefined) return

    const update: AssetUpdateByIdApiArg['body']['data'] = {}
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

    if (asset.changes.imageSettings === true) {
      update.image = imageSettings
    }

    const saveAssetPromise = saveAsset({
      id: id!,
      body: {
        data: {
          ...update
        }
      }
    })

    const saveSchedulesPromise = saveSchedules()

    Promise.all([saveAssetPromise, saveSchedulesPromise]).catch((error) => {
      console.log(error)
    })
  }
}
