/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { type RootState, injectSliceWithState } from '@sdk/app'
import { type PropertiesDraft, usePropertiesReducers } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type EntityAdapter } from '@reduxjs/toolkit/src/entities/models'
import {
  type TrackableChangesDraft,
  useTrackableChangesReducers
} from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import {
  initialTabsStateValue,
  type TabsDraft,
  useTabsReducers
} from '@Pimcore/modules/element/draft/hooks/use-tabs'
import { type SchedulesDraft, useSchedulesReducers } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { type DocumentDetailData } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { usePublishedReducers, type PublishedDraft } from '../element/draft/hooks/use-published'
import { useModifiedDocumentEditablesReducers } from './draft/hooks/use-modified-editable-data'
import { type DraftDataDraft, useDraftDataReducers } from '../element/draft/hooks/use-draft-data'
import { updateKeyOrFilename } from '../element/draft/utils/update-key'

export interface DocumentDraft extends Omit<DocumentDetailData, 'draftData'>, PropertiesDraft, SchedulesDraft, TrackableChangesDraft, TabsDraft, DraftDataDraft, PublishedDraft {
}

export const documentsAdapter: EntityAdapter<DocumentDraft, number> = createEntityAdapter<DocumentDraft>({})

export const slice = createSlice({
  name: 'document-draft',
  initialState: documentsAdapter.getInitialState({
    modified: false,
    properties: [],
    schedule: [],
    changes: {},
    modifiedCells: {},
    ...initialTabsStateValue
  }),
  reducers: {
    documentReceived: documentsAdapter.upsertOne,

    removeDocument (state, action: PayloadAction<number>): void {
      documentsAdapter.removeOne(state, action.payload)
    },

    resetDocument (state, action: PayloadAction<number>): void {
      if (state.entities[action.payload] !== undefined) {
        state.entities[action.payload] = documentsAdapter.getInitialState({ modified: false, properties: [], changes: {} }).entities[action.payload]
      }
    },

    updateKey (state, action: PayloadAction<{ id: number, key: string }>): void {
      if (state.entities[action.payload.id] !== undefined) {
        const document = state.entities[action.payload.id]
        updateKeyOrFilename(document, action.payload.key, 'key')
      }
    },

    ...useTrackableChangesReducers(documentsAdapter),
    ...usePropertiesReducers(documentsAdapter),
    ...useSchedulesReducers(documentsAdapter),
    ...useTabsReducers(documentsAdapter),
    ...useModifiedDocumentEditablesReducers(documentsAdapter),
    ...useDraftDataReducers(documentsAdapter),
    ...usePublishedReducers(documentsAdapter)
  }
})

injectSliceWithState(slice)

export const {
  documentReceived,
  removeDocument,
  resetDocument,
  updateKey,

  resetChanges,
  setModifiedCells,

  addProperty: addPropertyToDocument,
  removeProperty: removePropertyFromDocument,
  setProperties: setPropertiesForDocument,
  updateProperty: updatePropertyForDocument,

  addSchedule: addScheduleToDocument,
  removeSchedule: removeScheduleFromDocument,
  setSchedules: setSchedulesForDocument,
  updateSchedule: updateScheduleForDocument,
  resetSchedulesChanges: resetSchedulesChangesForDocument,
  setActiveTab: setActiveTabForDocument,

  markDocumentEditablesAsModified,
  setDraftData,

  publishDraft,
  unpublishDraft

} = slice.actions
export const { selectById: selectDocumentById } = documentsAdapter.getSelectors((state: RootState) => state['document-draft'])
