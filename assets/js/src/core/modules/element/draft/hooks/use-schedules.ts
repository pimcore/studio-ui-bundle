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
import { type Schedule as ApiSchedule } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced'

import { useAppDispatch } from '@Pimcore/app/store'
import { type TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface ScheduleAction {
  id: number
  schedule: Schedule
}

export interface SchedulesAction {
  id: number
  schedules: Schedule[]
}

export type Schedule = ApiSchedule & {
  archived: boolean
}

export interface SchedulesDraft extends TrackableChangesDraft {
  schedules: Schedule[]
}

interface UseSchedulesReturn {
  addSchedule: (state: EntityState<SchedulesDraft, number>, action: PayloadAction<ScheduleAction>) => void
  removeSchedule: (state: EntityState<SchedulesDraft, number>, action: PayloadAction<ScheduleAction>) => void
  updateSchedule: (state: EntityState<SchedulesDraft, number>, action: PayloadAction<ScheduleAction>) => void
  setSchedules: (state: EntityState<SchedulesDraft, number>, action: PayloadAction<SchedulesAction>) => void
  resetSchedulesChanges: (state: EntityState<SchedulesDraft, number>, action: PayloadAction<number>) => void
}

export const useSchedulesReducers = (entityAdapter: EntityAdapter<SchedulesDraft, number>): UseSchedulesReturn => {
  const addSchedule = (state: EntityState<SchedulesDraft, number>, action: PayloadAction<ScheduleAction>): void => {
    modifyDraft(state, action.payload.id, (draft: SchedulesDraft): SchedulesDraft => {
      draft.schedules = [...(draft.schedules ?? []), action.payload.schedule]

      markedAsModified(draft)
      return draft
    })
  }

  const updateSchedule = (state: EntityState<SchedulesDraft, number>, action: PayloadAction<ScheduleAction>): void => {
    modifyDraft(state, action.payload.id, (draft: SchedulesDraft): SchedulesDraft => {
      draft.schedules = (draft.schedules ?? []).map((schedule, index) => {
        if (schedule.id === action.payload.schedule.id) {
          markedAsModified(draft)

          return action.payload.schedule
        }

        return schedule
      })

      return draft
    })
  }
  const removeSchedule = (state: EntityState<SchedulesDraft, number>, action: PayloadAction<ScheduleAction>): void => {
    modifyDraft(state, action.payload.id, (draft: SchedulesDraft): SchedulesDraft => {
      draft.schedules = (draft.schedules ?? []).filter(schedule => schedule.id !== action.payload.schedule.id)

      markedAsModified(draft)
      return draft
    })
  }

  const setSchedules = (state: EntityState<SchedulesDraft, number>, action: PayloadAction<SchedulesAction>): void => {
    modifyDraft(state, action.payload.id, (draft: SchedulesDraft): SchedulesDraft => {
      draft.schedules = action.payload.schedules
      return draft
    })
  }

  const resetSchedulesChanges = (state: EntityState<SchedulesDraft, number>, action: PayloadAction<number>): void => {
    modifyDraft(state, action.payload, (draft: SchedulesDraft): SchedulesDraft => {
      if (draft.changes.schedules === undefined) {
        return draft
      }
      const { schedules, ...changesWithoutSchedules } = draft.changes
      draft.changes = changesWithoutSchedules
      draft.modified = Object.keys(draft.changes).length > 0
      return draft
    })
  }

  const modifyDraft = (state: EntityState<SchedulesDraft, number>, id: number, modification: (draft: SchedulesDraft) => SchedulesDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      trackError(new GeneralError(`Item with id ${id} not found`))
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: SchedulesDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      schedules: true
    }
  }

  return {
    addSchedule,
    removeSchedule,
    updateSchedule,
    setSchedules,
    resetSchedulesChanges
  }
}

export interface UseSchedulesDraftReturn {
  schedules: undefined | Schedule[]
  updateSchedule: (schedule: Schedule) => void
  addSchedule: (schedule: Schedule) => void
  removeSchedule: (schedule: Schedule) => void
  setSchedules: (schedules: Schedule[]) => void
  resetSchedulesChanges: () => void
}

export const useSchedulesDraft = (
  id: number,
  draft: SchedulesDraft,
  updateScheduleAction: ActionCreatorWithPayload<ScheduleAction>,
  addScheduleAction: ActionCreatorWithPayload<ScheduleAction>,
  removeScheduleAction: ActionCreatorWithPayload<ScheduleAction>,
  setSchedulesAction: ActionCreatorWithPayload<SchedulesAction>,
  resetSchedulesChangesAction: ActionCreatorWithPayload<number>
): UseSchedulesDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    schedules: draft?.schedules,

    updateSchedule: (schedule: Schedule): void => {
      dispatch(updateScheduleAction({ id, schedule }))
    },

    addSchedule: (schedule: Schedule): void => {
      dispatch(addScheduleAction({ id, schedule }))
    },

    removeSchedule: (schedule: Schedule): void => {
      dispatch(removeScheduleAction({ id, schedule }))
    },

    setSchedules: (schedules: Schedule[]): void => {
      dispatch(setSchedulesAction({ id, schedules }))
    },

    resetSchedulesChanges: (): void => {
      dispatch(resetSchedulesChangesAction(id))
    }
  }
}
