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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface ModifiedCell {
  rowIndex: number | string
  columnId: string
}

type ModifiedCells = ModifiedCell[]

export interface ModifiedCellsAction {
  id: number
  type: string
  modifiedCells: ModifiedCells
}

export interface TrackableChangesDraft {
  modified: boolean
  changes: Record<string, boolean>
  modifiedCells: Record<string, ModifiedCells>
}

interface UseTrackableChangesReturn {
  resetChanges: (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<number>) => void
  setModifiedCells: (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<ModifiedCellsAction>) => void
}

export const useTrackableChangesReducers = (entityAdapter: EntityAdapter<TrackableChangesDraft, number>): UseTrackableChangesReturn => {
  const resetChanges = (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<number>): void => {
    modifyDraft(state, action.payload, (draft: TrackableChangesDraft): TrackableChangesDraft => {
      draft.changes = {}
      draft.modifiedCells = {}
      draft.modified = false

      return draft
    })
  }

  const setModifiedCells = (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<ModifiedCellsAction>): void => {
    modifyDraft(state, action.payload.id, (draft: TrackableChangesDraft): TrackableChangesDraft => {
      draft.modifiedCells = {
        ...draft.modifiedCells,
        [action.payload.type]: action.payload.modifiedCells
      }

      return draft
    })
  }

  const modifyDraft = (state: EntityState<TrackableChangesDraft, number>, id: number, modification: (draft: TrackableChangesDraft) => TrackableChangesDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      trackError(new GeneralError(`Item with id ${id} not found`))
    }

    state.entities[id] = modification({ ...draft })
  }

  return {
    resetChanges,
    setModifiedCells
  }
}

export interface UseTrackableChangesDraftReturn {
  removeTrackedChanges: () => void
  setModifiedCells: (type: string, modifiedCells: ModifiedCells) => void
}

export const useTrackableChangesDraft = (
  id: number,
  resetChangesAction: ActionCreatorWithPayload<number>,
  setModifiedCellsAction: ActionCreatorWithPayload<ModifiedCellsAction>
): UseTrackableChangesDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    removeTrackedChanges: (): void => {
      dispatch(resetChangesAction(id))
    },
    setModifiedCells: (type, modifiedCells): void => {
      dispatch(setModifiedCellsAction({ id, type, modifiedCells }))
    }
  }
}
