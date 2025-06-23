/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit'
import type { EntityAdapter, EntityState } from '@reduxjs/toolkit/src/entities/models'

import { useAppDispatch } from '@sdk/app'

import { type TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { useTransition } from 'react'

export interface ModifiedDocumentEditablesDraft extends TrackableChangesDraft {

}

interface UseModifiedDocumentEditablesReturn {
  markDocumentEditablesAsModified: (state: EntityState<ModifiedDocumentEditablesDraft, number>, action: PayloadAction<number>) => void
}

export const useModifiedDocumentEditablesReducers = (entityAdapter: EntityAdapter<ModifiedDocumentEditablesDraft, number>): UseModifiedDocumentEditablesReturn => {
  const markDocumentEditablesAsModified = (state: EntityState<ModifiedDocumentEditablesDraft, number>, action: PayloadAction<number>): void => {
    modifyDraft(state, action.payload, (draft: ModifiedDocumentEditablesDraft): ModifiedDocumentEditablesDraft => {
      markedAsModified(draft)
      return draft
    })
  }

  const modifyDraft = (state: EntityState<ModifiedDocumentEditablesDraft, number>, id: number, modification: (draft: ModifiedDocumentEditablesDraft) => ModifiedDocumentEditablesDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: ModifiedDocumentEditablesDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      documentEditable: true
    }
  }

  return {
    markDocumentEditablesAsModified
  }
}

export interface UseModifiedDocumentEditablesDraftReturn {
  markDocumentEditablesAsModified: () => void
}

export const useModifiedDocumentEditablesDraft = (
  id: number,
  draft: ModifiedDocumentEditablesDraft,
  markDocumentEditablesAsModifiedAction: ActionCreatorWithPayload<number>
): UseModifiedDocumentEditablesDraftReturn => {
  const dispatch = useAppDispatch()
  const [, startTransition] = useTransition()

  return {

    markDocumentEditablesAsModified: (): void => {
      if (draft?.changes?.documentEditable) {
        return
      }
      startTransition(() => {
        dispatch(markDocumentEditablesAsModifiedAction(id))
      })
    }
  }
}
