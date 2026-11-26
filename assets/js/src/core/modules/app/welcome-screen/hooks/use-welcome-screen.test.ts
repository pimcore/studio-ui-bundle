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
import { useWelcomeScreen } from './use-welcome-screen'

const state = { restored: true }
let mockUser: { id: number, welcomeScreen: boolean, welcomeScreenTarget: string | null }
let mockLocationState: Record<string, unknown> | null = null
let mockLocationSearch = ''
const open = jest.fn((_target: string) => true)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/pimcore-studio/', search: mockLocationSearch, hash: '', key: 'default', state: mockLocationState })
}))
// Factories, so the real store, container and SDK barrel are never loaded
jest.mock('@sdk/app', () => ({ useAppSelector: (selector: (s: typeof state) => unknown) => selector(state) }))
jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  selectWidgetManagerRestored: (s: typeof state) => s.restored
}))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ open: (target: string) => open(target) }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: { 'WelcomeScreen/Registry': 'WelcomeScreen/Registry' } }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => mockUser }))

const TARGET = 'studio-dashboards:0196a7c2_1b2d_7c3e_9f40_5a6b7c8d9e0f'

describe('useWelcomeScreen', () => {
  beforeEach(() => {
    open.mockClear()
    state.restored = true
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenTarget: TARGET }
    mockLocationState = null
    mockLocationSearch = ''
    sessionStorage.clear()
  })

  it('opens the chosen target through the registry', () => {
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(1)
    expect(open).toHaveBeenCalledWith(TARGET)
  })

  it('waits until the previous layout is restored, so the target opens in front of the restored tabs', () => {
    state.restored = false
    const { rerender } = renderHook(() => { useWelcomeScreen() })
    expect(open).not.toHaveBeenCalled()

    state.restored = true
    rerender()

    expect(open).toHaveBeenCalledTimes(1)
  })

  it('opens it once per browser tab, not again after a reload', () => {
    renderHook(() => { useWelcomeScreen() }).unmount()
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(1)
  })

  it('opens it for another user who logs in in the same browser tab without a logout', () => {
    renderHook(() => { useWelcomeScreen() }).unmount()

    mockUser = { id: 8, welcomeScreen: true, welcomeScreenTarget: TARGET }
    renderHook(() => { useWelcomeScreen() }).unmount()
    expect(open).toHaveBeenCalledTimes(2)

    renderHook(() => { useWelcomeScreen() })
    expect(open).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['the switch is off', { welcomeScreen: false }],
    ['nothing is chosen', { welcomeScreenTarget: null }],
    ['the choice was cleared', { welcomeScreenTarget: '' }],
    ['the login came through an element link', {}, { isDeeplink: true, id: '12', elementType: 'asset' }],
    ['the login came through the reset-password link', {}, { resetPassword: true }]
  ])('opens nothing when %s', (_, user: Partial<typeof mockUser>, locationState: Record<string, unknown> | null = null) => {
    mockUser = { ...mockUser, ...user }
    mockLocationState = locationState
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
  })

  it('opens the chosen target when the route state names no link', () => {
    mockLocationState = { isDeeplink: false, resetPassword: false }
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(1)
  })

  it('opens nothing when the address is a named deep link', () => {
    mockLocationSearch = '?deeplink=alternative-element-tree&path=%2FA%2F'
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
  })

  it('opens the chosen target when the query names no deep link', () => {
    mockLocationSearch = '?path=%2FA%2F'
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(1)
  })
})
