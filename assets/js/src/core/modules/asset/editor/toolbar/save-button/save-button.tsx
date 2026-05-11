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
  type DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import {
  type CustomMetadata as CustomMetadataApi
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
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

export const EditorToolbarSaveButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useElementContext()
  const dispatch = useAppDispatch()

  const { asset, properties, removeTrackedChanges, customMetadata, customSettings, imageSettings, textData } = useAssetDraft(id)

  const [saveAsset, { isLoading, isSuccess, isError, error }] = useAssetUpdateByIdMutation()
  const {
    saveSchedules,
    isLoading: isSchedulesLoading,
    isSuccess: isSchedulesSuccess,
    isError: isSchedulesError,
    error: schedulesError
  } = useSaveSchedules('asset', id, false)
  const messageApi = useMessage()

  useEffect(() => {
    const handleSuccessEvent = async (): Promise<void> => {
      if (isSuccess && isSchedulesSuccess) {
        removeTrackedChanges()
        await messageApi.success(t('save-success'))
      }
    }

    handleSuccessEvent().catch((error) => {
      console.error(error)
    })
  }, [isSuccess, isSchedulesSuccess])

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

  function onSaveClick (): void {
    if (asset?.changes === undefined) return

    const update: AssetSaveUpdateData = {}

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

        if (metadataApi.type.startsWith('metadata.')) {
          metadataApi.type = metadataApi.type.replace('metadata.', '')
        }

        if (metadataApi.data === null) {
          if (metadataApi.type === 'input' || metadataApi.type === 'textarea') {
            metadataApi.data = ''
          }

          if (metadataApi.type === 'checkbox') {
            metadataApi.data = false
          }
        }

        return metadataApi
      })
    }

    if (asset.changes.customSettings) {
      update.customSettings = customSettings
    }

    if (asset.changes.imageSettings) {
      update.image = imageSettings
    }

    if (asset.changes.textData) {
      update.data = textData
    }

    const saveDataProcessorRegistry = container.get<AssetSaveDataProcessorRegistry>(
      serviceIds['Asset/ProcessorRegistry/SaveDataProcessor']
    )

    const context = new AssetSaveDataContext(id, update)
    saveDataProcessorRegistry.executeProcessors(context)

    const saveAssetPromise = saveAsset({
      id,
      body: {
        data: {
          ...update
        }
      }
    }).then((response) => {
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
    })

    const saveSchedulesPromise = saveSchedules()

    Promise.all([saveAssetPromise, saveSchedulesPromise]).catch((error) => {
      console.log(error)
    })
  }
}
