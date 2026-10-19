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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface ModifiedCell {
  rowIndex: number | string
  columnId: string
}

export type ModifiedCells = ModifiedCell[]

export interface ModifiedCellsAction {
  id: number
  type: string
  modifiedCells: ModifiedCells
}

export interface ResetChangesForTypesAction {
  id: number
  types: string[]
}

export interface TrackableChangesDraft {
  modified: boolean
  changes: Record<string, boolean>
  modifiedCells: Record<string, ModifiedCells>
}

interface UseTrackableChangesReturn {
  resetChanges: (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<number>) => void
  resetChangesForTypes: (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<ResetChangesForTypesAction>) => void
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

  const resetChangesForTypes = (state: EntityState<TrackableChangesDraft, number>, action: PayloadAction<ResetChangesForTypesAction>): void => {
    const typesToReset = new Set(action.payload.types)
    const withoutResetTypes = <T>(record: Record<string, T>): Record<string, T> => {
      return Object.fromEntries(Object.entries(record).filter(([type]) => !typesToReset.has(type)))
    }

    modifyDraft(state, action.payload.id, (draft: TrackableChangesDraft): TrackableChangesDraft => {
      draft.changes = withoutResetTypes(draft.changes)
      draft.modifiedCells = withoutResetTypes(draft.modifiedCells)
      draft.modified = Object.keys(draft.changes).length > 0

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
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  return {
    resetChanges,
    resetChangesForTypes,
    setModifiedCells
  }
}

export interface UseTrackableChangesDraftReturn {
  /**
   * Without `types` every tracked change is reset. With `types` only these change types are reset,
   * so changes tracked in the meantime (e.g. while a save request is in flight) are kept.
   */
  removeTrackedChanges: (types?: string[]) => void
  setModifiedCells: (type: string, modifiedCells: ModifiedCells) => void
}

export const useTrackableChangesDraft = (
  id: number,
  resetChangesAction: ActionCreatorWithPayload<number>,
  setModifiedCellsAction: ActionCreatorWithPayload<ModifiedCellsAction>,
  resetChangesForTypesAction?: ActionCreatorWithPayload<ResetChangesForTypesAction>
): UseTrackableChangesDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    removeTrackedChanges: (types?: string[]): void => {
      if (types !== undefined && resetChangesForTypesAction !== undefined) {
        dispatch(resetChangesForTypesAction({ id, types }))
        return
      }

      dispatch(resetChangesAction(id))
    },
    setModifiedCells: (type, modifiedCells): void => {
      dispatch(setModifiedCellsAction({ id, type, modifiedCells }))
    }
  }
}
