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
import { useTransition } from 'react'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type DataObjectDraft } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { isNil } from 'lodash'

export const IS_AUTO_SAVE_DRAFT_CREATED = 'isAutoSaveDraftCreated'

interface UseDraftDataReducersReturn {
  setDraftData: (state: EntityState<DataObjectDraft, number>, action: PayloadAction<{ id: number, draftData: any }>) => void
}

export const useDraftDataReducers = (entityAdapter: EntityAdapter<DataObjectDraft, number>): UseDraftDataReducersReturn => {
  const setDraftData = (state: EntityState<DataObjectDraft, number>, action: PayloadAction<{ id: number, draftData: DataObject['draftData'] }>): void => {
    modifyDraft(state, action.payload.id, (draft: DataObjectDraft): DataObjectDraft => {
      if (isNil(draft.draftData) && action.payload.draftData?.isAutoSave === true) {
        draft.changes = {
          ...draft.changes,
          [IS_AUTO_SAVE_DRAFT_CREATED]: true
        }
      }
      draft.draftData = action.payload.draftData
      return draft
    })
  }

  const modifyDraft = (state: EntityState<DataObjectDraft, number>, id: number, modification: (draft: DataObjectDraft) => DataObjectDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  return {
    setDraftData
  }
}

export interface UseDraftDataReturn {
  setDraftData: (draftData: any) => void
}

export const useDraftDataDraft = (
  id: number,
  setDraftDataAction: ActionCreatorWithPayload<{ id: number, draftData: any }>
): UseDraftDataReturn => {
  const dispatch = useAppDispatch()
  const [, startTransition] = useTransition()

  return {
    setDraftData: (draftData: any): void => {
      startTransition(() => {
        dispatch(setDraftDataAction({ id, draftData }))
      })
    }
  }
}
