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
import { useScheduleUpdateForElementByTypeAndIdMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced', () => ({
  useScheduleUpdateForElementByTypeAndIdMutation: jest.fn()
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({ useElementDraft: jest.fn() }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ success: jest.fn(), error: jest.fn() }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// The mutation's state as the hook sees it on the next render.
const mutationState = { isLoading: false, isSuccess: false, isError: false, error: undefined }
const updateSchedules = jest.fn()
let scheduleChanges: Record<string, boolean> = {}

beforeEach(() => {
  jest.clearAllMocks()
  Object.assign(mutationState, { isLoading: false, isSuccess: false, isError: false, error: undefined })
  scheduleChanges = {}
  ;(useScheduleUpdateForElementByTypeAndIdMutation as jest.Mock).mockImplementation(() => [updateSchedules, mutationState])
  ;(useElementDraft as jest.Mock).mockImplementation(() => ({
    element: { changes: scheduleChanges },
    schedules: [],
    resetSchedulesChanges: jest.fn()
  }))
})

describe('useSaveSchedules', () => {
  it('reports success right away when there are no schedule changes', async () => {
    const { result } = renderHook(() => useSaveSchedules('data-object', 7, false))

    let saved: boolean | undefined
    await act(async () => { saved = await result.current.saveSchedules() })

    expect(saved).toBe(true)
    expect(result.current.isSuccess).toBe(true)
    expect(updateSchedules).not.toHaveBeenCalled()
  })

  it('does not keep reporting the earlier success while a later request is pending', async () => {
    const { result, rerender } = renderHook(() => useSaveSchedules('data-object', 7, false))

    // a save without schedule changes: isSuccess is set without a request
    await act(async () => { await result.current.saveSchedules() })
    expect(result.current.isSuccess).toBe(true)

    // the next save changes schedules; its request is still running
    scheduleChanges = { schedules: true }
    let resolveRequest: (value: unknown) => void = () => {}
    updateSchedules.mockReturnValue(new Promise((resolve) => { resolveRequest = resolve }))
    rerender()

    let pending: Promise<boolean> | undefined
    act(() => { pending = result.current.saveSchedules() })
    Object.assign(mutationState, { isLoading: true })
    rerender()

    expect(result.current.isSuccess).toBe(false)

    await act(async () => { resolveRequest({ data: {} }) })
    await expect(pending).resolves.toBe(true)
  })

  it('resolves to false when the request fails', async () => {
    scheduleChanges = { schedules: true }
    updateSchedules.mockResolvedValue({ error: { status: 500 } })
    const { result } = renderHook(() => useSaveSchedules('data-object', 7, false))

    let saved: boolean | undefined
    await act(async () => { saved = await result.current.saveSchedules() })

    expect(saved).toBe(false)
  })
})
