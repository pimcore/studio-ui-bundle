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

const dispatch = jest.fn()
const state: { restored: boolean, innerModel: IJsonModel } = { restored: true, innerModel: getInitialModelJson() }
let mockUser: { welcomeScreen: boolean, welcomeScreenPath?: string | null } = { welcomeScreen: true }
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

const DASHBOARD_PATH = 'Reporting/Dashboards/Sales/Overview'

const dashboardWidget = {
  component: 'dashboard-single-container',
  id: '7',
  config: { translationKey: 'Overview', dashboardId: '7', mainNavPath: DASHBOARD_PATH }
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

const layoutWithTab = (): IJsonModel => {
  const model = Model.fromJson(getInitialModelJson())
  model.doAction(Actions.addNode({ type: 'tab', id: 'restored', component: 'element' }, 'main_tabset', DockLocation.CENTER, -1, true))
  return model.toJson()
}

describe('useWelcomeScreen', () => {
  beforeEach(() => {
    dispatch.mockClear()
    state.restored = true
    state.innerModel = getInitialModelJson()
    mockUser = { welcomeScreen: true, welcomeScreenPath: DASHBOARD_PATH }
    mockNavItems = navTree()
    mockLocationState = null
  })

  it('opens the chosen dashboard when no tabs were restored', () => {
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({ type: 'openMainWidget', payload: dashboardWidget })
  })

  it('waits until the previous layout is restored', () => {
    state.restored = false
    const { rerender } = renderHook(() => { useWelcomeScreen() })
    expect(dispatch).not.toHaveBeenCalled()

    state.restored = true
    rerender()

    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('opens nothing when tabs were restored', () => {
    state.innerModel = layoutWithTab()
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
  })

  it('opens nothing when the switch is off', () => {
    mockUser = { welcomeScreen: false, welcomeScreenPath: DASHBOARD_PATH }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
  })

  it.each([
    ['nothing is chosen', null],
    ['the backend does not return the field', undefined],
    ['the dashboard is not in the navigation of the user', 'Reporting/Dashboards/Sales/Removed'],
    ['the entry is not a dashboard', 'Reporting/Reports'],
    ['the entry is the dashboards overview', 'Reporting/Dashboards/Dashboards']
  ])('opens nothing when %s', (_, welcomeScreenPath) => {
    mockUser = { welcomeScreen: true, welcomeScreenPath }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).not.toHaveBeenCalled()
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

  it('opens the chosen dashboard when the route state names no link', () => {
    mockLocationState = { isDeeplink: false, resetPassword: false }
    renderHook(() => { useWelcomeScreen() })

    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
