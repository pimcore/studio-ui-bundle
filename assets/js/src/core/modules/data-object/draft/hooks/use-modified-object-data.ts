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

import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit'
import type { EntityAdapter, EntityState } from '@reduxjs/toolkit/src/entities/models'

import { useAppDispatch } from '@Pimcore/app/store'

import { type TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { useTransition } from 'react'

export interface ModifiedObjectDataDraft extends TrackableChangesDraft {

}

interface UseModifiedObjectDataReturn {
  markObjectDataAsModified: (state: EntityState<ModifiedObjectDataDraft, number>, action: PayloadAction<number>) => void
}

export const useModifiedObjectDataReducers = (entityAdapter: EntityAdapter<ModifiedObjectDataDraft, number>): UseModifiedObjectDataReturn => {
  const markObjectDataAsModified = (state: EntityState<ModifiedObjectDataDraft, number>, action: PayloadAction<number>): void => {
    modifyDraft(state, action.payload, (draft: ModifiedObjectDataDraft): ModifiedObjectDataDraft => {
      markedAsModified(draft)
      return draft
    })
  }

  const modifyDraft = (state: EntityState<ModifiedObjectDataDraft, number>, id: number, modification: (draft: ModifiedObjectDataDraft) => ModifiedObjectDataDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: ModifiedObjectDataDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      objectData: true
    }
  }

  return {
    markObjectDataAsModified
  }
}

export interface UseModifiedObjectDataDraftReturn {
  markObjectDataAsModified: () => void
}

export const useModifiedObjectDataDraft = (
  id: number,
  draft: ModifiedObjectDataDraft,
  markObjectDataAsModifiedAction: ActionCreatorWithPayload<number>
): UseModifiedObjectDataDraftReturn => {
  const dispatch = useAppDispatch()
  const [, startTransition] = useTransition()

  return {

    markObjectDataAsModified: (): void => {
      if (draft?.changes?.objectData) {
        return
      }
      startTransition(() => {
        dispatch(markObjectDataAsModifiedAction(id))
      })
    }
  }
}
