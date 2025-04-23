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

import { type PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'
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
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  type ModifiedObjectDataDraft,
  useModifiedObjectDataReducers
} from '@Pimcore/modules/data-object/draft/hooks/use-modified-object-data'
import { useDraftDataReducers } from '@Pimcore/modules/data-object/draft/hooks/use-draft-data'
import { usePublishedReducers, type PublishedDraft } from '../element/draft/hooks/use-published'

export interface DataObjectDraft extends DataObject, PropertiesDraft, SchedulesDraft, TrackableChangesDraft, TabsDraft, ModifiedObjectDataDraft, PublishedDraft {
}

export const dataObjectsAdapter: EntityAdapter<DataObjectDraft, number> = createEntityAdapter<DataObjectDraft>({})

export const slice = createSlice({
  name: 'data-object-draft',
  initialState: dataObjectsAdapter.getInitialState({
    modified: false,
    properties: [],
    schedule: [],
    changes: {},
    modifiedCells: {},
    modifiedObjectData: {},
    ...initialTabsStateValue
  }),
  reducers: {
    dataObjectReceived: dataObjectsAdapter.upsertOne,

    removeDataObject (state, action: PayloadAction<number>): void {
      dataObjectsAdapter.removeOne(state, action.payload)
    },

    resetDataObject (state, action: PayloadAction<number>): void {
      if (state.entities[action.payload] !== undefined) {
        state.entities[action.payload] = dataObjectsAdapter.getInitialState({ modified: false, properties: [], changes: {} }).entities[action.payload]
      }
    },

    updateKey (state, action: PayloadAction<{ id: number, key: string }>): void {
      if (state.entities[action.payload.id] !== undefined) {
        const dataObject = state.entities[action.payload.id]

        dataObject.key = action.payload.key

        if (dataObject.fullPath !== undefined) {
          const fullPathAsArray = dataObject.fullPath?.split('/')
          fullPathAsArray[fullPathAsArray.length - 1] = action.payload.key
          dataObject.fullPath = fullPathAsArray.join('/')
        }

        if (dataObject.path !== undefined) {
          const pathAsArray = dataObject.path.split('/')
          pathAsArray[pathAsArray.length - 1] = action.payload.key
          dataObject.path = pathAsArray.join('/')
        }
      }
    },

    ...useTrackableChangesReducers(dataObjectsAdapter),
    ...usePropertiesReducers(dataObjectsAdapter),
    ...useSchedulesReducers(dataObjectsAdapter),
    ...useTabsReducers(dataObjectsAdapter),
    ...useModifiedObjectDataReducers(dataObjectsAdapter),
    ...useModifiedObjectDataReducers(dataObjectsAdapter),
    ...useDraftDataReducers(dataObjectsAdapter),
    ...usePublishedReducers(dataObjectsAdapter)
  }
})

injectSliceWithState(slice)

export const {
  dataObjectReceived,
  removeDataObject,
  resetDataObject,
  updateKey,

  resetChanges,
  setModifiedCells,

  addProperty: addPropertyToDataObject,
  removeProperty: removePropertyFromDataObject,
  setProperties: setPropertiesForDataObject,
  updateProperty: updatePropertyForDataObject,

  addSchedule: addScheduleToDataObject,
  removeSchedule: removeScheduleFromDataObject,
  setSchedules: setSchedulesForDataObject,
  updateSchedule: updateScheduleForDataObject,
  resetSchedulesChanges: resetSchedulesChangesForDataObject,
  setActiveTab: setActiveTabForDataObject,

  markObjectDataAsModified,
  setDraftData,

  publishDraft,
  unpublishDraft

} = slice.actions
export const { selectById: selectDataObjectById } = dataObjectsAdapter.getSelectors((state: RootState) => state['data-object-draft'])
