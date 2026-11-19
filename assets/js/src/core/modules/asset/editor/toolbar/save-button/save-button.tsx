/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useAssetDraft } from '../../../hooks/use-asset-draft'
import { useAssetUpdateByIdMutation } from '../../../asset-api-slice-enhanced'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { isNil } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import {
  type AssetSaveDataProcessorRegistry,
  AssetSaveDataContext,
  type AssetSaveUpdateData
} from '@Pimcore/modules/asset/services/processors/asset-save-data-processor-registry'
import { eventBus } from '@Pimcore/lib/event-bus'
import { eventTypes } from '@Pimcore/lib/event-bus/event-types'
import { type AssetPostUpdateEvent } from '@Pimcore/modules/asset/events/post-update-event'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'
import { useAppDispatch } from '@sdk/app'
import { setModificationDate } from '@Pimcore/modules/asset/asset-draft-slice'
import { collectAssetUpdateData, getSentChangeTypes, hasAssetUpdateData } from './collect-asset-update-data'

export const EditorToolbarSaveButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useElementContext()
  const dispatch = useAppDispatch()

  const { asset, properties, removeTrackedChanges, customMetadata, customSettings, imageSettings, textData } = useAssetDraft(id)

  const [saveAsset, { isLoading, isError, error }] = useAssetUpdateByIdMutation()
  const {
    saveSchedules,
    isLoading: isSchedulesLoading,
    isError: isSchedulesError,
    error: schedulesError
  } = useSaveSchedules('asset', id, false)
  const messageApi = useMessage()

  useEffect(() => {
    if (isError && !isNil(error)) {
      trackError(new ApiError(error))
    } else if (isSchedulesError && !isNil(schedulesError)) {
      trackError(new ApiError(schedulesError))
    }
  }, [isError, isSchedulesError, error, schedulesError])

  useHandleKeyBindings(async () => {
    if (asset != null && checkElementPermission(asset.permissions, 'publish')) {
      onSaveClick()
    }
  }, 'publish')

  useHandleKeyBindings(async () => {
    if (asset != null && checkElementPermission(asset.permissions, 'publish')) {
      onSaveClick()
    }
  }, 'save')

  return (
    <>
      { checkElementPermission(asset?.permissions, 'publish') && (
      <Button
        disabled={ isLoading || isSchedulesLoading }
        loading={ isLoading || isSchedulesLoading }
        onClick={ onSaveClick }
        type="primary"
      >
        {t(asset?.type === 'folder' ? 'toolbar.save' : 'toolbar.save-and-publish')}
      </Button>
      ) }
    </>
  )

  async function updateAsset (update: AssetSaveUpdateData): Promise<Awaited<ReturnType<typeof saveAsset>>> {
    const response = await saveAsset({
      id,
      body: {
        data: {
          ...update
        }
      }
    })

    if (response.error === undefined) {
      if ('modificationDate' in response.data) {
        dispatch(setModificationDate({ id, modificationDate: response.data.modificationDate ?? null }))
      }

      const event: AssetPostUpdateEvent = {
        identifier: {
          type: eventTypes['asset:editor:post-update'],
          id: String(id)
        },
        payload: {
          id,
          updatedData: update,
          responseData: response.data
        }
      }
      eventBus.publish(event)
    }

    return response
  }

  function onSaveClick (): void {
    if (asset?.changes === undefined) return

    const draftData = { properties, customMetadata, customSettings, imageSettings, textData }
    const { updateData: update, collectedTypes } = collectAssetUpdateData(asset.changes, draftData)

    const saveDataProcessorRegistry = container.get<AssetSaveDataProcessorRegistry>(
      serviceIds['Asset/ProcessorRegistry/SaveDataProcessor']
    )

    const context = new AssetSaveDataContext(id, update)
    saveDataProcessorRegistry.executeProcessors(context)

    // An asset save without data would only create a version and bump the modification date
    const saveAssetPromise = hasAssetUpdateData(update)
      ? updateAsset(update)
      : Promise.resolve(undefined)

    const saveSchedulesPromise = saveSchedules()

    Promise.all([saveAssetPromise, saveSchedulesPromise]).then(async ([assetResponse, isSchedulesSaved]) => {
      if (assetResponse?.error !== undefined || !isSchedulesSaved) {
        return
      }

      // Only reset what was sent and not edited since: changes tracked while the request was in flight must survive
      const sentTypes = getSentChangeTypes(collectedTypes, update)
      if (sentTypes.length > 0) {
        removeTrackedChanges(sentTypes, draftData)
      }

      await messageApi.success(t('save-success'))
    }).catch((error) => {
      console.log(error)
    })
  }
}
