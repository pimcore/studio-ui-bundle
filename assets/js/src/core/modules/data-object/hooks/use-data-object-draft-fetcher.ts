/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import { api as dataObjectApi } from '../data-object-api-slice-enhanced'
import { dataObjectReceived } from '../data-object-draft-slice'
import { addFailedDraftId, removeFailedDraftId } from '../data-object-draft-error-slice' // Import the new action
import { isUndefined } from 'lodash'
import { initialTabsStateValue } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

// Global map to track fetching drafts
const fetchingDrafts = new Map<number, boolean>()

interface UseDataObjectDraftFetcherReturn {
  updateDataObjectDraft: (id: number, forceRefetch?: boolean) => Promise<void>
}

export const useDataObjectDraftFetcher = (): UseDataObjectDraftFetcherReturn => {
  const dispatch = useAppDispatch()

  const updateDataObjectDraft = async (id: number, forceRefetch: boolean = false): Promise<void> => {
    if (fetchingDrafts.get(id) === true && !forceRefetch) {
      return
    }

    fetchingDrafts.set(id, true)
    try {
      const { data: dataObjectData, error } = await dispatch(dataObjectApi.endpoints.dataObjectGetById.initiate({ id }, { forceRefetch }))

      if (!isUndefined(error)) {
        trackError(new ApiError(error))
        dispatch(addFailedDraftId(id))
      }

      if (!isUndefined(dataObjectData)) {
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

        dispatch(dataObjectReceived(mergedDataObjectData))
        dispatch(removeFailedDraftId(id))
      }
    } finally {
      fetchingDrafts.delete(id)
    }
  }

  return {
    updateDataObjectDraft
  }
}
