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

import { useAppSelector } from '@Pimcore/app/store'
import {
  addPropertyToDataObject,
  addScheduleToDataObject, removePropertyFromDataObject,
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
import { useTabsDraft, type UseTabsDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import {
  useModifiedObjectDataDraft,
  type UseModifiedObjectDataDraftReturn
} from '@Pimcore/modules/data-object/draft/hooks/use-modified-object-data'
import { useDraftDataDraft, type UseDraftDataReturn } from '@Pimcore/modules/data-object/draft/hooks/use-draft-data'
import { usePublishedDraft, type UsePublishedData } from '@Pimcore/modules/element/draft/hooks/use-published'
import { isFailedDraftId } from '../data-object-draft-error-slice'

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
}

export const useDataObjectDraft = (id: number): UseDataObjectDraftReturn => {
  const dataObject = useAppSelector(state => selectDataObjectById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const typeRegistry = useInjection<TypeRegistryInterface>(serviceIds['DataObject/Editor/TypeRegistry'])
  const isError = useAppSelector((state) => isFailedDraftId(state, id))

  useEffect(() => {
    if (dataObject === undefined && !isError) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [dataObject])

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
    ...trackableChangesActions,
    ...propertyActions,
    ...schedulesActions,
    ...tabsActions,
    ...modifiedObjectDataActions,
    ...draftDataActions,
    ...publishedActions
  }
}
