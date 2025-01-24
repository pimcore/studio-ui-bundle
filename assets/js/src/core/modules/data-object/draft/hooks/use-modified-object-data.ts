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
import _ from 'lodash'

export interface ModifiedObjectDataAction {
  id: number
  values: any
}

export interface ModifiedObjectDataDraft extends TrackableChangesDraft {
  modifiedObjectData: Record<string, any>
}

interface UseModifiedObjectDataReturn {
  trackModifiedObjectData: (state: EntityState<ModifiedObjectDataDraft, number>, action: PayloadAction<ModifiedObjectDataAction>) => void
}

export const useModifiedObjectDataReducers = (entityAdapter: EntityAdapter<ModifiedObjectDataDraft, number>): UseModifiedObjectDataReturn => {
  const trackModifiedObjectData = (state: EntityState<ModifiedObjectDataDraft, number>, action: PayloadAction<ModifiedObjectDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: ModifiedObjectDataDraft): ModifiedObjectDataDraft => {
      draft.modifiedObjectData = _.merge({}, draft.modifiedObjectData, action.payload.values)

      markedAsModified(draft)
      return draft
    })
  }

  const modifyDraft = (state: EntityState<ModifiedObjectDataDraft, number>, id: number, modification: (draft: ModifiedObjectDataDraft) => ModifiedObjectDataDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      console.error(`Object draft with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })

    console.log('my modified draft', draft?.modifiedObjectData)
  }

  const markedAsModified = (draft: ModifiedObjectDataDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      objectData: true
    }
  }

  return {
    trackModifiedObjectData
  }
}

export interface UseModifiedObjectDataDraftReturn {
  modifiedObjectData: Record<string, any>
  trackModifiedObjectData: (values: any) => void
}

export const useModifiedObjectDataDraft = (
  id: number,
  draft: ModifiedObjectDataDraft,
  trackModifiedObjectDataAction: ActionCreatorWithPayload<ModifiedObjectDataAction>
): UseModifiedObjectDataDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    modifiedObjectData: draft?.modifiedObjectData ?? {},

    trackModifiedObjectData: (values: any): void => {
      dispatch(trackModifiedObjectDataAction({ id, values }))
    }
  }
}
