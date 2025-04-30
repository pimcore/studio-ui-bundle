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
import { useAppDispatch } from '@Pimcore/app/store'
import type { TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { type UpdateCustomSettings } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { findIndex, isEmpty, isUndefined } from 'lodash'

export interface CustomSettingsAction {
  id: number
  customSettings: UpdateCustomSettings
}

export interface CustomSettingsDraft extends TrackableChangesDraft {
  customSettings: UpdateCustomSettings[]
}

export type CustomSettings = UpdateCustomSettings[]

interface UseCustomSettingsReturn {
  setCustomSettings: (state: EntityState<CustomSettingsDraft, number>, action: PayloadAction<CustomSettingsAction>) => void
  removeCustomSettings: (state: EntityState<CustomSettingsDraft, number>, action: PayloadAction<CustomSettingsAction>) => void
}

export const useCustomSettingsReducers = (entityAdapter: EntityAdapter<CustomSettingsDraft, number>): UseCustomSettingsReturn => {
  const modifyDraft = (state: EntityState<CustomSettingsDraft, number>, id: number, modification: (draft: CustomSettingsDraft) => CustomSettingsDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)

    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: CustomSettingsDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      customSettings: true
    }
  }

  const setCustomSettings = (state: EntityState<CustomSettingsDraft, number>, action: PayloadAction<CustomSettingsAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomSettingsDraft): CustomSettingsDraft => {
      const { customSettings } = action.payload

      if (!isEmpty(customSettings) && !isUndefined(customSettings.key)) {
        const currentState = state.entities[action.payload.id]
        const currentCustomSettingsList = currentState.customSettings ?? []

        const index = findIndex(currentCustomSettingsList, { key: customSettings.key })

        if (index > -1) {
          currentCustomSettingsList[index] = {
            ...currentCustomSettingsList[index],
            value: customSettings.value
          }
        } else {
          currentCustomSettingsList.push(customSettings)
        }

        draft.customSettings = currentCustomSettingsList

        markedAsModified(draft)
      }

      return draft
    })
  }

  const removeCustomSettings = (state: EntityState<CustomSettingsDraft, number>, action: PayloadAction<CustomSettingsAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomSettingsDraft): CustomSettingsDraft => {
      const { customSettings } = action.payload

      if (!isUndefined(customSettings?.key)) {
        const currentState = state.entities[action.payload.id]
        const currentCustomSettingsList = currentState.customSettings ?? []

        const index = findIndex(currentCustomSettingsList, { key: customSettings.key })

        if (index > -1) {
          currentCustomSettingsList.splice(index, 1)

          draft.customSettings = currentCustomSettingsList

          markedAsModified(draft)
        }
      }

      return draft
    })
  }

  return { setCustomSettings, removeCustomSettings }
}

export interface UseCustomSettingsDraftReturn {
  customSettings?: CustomSettings
  setCustomSettings: (customSettings: UpdateCustomSettings) => void
  removeCustomSettings: (customSettings: UpdateCustomSettings) => void
}

export const useCustomSettingsDraft = ({ id, draft, setCustomSettingsAction, removeCustomSettingsAction }: {
  id: number
  draft: CustomSettingsDraft
  setCustomSettingsAction: ActionCreatorWithPayload<CustomSettingsAction>
  removeCustomSettingsAction: ActionCreatorWithPayload<CustomSettingsAction>
}): UseCustomSettingsDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    customSettings: draft?.customSettings,

    setCustomSettings: (customSettings: UpdateCustomSettings): void => {
      dispatch(setCustomSettingsAction({ id, customSettings }))
    },

    removeCustomSettings: (customSettings: UpdateCustomSettings): void => {
      dispatch(removeCustomSettingsAction({ id, customSettings }))
    }
  }
}
