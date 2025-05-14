/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppSelector } from '@Pimcore/app/store'
import {
  addPropertyToDocument,
  addScheduleToDocument, removePropertyFromDocument,
  removeScheduleFromDocument,
  resetChanges,
  resetSchedulesChangesForDocument,
  selectDocumentById,
  setActiveTabForDocument,
  setModifiedCells,
  setPropertiesForDocument,
  setSchedulesForDocument,
  updatePropertyForDocument,
  updateScheduleForDocument,
  publishDraft,
  unpublishDraft
} from '../document-draft-slice'
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

import { usePublishedDraft, type UsePublishedData } from '@Pimcore/modules/element/draft/hooks/use-published'
import { isFailedDraftId } from '../document-draft-error-slice'

export interface UseDocumentDraftReturn extends
  UsePropertiesDraftReturn,
  UseSchedulesDraftReturn,
  UseTabsDraftReturn,
  UseTrackableChangesDraftReturn,
  UsePublishedData {
  isLoading: boolean
  isError: boolean
  document: undefined | ReturnType<typeof selectDocumentById>
  editorType: ElementEditorType | undefined
}

export const useDocumentDraft = (id: number): UseDocumentDraftReturn => {
  const document = useAppSelector(state => selectDocumentById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const typeRegistry = useInjection<TypeRegistryInterface>(serviceIds['Document/Editor/TypeRegistry'])
  const isError = useAppSelector((state) => isFailedDraftId(state, id))

  useEffect(() => {
    if (document === undefined && !isError) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [document])

  const trackableChangesActions = useTrackableChangesDraft(
    id,
    resetChanges,
    setModifiedCells
  )

  const propertyActions = usePropertiesDraft(
    id,
    document,
    updatePropertyForDocument,
    addPropertyToDocument,
    removePropertyFromDocument,
    setPropertiesForDocument
  )

  const schedulesActions = useSchedulesDraft(
    id,
    document,
    updateScheduleForDocument,
    addScheduleToDocument,
    removeScheduleFromDocument,
    setSchedulesForDocument,
    resetSchedulesChangesForDocument
  )

  const tabsActions = useTabsDraft(
    id,
    document,
    setActiveTabForDocument
  )

  const publishedActions = usePublishedDraft(
    id,
    publishDraft,
    unpublishDraft
  )

  const editorType = document?.type === undefined
    ? undefined
    : (typeRegistry.get(document.type) ?? typeRegistry.get('document'))

  return {
    isLoading,
    isError,
    document,
    editorType,
    ...trackableChangesActions,
    ...propertyActions,
    ...schedulesActions,
    ...tabsActions,
    ...publishedActions
  }
}
