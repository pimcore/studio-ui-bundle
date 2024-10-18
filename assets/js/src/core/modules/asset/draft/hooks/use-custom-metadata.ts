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
import type {
  CustomMetadata as CustomMetadataApi
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { type TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'

export interface CustomMetadataAction {
  id: number
  customMetadata: CustomMetadata
}

export interface CustomMetadataArrayAction {
  id: number
  customMetadata: CustomMetadata[]
}

export type CustomMetadata = CustomMetadataApi & {
  rowId: string
}

export interface CustomMetadataDraft extends TrackableChangesDraft {
  customMetadata: CustomMetadata[]
}

interface UseCustomMetadataReturn {
  addCustomMetadata: (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataAction>) => void
  removeCustomMetadata: (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataAction>) => void
  updateCustomMetadata: (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataAction>) => void
  updateAllCustomMetadata: (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataArrayAction>) => void
  setCustomMetadata: (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataArrayAction>) => void
}

export const useCustomMetadataReducers = (entityAdapter: EntityAdapter<CustomMetadataDraft, number>): UseCustomMetadataReturn => {
  const addCustomMetadata = (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomMetadataDraft): CustomMetadataDraft => {
      draft.customMetadata = [...(draft.customMetadata ?? []), action.payload.customMetadata]

      markedAsModified(draft)
      return draft
    })
  }

  const updateCustomMetadata = (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomMetadataDraft): CustomMetadataDraft => {
      draft.customMetadata = (draft.customMetadata ?? []).map((customMetadata, index) => {
        if (customMetadata.name === action.payload.customMetadata.name) {
          markedAsModified(draft)

          return action.payload.customMetadata
        }

        return customMetadata
      })

      return draft
    })
  }
  const removeCustomMetadata = (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomMetadataDraft): CustomMetadataDraft => {
      draft.customMetadata = (draft.customMetadata ?? []).filter(customMetadata =>
        customMetadata.name !== action.payload.customMetadata.name ||
          customMetadata.language !== action.payload.customMetadata.language
      )

      markedAsModified(draft)
      return draft
    })
  }

  const updateAllCustomMetadata = (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataArrayAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomMetadataDraft): CustomMetadataDraft => {
      draft.customMetadata = action.payload.customMetadata
      markedAsModified(draft)
      return draft
    })
  }
  const setCustomMetadata = (state: EntityState<CustomMetadataDraft, number>, action: PayloadAction<CustomMetadataArrayAction>): void => {
    modifyDraft(state, action.payload.id, (draft: CustomMetadataDraft): CustomMetadataDraft => {
      draft.customMetadata = action.payload.customMetadata
      return draft
    })
  }

  const modifyDraft = (state: EntityState<CustomMetadataDraft, number>, id: number, modification: (draft: CustomMetadataDraft) => CustomMetadataDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: CustomMetadataDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      customMetadata: true
    }
  }

  return {
    addCustomMetadata,
    removeCustomMetadata,
    updateCustomMetadata,
    updateAllCustomMetadata,
    setCustomMetadata
  }
}

export interface UseCustomMetadataDraftReturn {
  customMetadata: undefined | CustomMetadata[]
  updateCustomMetadata: (customMetadata: CustomMetadata) => void
  addCustomMetadata: (customMetadata: CustomMetadata) => void
  removeCustomMetadata: (customMetadata: CustomMetadata) => void
  updateAllCustomMetadata: (customMetadata: CustomMetadata[]) => void
  setCustomMetadata: (customMetadata: CustomMetadata[]) => void
}

export const useCustomMetadataDraft = (
  id: number,
  draft: CustomMetadataDraft,
  updateCustomMetadataAction: ActionCreatorWithPayload<CustomMetadataAction>,
  addCustomMetadataAction: ActionCreatorWithPayload<CustomMetadataAction>,
  removeCustomMetadataAction: ActionCreatorWithPayload<CustomMetadataAction>,
  setCustomMetadataAction: ActionCreatorWithPayload<CustomMetadataArrayAction>,
  updateAllCustomMetadataAction: ActionCreatorWithPayload<CustomMetadataArrayAction>
): UseCustomMetadataDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    customMetadata: draft?.customMetadata,

    updateCustomMetadata: (customMetadata: CustomMetadata): void => {
      dispatch(updateCustomMetadataAction({ id, customMetadata }))
    },

    addCustomMetadata: (customMetadata: CustomMetadata): void => {
      dispatch(addCustomMetadataAction({ id, customMetadata }))
    },

    removeCustomMetadata: (customMetadata: CustomMetadata): void => {
      dispatch(removeCustomMetadataAction({ id, customMetadata }))
    },

    updateAllCustomMetadata: (customMetadata: CustomMetadata[]): void => {
      dispatch(updateAllCustomMetadataAction({ id, customMetadata }))
    },

    setCustomMetadata: (customMetadata: CustomMetadata[]): void => {
      dispatch(setCustomMetadataAction({ id, customMetadata }))
    }
  }
}
