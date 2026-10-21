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
import { useSaveSchedules } from './use-save-schedules'
import { useScheduleUpdateForElementByTypeAndIdMutation } from '../schedule-api-slice-enhanced'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

const mockResetSchedulesChanges = jest.fn()
const mockUpdateSchedules = jest.fn()

jest.mock('../schedule-api-slice-enhanced', () => ({ useScheduleUpdateForElementByTypeAndIdMutation: jest.fn() }))
jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({ useElementDraft: jest.fn() }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ success: jest.fn(), error: jest.fn() }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const mockMutation = (apiState: { isSuccess: boolean }): void => {
  (useScheduleUpdateForElementByTypeAndIdMutation as jest.Mock).mockReturnValue([
    mockUpdateSchedules,
    { isLoading: false, isError: false, error: undefined, ...apiState }
  ])
}

const mockElement = (schedulesChanged: boolean): void => {
  (useElementDraft as jest.Mock).mockReturnValue({
    element: { changes: schedulesChanged ? { schedules: true } : {} },
    schedules: [],
    resetSchedulesChanges: mockResetSchedulesChanges
  })
}

describe('useSaveSchedules', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('resolves to true without a request when there are no schedule changes', async () => {
    mockMutation({ isSuccess: false })
    mockElement(false)
    const { result } = renderHook(() => useSaveSchedules('asset', 1, false))

    let saved: boolean | undefined
    await act(async () => { saved = await result.current.saveSchedules() })

    expect(saved).toBe(true)
    expect(mockUpdateSchedules).not.toHaveBeenCalled()
  })

  it('resolves to whether the schedules request succeeded', async () => {
    mockMutation({ isSuccess: false })
    mockElement(true)
    const { result } = renderHook(() => useSaveSchedules('asset', 1, false))

    mockUpdateSchedules.mockResolvedValueOnce({ data: {} })
    let saved: boolean | undefined
    await act(async () => { saved = await result.current.saveSchedules() })
    expect(saved).toBe(true)

    mockUpdateSchedules.mockResolvedValueOnce({ error: { status: 500 } })
    await act(async () => { saved = await result.current.saveSchedules() })
    expect(saved).toBe(false)
  })

  it('resets the schedule changes after a schedules save that follows an empty save', async () => {
    mockMutation({ isSuccess: false })
    mockElement(false)
    const { result, rerender } = renderHook(() => useSaveSchedules('asset', 1, false))

    await act(async () => { await result.current.saveSchedules() })
    expect(result.current.isSuccess).toBe(true)
    mockResetSchedulesChanges.mockClear()

    mockElement(true)
    mockUpdateSchedules.mockResolvedValue({ data: {} })
    rerender()
    await act(async () => { await result.current.saveSchedules() })
    expect(result.current.isSuccess).toBe(false)

    mockMutation({ isSuccess: true })
    rerender()

    expect(result.current.isSuccess).toBe(true)
    expect(mockResetSchedulesChanges).toHaveBeenCalledTimes(1)
  })
})
