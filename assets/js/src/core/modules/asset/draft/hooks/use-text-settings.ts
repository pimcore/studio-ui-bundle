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
import type { TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import type { AssetGetTextDataByIdApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'

export type TextData = TextDataDraft['textData']

export interface TextDataAction {
  id: number
  textData: AssetGetTextDataByIdApiResponse['data']
}

export interface TextDataDraft extends TrackableChangesDraft {
  textData: AssetGetTextDataByIdApiResponse['data']
}

interface UseTextDataReturn {
  addTextData: (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>) => void
  updateTextData: (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>) => void
  removeTextData: (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>) => void
}

export const useTextDataReducers = (entityAdapter: EntityAdapter<TextDataDraft, number>): UseTextDataReturn => {
  const modifyDraft = (state: EntityState<TextDataDraft, number>, id: number, modification: (draft: TextDataDraft) => TextDataDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)

    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: TextDataDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      textData: true
    }
  }

  const addTextData = (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: TextDataDraft): TextDataDraft => {
      draft.textData = draft.textData ?? {}

      return draft
    })
  }

  const updateTextData = (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: TextDataDraft): TextDataDraft => {
      draft.textData = draft.textData ?? {}

      markedAsModified(draft)
      return draft
    })
  }

  const removeTextData = (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: TextDataDraft): TextDataDraft => {
      draft.textData = ''

      markedAsModified(draft)
      return draft
    })
  }

  return {
    addTextData,
    updateTextData,
    removeTextData
  }
}

export interface UseTextDataDraftReturn {
  textData?: string
  updateTextData: (textData: TextData) => void
  addTextData: (textData: TextData) => void
  removeTextData: (textData: TextData) => void
}

export const useTextDataDraft = (
  id: number,
  draft: TextDataDraft,
  updateTextDataAction: ActionCreatorWithPayload<TextDataAction>,
  addTextDataAction: ActionCreatorWithPayload<TextDataAction>,
  removeTextDataAction: ActionCreatorWithPayload<TextDataAction>
): UseTextDataDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    textData: draft?.textData,

    updateTextData: (textData: TextData): void => {
      dispatch(updateTextDataAction({ id, textData }))
    },

    addTextData: (textData: TextData): void => {
      dispatch(addTextDataAction({ id, textData }))
    },

    removeTextData: (textData: TextData): void => {
      dispatch(removeTextDataAction({ id, textData }))
    }
  }
}
