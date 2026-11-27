/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { createContext } from 'react'
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import { useDataObjectEditorSave } from './use-data-object-editor-save'

let mockSaveSucceeds = true
let mockSchedulesSaveSucceeds = true
const mockResetFields = jest.fn()
const mockResetChanges = jest.fn()
const mockSuccessMessage = jest.fn(async () => {})
const mockTrackError = jest.fn()
const mockFields = { name: { en: 'Updated product' }, price: 12 }
const mockObjectState = { isLoading: false, isSuccess: false, isError: false, error: undefined as unknown }
const mockScheduleState = { isLoading: false, isSuccess: false, isError: false, error: undefined as unknown }
const mockSaveObject = jest.fn(async (_fields: unknown, _task: unknown, onFinish?: (fields: unknown) => void) => {
  await Promise.resolve()
  if (mockSaveSucceeds) onFinish?.(_fields)
})
const mockSaveSchedules = jest.fn(async () => mockSchedulesSaveSucceeds)
const mockWorkflowSave = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ success: mockSuccessMessage }) }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (failure: unknown) => mockTrackError(failure),
  ApiError: class ApiError {
    error: unknown
    constructor (failure: unknown) { this.error = failure }
  }
}))
jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: createContext({ id: 5 })
}))
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { changes: { objectData: true } }, removeTrackedChanges: mockResetChanges })
}))
jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: { Save: 'save', Version: 'version', Publish: 'publish' },
  useSave: () => ({ save: mockSaveObject, ...mockObjectState })
}))
jest.mock('../../types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context', () => ({
  useSaveContext: () => ({ isAutoSaveLoading: false, runningTask: 'save', runningTaskRef: { current: 'save' } })
}))
jest.mock('../../types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContext: () => ({ getModifiedDataObjectAttributes: () => mockFields, resetModifiedDataObjectAttributes: mockResetFields })
}))
jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules', () => ({
  useSaveSchedules: () => ({ saveSchedules: mockSaveSchedules, ...mockScheduleState })
}))

jest.mock('./use-workflow-save', () => ({
  getWorkflowSaveTask: () => SaveTaskType.Save,
  useWorkflowSave: (props: unknown) => mockWorkflowSave(props)
}))

describe('useDataObjectEditorSave', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSaveSucceeds = true
    mockSchedulesSaveSucceeds = true
    Object.assign(mockObjectState, { isLoading: false, isSuccess: false, isError: false, error: undefined })
    Object.assign(mockScheduleState, { isLoading: false, isSuccess: false, isError: false, error: undefined })
  })

  it('sends current modified editor fields through the native save hook and saves schedules', async () => {
    const onFinish = jest.fn()
    const { result } = renderHook(() => useDataObjectEditorSave())
    await act(async () => { await result.current.save(SaveTaskType.Save, onFinish) })
    expect(mockSaveObject).toHaveBeenCalledWith(mockFields, 'save', expect.any(Function))
    expect(mockSaveSchedules).toHaveBeenCalledTimes(1)
    expect(mockResetFields).toHaveBeenCalledWith(mockFields)
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(result.current.savedTask).toBe(SaveTaskType.Save)
  })

  it('retains modified fields and does not complete publishing after an unsuccessful save', async () => {
    mockSaveSucceeds = false
    const onFinish = jest.fn()
    const { result } = renderHook(() => useDataObjectEditorSave())
    await act(async () => { await result.current.save(SaveTaskType.Publish, onFinish) })
    expect(mockResetFields).not.toHaveBeenCalled()
    expect(mockResetChanges).not.toHaveBeenCalled()
    expect(mockSuccessMessage).not.toHaveBeenCalled()
    expect(onFinish).not.toHaveBeenCalled()
  })

  it('clears tracked changes only after the object and schedules are saved successfully', () => {
    mockObjectState.isSuccess = true
    const { rerender } = renderHook(() => useDataObjectEditorSave())
    expect(mockResetChanges).not.toHaveBeenCalled()
    mockScheduleState.isSuccess = true
    rerender()
    expect(mockResetChanges).toHaveBeenCalledTimes(1)
    expect(mockSuccessMessage).toHaveBeenCalledWith('save-success')
  })

  it('reports schedule errors without announcing a successful save', () => {
    mockObjectState.isSuccess = true
    mockScheduleState.isError = true
    mockScheduleState.error = { status: 422 }
    renderHook(() => useDataObjectEditorSave())
    expect(mockTrackError).toHaveBeenCalledWith(expect.objectContaining({ error: mockScheduleState.error }))
    expect(mockResetChanges).not.toHaveBeenCalled()
    expect(mockSuccessMessage).not.toHaveBeenCalled()
  })

  it('includes schedule persistence in the loading state', () => {
    mockScheduleState.isLoading = true
    const { result } = renderHook(() => useDataObjectEditorSave())
    expect(result.current.isLoading).toBe(true)
  })

  it('does not show a save confirmation when schedule persistence fails', async () => {
    mockSchedulesSaveSucceeds = false
    const { result } = renderHook(() => useDataObjectEditorSave())
    await act(async () => { await result.current.save(SaveTaskType.Save) })
    expect(result.current.savedTask).toBeNull()
  })

  it('registers the same data and schedules save flow for workflow transitions', async () => {
    renderHook(() => useDataObjectEditorSave())
    const registration = mockWorkflowSave.mock.calls[0][0] as {
      getTask: () => SaveTaskType
      startSave: (task: SaveTaskType, onFinish: () => void) => Promise<boolean>
    }
    const onFinish = jest.fn()
    expect(registration.getTask()).toBe(SaveTaskType.Save)
    await act(async () => {
      expect(await registration.startSave(SaveTaskType.Publish, onFinish)).toBe(true)
    })
    expect(mockSaveObject).toHaveBeenCalledWith(mockFields, SaveTaskType.Publish, expect.any(Function))
    expect(mockSaveSchedules).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})
