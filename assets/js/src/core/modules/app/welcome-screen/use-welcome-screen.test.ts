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
import { Actions, DockLocation, type IJsonModel, Model } from 'flexlayout-react'
import { type IMainNavItem } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { getInitialModelJson } from '@Pimcore/modules/widget-manager/utils/widget-manager-inner-model'
import { useWelcomeScreen } from './use-welcome-screen'
import { resetWelcomeScreen } from './welcome-screen-session'

const dispatch = jest.fn()
const state: { restored: boolean, innerModel: IJsonModel } = { restored: true, innerModel: getInitialModelJson() }
let mockUser: { welcomeScreen: boolean, welcomeScreenDashboardId?: string | null } = { welcomeScreen: true }
let mockNavItems: IMainNavItem[] = []
let mockLocationState: Record<string, unknown> | null = null

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/pimcore-studio/', search: '', hash: '', key: 'default', state: mockLocationState })
}))
// Factories, so the real store and the SDK barrel are never loaded
jest.mock('@sdk/app', () => ({
  useAppDispatch: () => dispatch,
  useAppSelector: (selector: (s: typeof state) => unknown) => selector(state)
}))
jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  openMainWidget: (payload: unknown) => ({ type: 'openMainWidget', payload }),
  selectInnerModel: (s: typeof state) => s.innerModel,
  selectWidgetManagerRestored: (s: typeof state) => s.restored
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => mockUser }))
jest.mock('@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav', () => ({ useMainNav: () => ({ navItems: mockNavItems }) }))
const showHint = jest.fn()
jest.mock('./welcome-screen-hint', () => ({ useWelcomeScreenHint: () => showHint }))

const DASHBOARD_PATH = 'Reporting/Dashboards/Sales/Overview'
const DASHBOARD_ID = '7'

const dashboardWidget = {
  component: 'dashboard-single-container',
  id: DASHBOARD_ID,
  config: { translationKey: 'Overview', dashboardId: DASHBOARD_ID, mainNavPath: DASHBOARD_PATH }
}

// the main nav tree as useMainNav returns it, already filtered for the current user
const navTree = (): IMainNavItem[] => [{
  path: 'Reporting',
  children: [
    {
      path: 'Reporting/Dashboards',
      children: [
        {
          path: 'Reporting/Dashboards/Dashboards',
          widgetConfig: { component: 'dashboard-container', id: 'dashboard-container', config: {} }
        },
        {
          path: 'Reporting/Dashboards/Sales',
          children: [{ path: DASHBOARD_PATH, label: 'Overview', widgetConfig: dashboardWidget }]
        }
      ]
    },
    {
      path: 'Reporting/Reports',
      widgetConfig: { component: 'reports', id: 'reports', config: {} }
    }
  ]
}]

// the dashboards bundle is installed, but no dashboard of the user has a menu shortcut
const navTreeWithoutDashboards = (): IMainNavItem[] => [{
  path: 'Reporting',
  children: [
    {
      path: 'Reporting/Dashboards',
      children: [{
        path: 'Reporting/Dashboards/Dashboards',
        widgetConfig: { component: 'dashboard-container', id: 'dashboard-container', config: {} }
      }]
    },
    {
      path: 'Reporting/Reports',
      widgetConfig: { component: 'reports', id: 'reports', config: {} }
    }
  ]
}]

const layoutWithTab = (): IJsonModel => {
  const model = Model.fromJson(getInitialModelJson())
  model.doAction(Actions.addNode({ type: 'tab', id: 'restored', component: 'element' }, 'main_tabset', DockLocation.CENTER, -1, true))
  return model.toJson()
}

