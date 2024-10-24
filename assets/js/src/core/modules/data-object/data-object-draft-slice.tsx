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
import { type SchedulesDraft, useSchedulesReducers } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

export interface DataObjectDraft extends DataObject, PropertiesDraft, SchedulesDraft, TrackableChangesDraft {
}

export const dataObjectsAdapter: EntityAdapter<DataObjectDraft, number> = createEntityAdapter<DataObjectDraft>({})

export const slice = createSlice({
  name: 'data-object-draft',
  initialState: dataObjectsAdapter.getInitialState({
    modified: false,
    properties: [],
    schedule: [],
    changes: {},
    modifiedCells: {}
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
    ...useTrackableChangesReducers(dataObjectsAdapter),
    ...usePropertiesReducers(dataObjectsAdapter),
    ...useSchedulesReducers(dataObjectsAdapter)
  }
})

injectSliceWithState(slice)

export const {
  dataObjectReceived,
  removeDataObject,
  resetDataObject,

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
  resetSchedulesChanges: resetSchedulesChangesForDataObject

} = slice.actions
export const { selectById: selectDataObjectById } = dataObjectsAdapter.getSelectors((state: RootState) => state['data-object-draft'])
