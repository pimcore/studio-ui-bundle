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

import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { api as dataObjectApi, type DataObject, type DataObjectGetByIdApiResponse } from '../data-object-api-slice-enhanced'
import {
  addPropertyToDataObject,
  addScheduleToDataObject,
  dataObjectReceived,
  removeDataObject,
  removePropertyFromDataObject,
  removeScheduleFromDataObject,
  resetChanges,
  resetSchedulesChangesForDataObject,
  selectDataObjectById,
  setActiveTabForDataObject,
  setModifiedCells,
  setPropertiesForDataObject,
  setSchedulesForDataObject,
  updatePropertyForDataObject,
  updateScheduleForDataObject,
  markObjectDataAsModified,
  setDraftData,
  publishDraft,
  unpublishDraft
} from '../data-object-draft-slice'
import { useEffect, useState } from 'react'
import { usePropertiesDraft, type UsePropertiesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-properties'
import {
  useTrackableChangesDraft,
  type UseTrackableChangesDraftReturn
} from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { useSchedulesDraft, type UseSchedulesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import type { ElementEditorType, TypeRegistryInterface } from '@Pimcore/modules/element/editor/services/type-registry'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { initialTabsStateValue, useTabsDraft, type UseTabsDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import {
  useModifiedObjectDataDraft,
  type UseModifiedObjectDataDraftReturn
} from '@Pimcore/modules/data-object/draft/hooks/use-modified-object-data'
import { useDraftDataDraft, type UseDraftDataReturn } from '@Pimcore/modules/data-object/draft/hooks/use-draft-data'
import { usePublishedDraft, type UsePublishedData } from '@Pimcore/modules/element/draft/hooks/use-published'

export interface UseDataObjectDraftReturn extends
  UsePropertiesDraftReturn,
  UseSchedulesDraftReturn,
  UseTabsDraftReturn,
  UseModifiedObjectDataDraftReturn,
  UseDraftDataReturn,
  UseTrackableChangesDraftReturn,
  UsePublishedData {
  isLoading: boolean
  isError: boolean
  dataObject: undefined | ReturnType<typeof selectDataObjectById>
  editorType: ElementEditorType | undefined

  removeDataObjectFromState: () => void

  fetchDataObject: () => Promise<DataObject>
}

export const useDataObjectDraft = (id: number): UseDataObjectDraftReturn => {
  const dispatch = useAppDispatch()
  const dataObject = useAppSelector(state => selectDataObjectById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const typeRegistry = useInjection<TypeRegistryInterface>(serviceIds['DataObject/Editor/TypeRegistry'])

  async function fetchDataObject (): Promise<DataObjectGetByIdApiResponse> {
    const { data } = await dispatch(dataObjectApi.endpoints.dataObjectGetById.initiate({ id }))

    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as DataObject
  }

  useEffect(() => {
    if (dataObject === undefined) {
      getDataObject()
    } else {
      setIsLoading(false)
    }
  }, [dataObject])

  function getDataObject (): void {
    setIsLoading(true)

    Promise.all([
      fetchDataObject()
    ]).then(([dataObjectData]) => {
      const mergedDataObjectData = {
        ...dataObjectData,
        id,
        modified: false,
        properties: [],
        schedules: [],
        changes: {},
        modifiedCells: {},
        modifiedObjectData: {},
        ...initialTabsStateValue
      }

      if (dataObjectData !== undefined) {
        dispatch(dataObjectReceived(mergedDataObjectData))
      }

      return mergedDataObjectData
    }).catch((e) => {
      console.error(e)
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function removeDataObjectFromState (): void {
    if (dataObject === undefined) return

    dispatch(removeDataObject(dataObject.id))
  }

  const trackableChangesActions = useTrackableChangesDraft(
    id,
    resetChanges,
    setModifiedCells
  )

  const propertyActions = usePropertiesDraft(
    id,
    dataObject,
    updatePropertyForDataObject,
    addPropertyToDataObject,
    removePropertyFromDataObject,
    setPropertiesForDataObject
  )

  const schedulesActions = useSchedulesDraft(
    id,
    dataObject,
    updateScheduleForDataObject,
    addScheduleToDataObject,
    removeScheduleFromDataObject,
    setSchedulesForDataObject,
    resetSchedulesChangesForDataObject
  )

  const tabsActions = useTabsDraft(
    id,
    dataObject,
    setActiveTabForDataObject
  )

  const modifiedObjectDataActions = useModifiedObjectDataDraft(
    id,
    dataObject,
    markObjectDataAsModified
  )

  const draftDataActions = useDraftDataDraft(
    id,
    setDraftData
  )

  const publishedActions = usePublishedDraft(
    id,
    publishDraft,
    unpublishDraft
  )

  const editorType = dataObject?.type === undefined
    ? undefined
    : (typeRegistry.get(dataObject.type) ?? typeRegistry.get('object'))

  return {
    isLoading,
    isError,
    dataObject,
    editorType,
    removeDataObjectFromState,
    fetchDataObject,
    ...trackableChangesActions,
    ...propertyActions,
    ...schedulesActions,
    ...tabsActions,
    ...modifiedObjectDataActions,
    ...draftDataActions,
    ...publishedActions
  }
}
