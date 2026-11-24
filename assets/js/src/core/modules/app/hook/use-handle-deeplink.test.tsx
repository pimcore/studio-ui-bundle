/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter, type InitialEntry } from 'react-router-dom'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useHandleDeepLink } from './use-handle-deeplink'

const mockNavigate = jest.fn()
const mockOpenElement = jest.fn()
const mockGetHandler = jest.fn()
let mockIsRestored = true

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))
// The SDK barrel boots i18n and the store; the hook only reads these two.
jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => mockIsRestored
}))
jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  openMainWidget: jest.fn(),
  selectWidgetManagerRestored: jest.fn()
}))
jest.mock('@Pimcore/modules/auth/profile/profile-container', () => ({ USERPROFILE: { config: {} } }))
jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: mockOpenElement })
}))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ get: mockGetHandler }) }
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: jest.fn()
}))

const trackErrorMock = trackError as jest.Mock
const generalErrorMock = GeneralError as unknown as jest.Mock

const renderAt = (entry: InitialEntry): { rerender: () => void } => renderHook(() => { useHandleDeepLink() }, {
  wrapper: ({ children }) => (
    <React.StrictMode>
      <MemoryRouter initialEntries={ [entry] }>{children}</MemoryRouter>
    </React.StrictMode>
  )
})

describe('useHandleDeepLink', () => {
  beforeEach(() => {
    mockIsRestored = true
    mockNavigate.mockReset()
    mockOpenElement.mockReset().mockResolvedValue(undefined)
    mockGetHandler.mockReset()
    trackErrorMock.mockReset()
    generalErrorMock.mockReset()
  })

  it('calls the named handler only after the widget layout is restored', () => {
    const handle = jest.fn()
    mockGetHandler.mockReturnValue({ name: 'tree', handle })
    mockIsRestored = false

    const { rerender } = renderAt('/studio/?deeplink=tree&path=%2FGermany%2F')

    expect(handle).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()

    mockIsRestored = true
    rerender()

    expect(mockGetHandler).toHaveBeenCalledWith('tree')
    expect(handle).toHaveBeenCalledTimes(1)
    const params: URLSearchParams = handle.mock.calls[0][0]
    expect(params.get('deeplink')).toBe('tree')
    expect(params.get('path')).toBe('/Germany/')
  })

  it('calls the handler once and removes the query with a replace', () => {
    const handle = jest.fn()
    mockGetHandler.mockReturnValue({ name: 'tree', handle })

    const { rerender } = renderAt('/studio/?deeplink=tree#top')
    rerender()

    expect(handle).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/studio/', search: '', hash: '#top' },
      { replace: true, state: null }
    )
    expect(trackErrorMock).not.toHaveBeenCalled()
  })

  it('reports an unknown handler name and still removes the query', async () => {
    mockGetHandler.mockReturnValue(undefined)

    renderAt('/studio/?deeplink=unknown-name')

    await waitFor(() => { expect(trackErrorMock).toHaveBeenCalledTimes(1) })
    expect(generalErrorMock).toHaveBeenCalledWith('No handler is registered for this link')
    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/studio/', search: '', hash: '' },
      { replace: true, state: null }
    )
  })

  it.each([
    ['rejects', jest.fn().mockRejectedValue(new Error('failed'))],
    ['throws', jest.fn(() => { throw new Error('failed') })]
  ])('reports a handler that %s', async (_, handle) => {
    mockGetHandler.mockReturnValue({ name: 'tree', handle })

    renderAt('/studio/?deeplink=tree')

    await waitFor(() => { expect(trackErrorMock).toHaveBeenCalledTimes(1) })
    expect(generalErrorMock).toHaveBeenCalledWith('An error occurred while opening the link')
  })

  it('opens the element of an element deep link as before, without touching the address', async () => {
    renderAt({ pathname: '/studio/', state: { isDeeplink: true, id: '12', elementType: 'data-object' } })

    await waitFor(() => { expect(mockOpenElement).toHaveBeenCalledWith({ id: 12, type: 'data-object' }) })
    expect(mockGetHandler).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
