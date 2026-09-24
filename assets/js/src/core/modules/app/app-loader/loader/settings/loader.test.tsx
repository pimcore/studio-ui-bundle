/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useSettingsLoader } from './loader'

const mockDispatch = jest.fn()
const mockTrackError = jest.fn()
let resolveFetch: (result: unknown) => void

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class ApiError extends Error {}
}))

jest.mock('@Pimcore/modules/app/settings/settings-slice', () => ({
  setSettings: (data: unknown) => ({ type: 'settings/setSettings', payload: data })
}))

jest.mock('@Pimcore/modules/app/settings/settings-slice.gen', () => ({
  api: { endpoints: { systemSettingsGet: { initiate: () => ({ type: 'settings/initiate' }) } } }
}))

describe('useSettingsLoader', () => {
  beforeEach(() => {
    mockDispatch.mockReset()
    mockTrackError.mockReset()
    mockDispatch.mockImplementation((action: { type: string }): unknown => {
      if (action.type === 'settings/initiate') {
        return new Promise((resolve) => { resolveFetch = resolve })
      }
      return action
    })
  })

  it('resolves only after the fetched settings are stored', async () => {
    const { result } = renderHook(() => useSettingsLoader())

    let loaded = false
    const loading = result.current.loadSettings().then(() => { loaded = true })

    await Promise.resolve()
    expect(loaded).toBe(false)

    resolveFetch({ data: { object_auto_save_interval: 0 }, isSuccess: true, isError: false })
    await loading

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'settings/setSettings',
      payload: { object_auto_save_interval: 0 }
    })
  })

  it('still resolves when fetching the settings fails', async () => {
    const { result } = renderHook(() => useSettingsLoader())

    const loading = result.current.loadSettings()
    resolveFetch({ data: undefined, isSuccess: false, isError: true, error: { status: 500 } })

    await expect(loading).resolves.toBeUndefined()
    expect(mockTrackError).toHaveBeenCalled()
  })
})
