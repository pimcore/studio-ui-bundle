/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '@sdk/app'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface ModifiedCell {
  rowIndex: number | string
  columnId: string
}

export type ModifiedCells = ModifiedCell[]

export interface ModifiedCellsAction {
  type: string
  modifiedCells: ModifiedCells
}

export interface TrackableChangesDraft {
  modified: boolean
  changes: Record<string, boolean>
  modifiedCells: Record<string, ModifiedCells>
}

interface UseTrackableChangesReturn {
  resetChanges: (state: TrackableChangesDraft, action: PayloadAction<void>) => void
  setModifiedCells: (state: TrackableChangesDraft, action: PayloadAction<ModifiedCellsAction>) => void
}

export const useTrackableChangesReducers = (): UseTrackableChangesReturn => {
  const resetChanges = (state: TrackableChangesDraft): void => {
    state.changes = {}
    state.modifiedCells = {}
    state.modified = false
  }

  const setModifiedCells = (state: TrackableChangesDraft, action: PayloadAction<ModifiedCellsAction>): void => {
    state.modifiedCells[action.payload.type] = {
      ...state.modifiedCells[action.payload.type],
      ...action.payload.modifiedCells
    };
    state.modified = true
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
    resetChangesAction: () => PayloadAction<void>,
    setModifiedCellsAction: (action: ModifiedCellsAction) => PayloadAction<ModifiedCellsAction>
): UseTrackableChangesDraftReturn => {
  const dispatch = useAppDispatch();

  return {
    removeTrackedChanges: (): void => {
      dispatch(resetChangesAction());
    },
    setModifiedCells: (type: string, modifiedCells: ModifiedCells): void => {
      dispatch(setModifiedCellsAction({ type, modifiedCells }));
    },
  };
};