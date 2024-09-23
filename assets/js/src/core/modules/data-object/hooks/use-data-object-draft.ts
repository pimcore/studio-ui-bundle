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
  setPropertiesForDataObject,
  setSchedulesForDataObject,
  updatePropertyForDataObject,
  updateScheduleForDataObject
} from '../data-object-draft-slice'
import { useEffect, useState } from 'react'
import { usePropertiesDraft, type UsePropertiesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-properties'
import {
  useTrackableChangesDraft,
  type UseTrackableChangesDraftReturn
} from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { useSchedulesDraft, type UseSchedulesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-schedules'

interface UseDataObjectDraftReturn extends
  UsePropertiesDraftReturn,
  UseSchedulesDraftReturn,
  UseTrackableChangesDraftReturn {
  isLoading: boolean
  isError: boolean
  dataObject: undefined | ReturnType<typeof selectDataObjectById>

  removeDataObjectFromState: () => void

  fetchDataObject: () => Promise<DataObject>
}

export const useDataObjectDraft = (id: number): UseDataObjectDraftReturn => {
  const dispatch = useAppDispatch()
  const dataObject = useAppSelector(state => selectDataObjectById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

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
        changes: {}
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
    resetChanges
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

  return {
    isLoading,
    isError,
    dataObject,
    removeDataObjectFromState,
    fetchDataObject,
    ...trackableChangesActions,
    ...propertyActions,
    ...schedulesActions
  }
}
