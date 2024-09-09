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
import type { ImageData } from '@Pimcore/modules/asset/asset-api-slice.gen'

export interface ImageSettingsAction {
  id: number
  settings: ImageData
}

export interface ImageSettingAction {
  id: number
  setting: keyof ImageData
}

export interface UpdateImageSettingAction extends ImageSettingAction {
  value: ImageData[keyof ImageData]
}

export interface ImageSettingsDraft extends TrackableChangesDraft {
  imageSettings: ImageData
}

interface UseImageSettingsReturn {
  addImageSettings: (state: EntityState<ImageSettingsDraft, number>, action: PayloadAction<ImageSettingsAction>) => void
  removeImageSetting: (state: EntityState<ImageSettingsDraft, number>, action: PayloadAction<ImageSettingAction>) => void
  updateImageSetting: (state: EntityState<ImageSettingsDraft, number>, action: PayloadAction<UpdateImageSettingAction>) => void
}

export const useImageSettingsReducers = (entityAdapter: EntityAdapter<ImageSettingsDraft, number>): UseImageSettingsReturn => {
  const addImageSettings = (state: EntityState<ImageSettingsDraft, number>, action: PayloadAction<ImageSettingsAction>): void => {
    modifyDraft(state, action.payload.id, (draft: ImageSettingsDraft): ImageSettingsDraft => {
      draft.imageSettings = { ...draft.imageSettings, ...action.payload.settings }

      markedAsModified(draft)
      return draft
    })
  }

  const removeImageSetting = (state: EntityState<ImageSettingsDraft, number>, action: PayloadAction<ImageSettingAction>): void => {
    modifyDraft(state, action.payload.id, (draft: ImageSettingsDraft): ImageSettingsDraft => {
      const clonedImageSettings = structuredClone(draft.imageSettings)
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete clonedImageSettings[action.payload.setting]
      draft.imageSettings = { ...clonedImageSettings }

      markedAsModified(draft)
      return draft
    })
  }

  const updateImageSetting = (state: EntityState<ImageSettingsDraft, number>, action: PayloadAction<UpdateImageSettingAction>): void => {
    modifyDraft(state, action.payload.id, (draft: ImageSettingsDraft): ImageSettingsDraft => {
      draft.imageSettings[action.payload.setting] = action.payload.value

      markedAsModified(draft)
      return draft
    })
  }

  const modifyDraft = (state: EntityState<ImageSettingsDraft, number>, id: number, modification: (draft: ImageSettingsDraft) => ImageSettingsDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: ImageSettingsDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      imageSettings: true
    }
  }

  return {
    addImageSettings,
    removeImageSetting,
    updateImageSetting
  }
}

export interface UseImageSettingsDraftReturn {
  imageSettings: undefined | ImageData
  addImageSettings: (settings: ImageData) => void
  removeImageSetting: (setting: keyof ImageData) => void
  updateImageSetting: (setting: keyof ImageData, value: ImageData[keyof ImageData]) => void
}

export const useImageSettingsDraft = (
  id: number,
  draft: ImageSettingsDraft,
  addSettingsAction: ActionCreatorWithPayload<ImageSettingsAction>,
  removeSettingAction: ActionCreatorWithPayload<ImageSettingAction>,
  updateSettingAction: ActionCreatorWithPayload<UpdateImageSettingAction>
): UseImageSettingsDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    imageSettings: draft?.imageSettings,

    addImageSettings: (settings: ImageData): void => {
      dispatch(addSettingsAction({ id, settings }))
    },

    removeImageSetting: (setting: keyof ImageData): void => {
      dispatch(removeSettingAction({ id, setting }))
    },

    updateImageSetting: (setting: keyof ImageData, value: ImageData[keyof ImageData]): void => {
      dispatch(updateSettingAction({ id, setting, value }))
    }
  }
}
