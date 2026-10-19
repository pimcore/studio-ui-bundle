/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { renderHook } from '@testing-library/react'
import {
  type TrackableChangesDraft,
  useTrackableChangesDraft,
  useTrackableChangesReducers
} from './use-trackable-changes'

const mockDispatch = jest.fn()

jest.mock('@sdk/app', () => ({ useAppDispatch: () => mockDispatch }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {}
}))

interface TestDraft extends TrackableChangesDraft {
  id: number
}

const adapter = createEntityAdapter<TestDraft>({})

const slice = createSlice({
  name: 'test-draft',
  initialState: adapter.getInitialState(),
  reducers: {
    ...useTrackableChangesReducers(adapter as unknown as Parameters<typeof useTrackableChangesReducers>[0])
  }
})

const stateWith = (draft: Partial<TestDraft>): ReturnType<typeof adapter.getInitialState> => {
  return adapter.setOne(adapter.getInitialState(), {
    id: 1,
    modified: true,
    changes: {},
    modifiedCells: {},
    ...draft
  })
}

describe('useTrackableChangesReducers', () => {
  const { resetChanges, resetChangesForTypes } = slice.actions

  it('resetChanges clears every tracked change', () => {
    const state = slice.reducer(
      stateWith({ changes: { properties: true, textData: true }, modifiedCells: { properties: [] } }),
      resetChanges(1)
    )

    expect(state.entities[1]).toMatchObject({ modified: false, changes: {}, modifiedCells: {} })
  })

  it('resetChangesForTypes only clears the given types and keeps the rest tracked', () => {
    const modifiedCells = { rowIndex: 1, columnId: 'data' }
    const state = slice.reducer(
      stateWith({
        changes: { properties: true, customMetadata: true, textData: true },
        modifiedCells: { properties: [modifiedCells], customMetadata: [modifiedCells] }
      }),
      resetChangesForTypes({ id: 1, types: ['properties', 'textData'] })
    )

    expect(state.entities[1]).toMatchObject({
      modified: true,
      changes: { customMetadata: true },
      modifiedCells: { customMetadata: [modifiedCells] }
    })
  })

  it('resetChangesForTypes marks the draft as unmodified once no change is left', () => {
    const state = slice.reducer(
      stateWith({ changes: { properties: true } }),
      resetChangesForTypes({ id: 1, types: ['properties'] })
    )

    expect(state.entities[1]).toMatchObject({ modified: false, changes: {} })
  })

  it('resetChangesForTypes keeps a change that was not part of the given types', () => {
    const state = slice.reducer(
      stateWith({ changes: { properties: true } }),
      resetChangesForTypes({ id: 1, types: [] })
    )

    expect(state.entities[1]).toMatchObject({ modified: true, changes: { properties: true } })
  })
})

describe('useTrackableChangesDraft', () => {
  const resetChangesAction = jest.fn((id: number) => ({ type: 'reset', payload: id }))
  const setModifiedCellsAction = jest.fn()
  const resetChangesForTypesAction = jest.fn((payload: { id: number, types: string[] }) => ({ type: 'reset-types', payload }))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const render = (withTypesAction: boolean): ReturnType<typeof useTrackableChangesDraft> => {
    return renderHook(() => useTrackableChangesDraft(
      1,
      resetChangesAction as never,
      setModifiedCellsAction as never,
      withTypesAction ? resetChangesForTypesAction as never : undefined
    )).result.current
  }

  it('removeTrackedChanges without types resets everything', () => {
    render(true).removeTrackedChanges()

    expect(resetChangesAction).toHaveBeenCalledWith(1)
    expect(resetChangesForTypesAction).not.toHaveBeenCalled()
  })

  it('removeTrackedChanges with types only resets these types', () => {
    render(true).removeTrackedChanges(['properties'])

    expect(resetChangesForTypesAction).toHaveBeenCalledWith({ id: 1, types: ['properties'] })
    expect(resetChangesAction).not.toHaveBeenCalled()
  })

  it('removeTrackedChanges with types falls back to a full reset when the draft has no per-type action', () => {
    render(false).removeTrackedChanges(['properties'])

    expect(resetChangesAction).toHaveBeenCalledWith(1)
  })
})
