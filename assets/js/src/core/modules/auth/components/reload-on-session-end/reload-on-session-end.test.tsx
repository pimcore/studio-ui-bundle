/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

let mockIsAuthenticated: boolean | undefined
const mockIsSessionGone = jest.fn()
const mockReloadPage = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppSelector: () => mockIsAuthenticated
}))

jest.mock('../../auth-slice', () => ({
  selectIsAuthenticated: jest.fn()
}))

jest.mock('./session-end', () => ({
  isSessionGone: async () => await mockIsSessionGone(),
  reloadPage: () => mockReloadPage()
}))

// eslint-disable-next-line import/first
import React, { StrictMode } from 'react'
// eslint-disable-next-line import/first
import { act, render, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ReloadOnSessionEnd } from './reload-on-session-end'

/** Renders with the given auth states in order, as the store would report them. */
const renderWithAuthStates = async (...states: Array<boolean | undefined>): Promise<void> => {
  mockIsAuthenticated = states[0]
  const { rerender } = render(<StrictMode><ReloadOnSessionEnd /></StrictMode>)

  states.slice(1).forEach(state => {
    mockIsAuthenticated = state
    rerender(<StrictMode><ReloadOnSessionEnd /></StrictMode>)
  })

  // Let a pending session check settle before asserting.
  await act(async () => { await Promise.resolve() })
}

describe('ReloadOnSessionEnd', () => {
  beforeEach(() => {
    mockIsSessionGone.mockResolvedValue(true)
  })

  afterEach(() => {
    mockIsSessionGone.mockReset()
    mockReloadPage.mockReset()
  })

  it('reloads the page once when the session ends', async () => {
    await renderWithAuthStates(undefined, true, false, false)

    await waitFor(() => { expect(mockReloadPage).toHaveBeenCalledTimes(1) })
    expect(mockIsSessionGone).toHaveBeenCalledTimes(1)
  })

  /**
   * A plugin endpoint can answer 401 while the Studio session is still valid. Reloading on
   * that would meet the same 401 on every boot, so the page must stay as it is.
   */
  it('does not reload when the server still knows the session', async () => {
    mockIsSessionGone.mockResolvedValue(false)

    await renderWithAuthStates(undefined, true, false)

    await waitFor(() => { expect(mockIsSessionGone).toHaveBeenCalledTimes(1) })
    expect(mockReloadPage).not.toHaveBeenCalled()
  })

  it('does not reload when the initial check finds no session', async () => {
    await renderWithAuthStates(undefined, false)

    expect(mockIsSessionGone).not.toHaveBeenCalled()
    expect(mockReloadPage).not.toHaveBeenCalled()
  })

  it('does not reload when the user logs in', async () => {
    await renderWithAuthStates(undefined, false, true)

    expect(mockIsSessionGone).not.toHaveBeenCalled()
    expect(mockReloadPage).not.toHaveBeenCalled()
  })

  it('does not reload while the session lasts', async () => {
    await renderWithAuthStates(undefined, true, true)

    expect(mockIsSessionGone).not.toHaveBeenCalled()
    expect(mockReloadPage).not.toHaveBeenCalled()
  })
})