describe('useWelcomeScreen', () => {
  beforeEach(() => {
    dispatch.mockClear()
    showHint.mockClear()
    state.restored = true
    state.innerModel = getInitialModelJson()
    mockUser = { welcomeScreen: true, welcomeScreenDashboardId: DASHBOARD_ID }
    mockNavItems = navTree()
    mockLocationState = null
    sessionStorage.clear()
  })

  it('opens the chosen dashboard when no tabs were restored', () => {
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({ type: 'openMainWidget', payload: dashboardWidget })
    expect(showHint).not.toHaveBeenCalled()
  })

  it('waits until the previous layout is restored', () => {
    state.restored = false
    const { rerender } = renderHook(() => { useWelcomeScreen() })
    expect(dispatch).not.toHaveBeenCalled()

    state.restored = true
    rerender()

    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('opens the chosen dashboard in front of the tabs restored from the previous session', () => {
    state.innerModel = layoutWithTab()
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledWith({ type: 'openMainWidget', payload: dashboardWidget })
  })

  it('opens it once per browser tab, not again after a reload', () => {
    renderHook(() => { useWelcomeScreen() }).unmount()
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('opens it again on the first load after a logout', () => {
    renderHook(() => { useWelcomeScreen() }).unmount()
    resetWelcomeScreen()
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['a dashboard is chosen', DASHBOARD_ID],
    ['nothing is chosen', null]
  ])('opens nothing and shows no hint when the switch is off and %s', (_, welcomeScreenDashboardId) => {
    mockUser = { welcomeScreen: false, welcomeScreenDashboardId }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it('waits for the next login when the switch is turned on during the session', () => {
    mockUser = { welcomeScreen: false, welcomeScreenDashboardId: DASHBOARD_ID }
    renderHook(() => { useWelcomeScreen() }).unmount()

    mockUser = { welcomeScreen: true, welcomeScreenDashboardId: DASHBOARD_ID }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it('opens nothing and shows no hint when the backend does not return the field', () => {
    mockUser = { welcomeScreen: true }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
    expect(showHint).not.toHaveBeenCalled()
  })

  it.each([
    ['nothing is chosen', null],
    ['nothing is chosen in the form', ''],
    ['the dashboard is not in the navigation of the user', '99'],
    ['the entry is not a dashboard', 'reports'],
    ['the entry is the dashboards overview', 'dashboard-container'],
    ['a navigation path is stored instead of an ID', DASHBOARD_PATH]
  ])('opens nothing and asks the user to select a dashboard when %s', (_, welcomeScreenDashboardId) => {
    mockUser = { welcomeScreen: true, welcomeScreenDashboardId }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
    expect(showHint).toHaveBeenCalledTimes(1)
    expect(showHint).toHaveBeenCalledWith({ hasDashboards: true })
  })

  it.each([
    ['nothing is chosen', null],
    ['a dashboard is chosen', DASHBOARD_ID]
  ])('tells the user that no dashboard is available when the navigation has none and %s', (_, welcomeScreenDashboardId) => {
    mockUser = { welcomeScreen: true, welcomeScreenDashboardId }
    mockNavItems = navTreeWithoutDashboards()
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
    expect(showHint).toHaveBeenCalledTimes(1)
    expect(showHint).toHaveBeenCalledWith({ hasDashboards: false })
  })

  it('shows the hint once per browser tab, not again after a reload', () => {
    mockUser = { welcomeScreen: true, welcomeScreenDashboardId: null }
    renderHook(() => { useWelcomeScreen() }).unmount()
    renderHook(() => { useWelcomeScreen() })

    expect(showHint).toHaveBeenCalledTimes(1)
  })

  // the route state DeepLink and PasswordReset navigate to the root route with
  it.each([
    ['an element link', { isDeeplink: true, id: '12', elementType: 'asset' }],
    ['the reset-password link', { resetPassword: true }]
  ])('opens nothing after a login through %s', (_, locationState) => {
    mockLocationState = locationState
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
  })

  it.each([
    ['an element link', { isDeeplink: true, id: '12', elementType: 'asset' }],
    ['the reset-password link', { resetPassword: true }]
  ])('shows no hint after a login through %s', (_, locationState) => {
    mockLocationState = locationState
    mockUser = { welcomeScreen: true, welcomeScreenDashboardId: null }
    renderHook(() => { useWelcomeScreen() })

    expect(showHint).not.toHaveBeenCalled()
  })

  it('opens the chosen dashboard when the route state names no link', () => {
    mockLocationState = { isDeeplink: false, resetPassword: false }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
