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

import React, { useEffect } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { type AssetUpdateByIdApiArg, useAssetUpdateByIdMutation } from '../../asset-api-slice-enhanced'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import {
  type CustomMetadata as CustomMetadataApi
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'

import {
  type DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { container } from '@Pimcore/app/depency-injection'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { EditorToolbarWorkflowMenu } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-menu'
import { Flex } from '@Pimcore/components/flex/flex'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useElementContext()

  const { asset, properties, removeTrackedChanges, customMetadata, imageSettings } = useAssetDraft(id)
  const hasChanges = asset?.modified === true
  const [saveAsset, { isLoading, isSuccess, isError }] = useAssetUpdateByIdMutation()
  const {
    saveSchedules,
    isLoading: isSchedulesLoading,
    isSuccess: isSchedulesSuccess,
    isError: isSchedulesError
  } = useSaveSchedules('asset', id, false)
  const messageApi = useMessage()
  const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const ContextMenu = componentRegistry.get('editorToolbarContextMenuAsset')

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
    <ToolbarView>
      <ContextMenu />
      <Flex
        className='overflow-x-auto'
        style={ { width: '100%' } }
        vertical={ false }
      >
        <EditorToolbarWorkflowMenu />
        <Button
          disabled={ !hasChanges || isLoading || isSchedulesLoading }
          loading={ isLoading || isSchedulesLoading }
          onClick={ onSaveClick }
          type="primary"
        >
          {t('toolbar.save-and-publish')}
        </Button>
      </Flex>
    </ToolbarView>
  )

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

    const saveAssetPromise = saveAsset({
      id,
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
