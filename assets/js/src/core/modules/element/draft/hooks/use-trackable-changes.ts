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

export interface TrackableChangesDraft {
  modified: boolean
  changes: Record<string, boolean>
}

interface UseTrackableChangesReturn {
  resetChanges: (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<number>) => void
}

export const useTrackableChangesReducers = (entityAdapter: EntityAdapter<TrackableChangesDraft, number>): UseTrackableChangesReturn => {
  const resetChanges = (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<number>): void => {
    modifyDraft(state, action.payload, (draft: TrackableChangesDraft): TrackableChangesDraft => {
      draft.changes = {}
      draft.modified = false

      return draft
    })
  }

  const modifyDraft = (state: EntityState<TrackableChangesDraft, number>, id: number, modification: (draft: TrackableChangesDraft) => TrackableChangesDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  return {
    resetChanges
  }
}

export interface UseTrackableChangesDraftReturn {
  removeTrackedChanges: () => void
}

export const useTrackableChangesDraft = (
  id: number,
  resetChangesAction: ActionCreatorWithPayload<number>
): UseTrackableChangesDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    removeTrackedChanges: (): void => {
      dispatch(resetChangesAction(id))
    }
  }
}
