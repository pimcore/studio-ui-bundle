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
import type { TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { isUndefined } from 'lodash'

export interface SettingsDataAction {
  id: number
  settingsData: Record<string, any>
}

export interface SettingsDataDraft extends TrackableChangesDraft {
  settingsData?: Record<string, any>
}

export type SettingsData = Record<string, any>

interface UseSettingsDataReturn {
  setSettingsData: (state: EntityState<SettingsDataDraft, number>, action: PayloadAction<SettingsDataAction>) => void
  updateSettingsData: (state: EntityState<SettingsDataDraft, number>, action: PayloadAction<SettingsDataAction>) => void
}

export const useSettingsDataReducers = (entityAdapter: EntityAdapter<SettingsDataDraft, number>): UseSettingsDataReturn => {
  const modifyDraft = (state: EntityState<SettingsDataDraft, number>, id: number, modification: (draft: SettingsDataDraft) => SettingsDataDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)

    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: SettingsDataDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      settingsData: true
    }
  }

  const setSettingsData = (state: EntityState<SettingsDataDraft, number>, action: PayloadAction<SettingsDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: SettingsDataDraft): SettingsDataDraft => {
      const { settingsData } = action.payload

      if (!isUndefined(settingsData)) {
        draft.settingsData = { ...settingsData }
        markedAsModified(draft)
      }

      return draft
    })
  }

  const updateSettingsData = (state: EntityState<SettingsDataDraft, number>, action: PayloadAction<SettingsDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: SettingsDataDraft): SettingsDataDraft => {
      const { settingsData } = action.payload

      if (!isUndefined(settingsData)) {
        draft.settingsData = {
          ...draft.settingsData,
          ...settingsData
        }
        markedAsModified(draft)
      }

      return draft
    })
  }

  return { setSettingsData, updateSettingsData }
}

export interface UseSettingsDataDraftReturn {
  settingsData?: SettingsData
  setSettingsData: (settingsData: SettingsData) => void
  updateSettingsData: (settingsData: Partial<SettingsData>) => void
}

export const useSettingsDataDraft = ({ id, draft, setSettingsDataAction, updateSettingsDataAction }: {
  id: number
  draft: SettingsDataDraft
  setSettingsDataAction: ActionCreatorWithPayload<SettingsDataAction>
  updateSettingsDataAction: ActionCreatorWithPayload<SettingsDataAction>
}): UseSettingsDataDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    settingsData: draft?.settingsData,

    setSettingsData: (settingsData: SettingsData): void => {
      dispatch(setSettingsDataAction({ id, settingsData }))
    },

    updateSettingsData: (settingsData: Partial<SettingsData>): void => {
      dispatch(updateSettingsDataAction({ id, settingsData }))
    }
  }
}
