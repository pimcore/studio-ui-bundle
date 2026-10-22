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
import { useOpenInNewWindow } from './use-open-in-new-window'

const initiate = jest.fn()
const dispatch = jest.fn()
const trackError = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => dispatch
}))

jest.mock('@Pimcore/modules/document/document-api-slice.gen', () => ({
  api: { endpoints: { documentGetById: { initiate: (...args: unknown[]) => initiate(...args) } } }
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (...args: unknown[]) => trackError(...args),
  ApiError: jest.fn()
}))

jest.mock('@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission', () => ({
  useTreePermission: () => ({ isTreeActionAllowed: () => true })
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: jest.fn(() => null)
}))

jest.mock('@Pimcore/modules/element/actions', () => ({
  ContextMenuActionName: { openInNewWindow: 'openInNewWindow' }
}))

interface DocumentResponse {
  fullPath?: string
  settingsData?: Record<string, unknown>
}

// Emulates the RTK Query cache: without forceRefetch the first response is served again
const mockDocumentEndpoint = (responses: DocumentResponse[]): void => {
  let cached: DocumentResponse | undefined
  let requestCount = 0

  initiate.mockImplementation((_arg: unknown, options?: { forceRefetch?: boolean }) => {
    if (cached === undefined || options?.forceRefetch === true) {
      cached = responses[Math.min(requestCount, responses.length - 1)]
      requestCount++
    }

    return { data: cached }
  })
  dispatch.mockImplementation(async (action: unknown) => await Promise.resolve(action))
}

describe('useOpenInNewWindow', () => {
  let windowOpen: jest.SpyInstance

  beforeEach(() => {
    jest.clearAllMocks()
    windowOpen = jest.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    windowOpen.mockRestore()
  })

  it('requests a fresh document without keeping a cache subscription', async () => {
    mockDocumentEndpoint([{ settingsData: { url: 'https://old.example.com/' } }])
    const { result } = renderHook(() => useOpenInNewWindow())

    await act(async () => {
      await result.current.openInNewWindow(7)
    })

    expect(initiate).toHaveBeenCalledWith({ id: 7 }, { forceRefetch: true, subscribe: false })
  })

  it('opens the current settingsData.url after the main domain changed', async () => {
    mockDocumentEndpoint([
      { settingsData: { url: 'https://old.example.com/' } },
      { settingsData: { url: 'https://new.example.com/' } }
    ])
    const onFinish = jest.fn()
    const { result } = renderHook(() => useOpenInNewWindow())

    await act(async () => {
      await result.current.openInNewWindow(7)
    })
    await act(async () => {
      await result.current.openInNewWindow(7, onFinish)
    })

    expect(windowOpen).toHaveBeenNthCalledWith(1, 'https://old.example.com/')
    expect(windowOpen).toHaveBeenNthCalledWith(2, 'https://new.example.com/')
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('falls back to fullPath when settingsData has no url', async () => {
    mockDocumentEndpoint([{ fullPath: '/en/home', settingsData: {} }])
    const onFinish = jest.fn()
    const { result } = renderHook(() => useOpenInNewWindow())

    await act(async () => {
      await result.current.openInNewWindow(7, onFinish)
    })

    expect(windowOpen).toHaveBeenCalledWith('/en/home')
    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})
