/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@sdk/app'
import { api as documentApi } from '../document-api-slice-enhanced'
import { documentReceived } from '../document-draft-slice'
import { addFailedDraftId, removeFailedDraftId } from '../document-draft-error-slice' // Import the new action
import { isUndefined } from 'lodash'
import { initialTabsStateValue } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { setDocumentNodeStaticGeneratorEnabled } from '@Pimcore/components/element-tree/element-tree-slice'

// Global map to track fetching drafts
const fetchingDrafts = new Map<number, boolean>()

interface UseDocumentDraftFetcherReturn {
  updateDocumentDraft: (id: number, forceRefetch?: boolean) => Promise<void>
}

export const useDocumentDraftFetcher = (): UseDocumentDraftFetcherReturn => {
  const dispatch = useAppDispatch()

  const updateDocumentDraft = async (id: number, forceRefetch: boolean = false): Promise<void> => {
    if (fetchingDrafts.get(id) === true && !forceRefetch) {
      return
    }

    fetchingDrafts.set(id, true)
    try {
      const { data: documentData, error } = await dispatch(documentApi.endpoints.documentGetById.initiate({ id }, { forceRefetch }))

      if (!isUndefined(error)) {
        trackError(new ApiError(error))
        dispatch(addFailedDraftId(id))
      }

      if (!isUndefined(documentData)) {
        const mergedDocumentData = {
          ...documentData,
          id,
          modified: false,
          properties: [],
          schedules: [],
          changes: {},
          modifiedCells: {},
          ...initialTabsStateValue
        }

        dispatch(documentReceived(mergedDocumentData))
        dispatch(removeFailedDraftId(id))

        const settingsData = documentData.settingsData as Record<string, unknown> | undefined

        if (!isUndefined(settingsData?.staticGeneratorEnabled)) {
          dispatch(setDocumentNodeStaticGeneratorEnabled({
            nodeId: String(id),
            staticGeneratorEnabled: Boolean(settingsData.staticGeneratorEnabled)
          }))
        }
      }
    } finally {
      fetchingDrafts.delete(id)
    }
  }

  return {
    updateDocumentDraft
  }
}
