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
import { resetWelcomeScreen } from './welcome-screen-session'

const state = { restored: true }
let mockUser: { id: number, welcomeScreen: boolean, welcomeScreenDashboardId?: string | null } = { id: 7, welcomeScreen: true }
let mockLocationState: Record<string, unknown> | null = null
let mockOptions: Array<{ id: string, label: string }> = []
const open = jest.fn((id: string) => mockOptions.some((option) => option.id === id))
const showHint = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/pimcore-studio/', search: '', hash: '', key: 'default', state: mockLocationState })
}))
// Factories, so the real store, container and SDK barrel are never loaded
jest.mock('@sdk/app', () => ({ useAppSelector: (selector: (s: typeof state) => unknown) => selector(state) }))
jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  selectWidgetManagerRestored: (s: typeof state) => s.restored
}))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ open: (id: string) => open(id), getOptions: () => mockOptions }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: { 'WelcomeScreen/Registry': 'WelcomeScreen/Registry' } }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => mockUser }))
jest.mock('./welcome-screen-hint', () => ({ useWelcomeScreenHint: () => showHint }))

const DASHBOARD_ID = '0196a7c2_1b2d_7c3e_9f40_5a6b7c8d9e0f'

describe('useWelcomeScreen', () => {
  beforeEach(() => {
    open.mockClear()
    showHint.mockClear()
    state.restored = true
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId: DASHBOARD_ID }
    mockOptions = [{ id: DASHBOARD_ID, label: 'Overview' }]
    mockLocationState = null
    sessionStorage.clear()
  })

  it('opens the chosen dashboard through the registry', () => {
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(1)
    expect(open).toHaveBeenCalledWith(DASHBOARD_ID)
    expect(showHint).not.toHaveBeenCalled()
  })

  it('waits until the previous layout is restored, so the dashboard opens in front of the restored tabs', () => {
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

  it('opens it again on the first load after a logout', () => {
    renderHook(() => { useWelcomeScreen() }).unmount()
    resetWelcomeScreen()
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(2)
  })

  it('opens it for another user who logs in in the same browser tab without a logout', () => {
    renderHook(() => { useWelcomeScreen() }).unmount()

    mockUser = { id: 8, welcomeScreen: true, welcomeScreenDashboardId: DASHBOARD_ID }
    renderHook(() => { useWelcomeScreen() }).unmount()
    expect(open).toHaveBeenCalledTimes(2)

    renderHook(() => { useWelcomeScreen() })
    expect(open).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['a dashboard is chosen', DASHBOARD_ID],
    ['nothing is chosen', null]
  ])('opens nothing and shows no hint when the switch is off and %s', (_, welcomeScreenDashboardId) => {
    mockUser = { id: 7, welcomeScreen: false, welcomeScreenDashboardId }
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it('waits for the next login when the switch is turned on during the session', () => {
    mockUser = { id: 7, welcomeScreen: false, welcomeScreenDashboardId: DASHBOARD_ID }
    renderHook(() => { useWelcomeScreen() }).unmount()

    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId: DASHBOARD_ID }
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it('opens nothing and shows no hint when the backend does not return the field', () => {
    mockUser = { id: 7, welcomeScreen: true }
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it.each([
    ['nothing is chosen', null],
    ['nothing is chosen in the form', ''],
    ['no provider can open the stored dashboard', '0196a7c2_0000_7000_8000_000000000000']
  ])('asks the user to select a dashboard when %s', (_, welcomeScreenDashboardId) => {
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId }
    renderHook(() => { useWelcomeScreen() })

    expect(showHint).toHaveBeenCalledTimes(1)
    expect(showHint).toHaveBeenCalledWith({ hasDashboards: true })
  })

  it('does not ask the registry to open an empty choice', () => {
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId: '' }
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
  })

  it.each([
    ['nothing is chosen', null],
    ['a dashboard is chosen', DASHBOARD_ID]
  ])('tells the user that no dashboard is available when no provider offers one and %s', (_, welcomeScreenDashboardId) => {
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId }
    mockOptions = []
    renderHook(() => { useWelcomeScreen() })

    expect(showHint).toHaveBeenCalledTimes(1)
    expect(showHint).toHaveBeenCalledWith({ hasDashboards: false })
  })

  it('shows the hint once per browser tab, not again after a reload', () => {
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId: null }
    renderHook(() => { useWelcomeScreen() }).unmount()
    renderHook(() => { useWelcomeScreen() })

    expect(showHint).toHaveBeenCalledTimes(1)
  })

  // the route state DeepLink and PasswordReset navigate to the root route with
  it.each([
    ['an element link', { isDeeplink: true, id: '12', elementType: 'asset' }, DASHBOARD_ID],
    ['the reset-password link', { resetPassword: true }, DASHBOARD_ID],
    ['an element link and nothing chosen', { isDeeplink: true, id: '12', elementType: 'asset' }, null]
  ])('opens nothing and shows no hint after a login through %s', (_, locationState, welcomeScreenDashboardId) => {
    mockLocationState = locationState
    mockUser = { id: 7, welcomeScreen: true, welcomeScreenDashboardId }
    renderHook(() => { useWelcomeScreen() })

    expect(open).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it('opens the chosen dashboard when the route state names no link', () => {
    mockLocationState = { isDeeplink: false, resetPassword: false }
    renderHook(() => { useWelcomeScreen() })

    expect(open).toHaveBeenCalledTimes(1)
  })
})
