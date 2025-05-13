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
  updateTextData: (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>) => void
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

  const updateTextData = (state: EntityState<TextDataDraft, number>, action: PayloadAction<TextDataAction>): void => {
    modifyDraft(state, action.payload.id, (draft: TextDataDraft): TextDataDraft => {
      draft.textData = action.payload.textData ?? ''

      markedAsModified(draft)

      return draft
    })
  }

  return { updateTextData }
}

export interface UseTextDataDraftReturn {
  textData?: string
  updateTextData: (textData: TextData) => void
}

export const useTextDataDraft = ({ id, draft, updateTextDataAction }: {
  id: number
  draft: TextDataDraft
  updateTextDataAction: ActionCreatorWithPayload<TextDataAction>
}): UseTextDataDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    textData: draft?.textData,

    updateTextData: (textData: TextData): void => {
      dispatch(updateTextDataAction({ id, textData }))
    }
  }
}
