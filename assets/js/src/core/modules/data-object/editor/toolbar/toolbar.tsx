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
import { useDataObjectDraft } from '../../hooks/use-data-object-draft'
import { DataObjectContext } from '../../data-object-provider'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useSaveSchedules } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'

import { type DataProperty as DataPropertyApi } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import {
  type DataObjectUpdateByIdApiArg,
  useDataObjectUpdateByIdMutation
} from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject, properties, removeTrackedChanges } = useDataObjectDraft(id)
  const hasChanges = dataObject?.modified === true
  const [saveDataObject, { isLoading, isSuccess, isError }] = useDataObjectUpdateByIdMutation()
  const { saveSchedules, isLoading: isSchedulesLoading, isSuccess: isSchedulesSuccess, isError: isSchedulesError } = useSaveSchedules('data-object', id, false)
  const messageApi = useMessage()
  const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const ContextMenu = componentRegistry.get('editorToolbarContextMenuDataObject')

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
  console.log('hasChanges', hasChanges)
  return (
    <ToolbarView>
      <ContextMenu />

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
    if (dataObject?.changes === undefined) return

    const update: DataObjectUpdateByIdApiArg['body']['data'] = {}
    if (dataObject.changes.properties) {
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

    const saveDataObjectPromise = saveDataObject({
      id,
      body: {
        data: {
          ...update
        }
      }
    })

    const saveSchedulesPromise = saveSchedules()

    Promise.all([saveDataObjectPromise, saveSchedulesPromise]).catch((error) => {
      console.log(error)
    })
  }
}
