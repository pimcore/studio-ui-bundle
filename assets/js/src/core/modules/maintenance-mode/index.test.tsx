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
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { useMainNav } from '@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav'
import { type IMainNavItem } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { MaintenanceModeIndicator } from './components/maintenance-mode-indicator'
import { MaintenanceModeProvider } from './context/maintenance-mode-context'
import './index'

const mockRegisterToSlot = jest.fn()
const mockActivateWithConfirmation = jest.fn()
const mockAllowed = { admin: true, perspective: true }

jest.mock('@Pimcore/app/depency-injection', () => {
  const { MainNavRegistry } = jest.requireActual('@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry')
  const mainNavRegistry = new MainNavRegistry()

  return {
    container: {
      get: (serviceId: string) => {
        if (serviceId === 'MainNavRegistry') {
          return mainNavRegistry
        }
        if (serviceId === 'App/ComponentRegistry/ComponentRegistry') {
          return { registerToSlot: mockRegisterToSlot }
        }
        throw new Error(`Unexpected service requested: ${serviceId}`)
      }
    }
  }
})

jest.mock('@Pimcore/modules/app/component-registry/component-registry', () => ({
  componentConfig: { leftSidebar: { slot: { name: 'leftSidebar.slot' } } }
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({ isAllowed: () => false }))
jest.mock('@Pimcore/app/store', () => ({ store: { getState: () => ({}) } }))
jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  selectCurrentUser: () => ({ isAdmin: mockAllowed.admin })
}))

jest.mock('@Pimcore/modules/perspectives/permission-checker', () => ({
  isAllowedInPerspective: (permission: string) => permission === 'system.maintenanceMode' && mockAllowed.perspective
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ id: 1 }) }))
jest.mock('@Pimcore/modules/perspectives/active-perspective-slice', () => ({ selectActivePerspective: jest.fn() }))
jest.mock('react-redux', () => ({ useSelector: () => ({ id: 'studio_default_perspective' }) }))

jest.mock('./components/maintenance-mode-indicator', () => ({
  MaintenanceModeIndicator: jest.fn()
}))

jest.mock('./hooks/use-activate-maintenance-mode', () => ({
  useActivateMaintenanceMode: () => {
    jest.requireActual<typeof React>('react').useState(false)

    return { activateWithConfirmation: mockActivateWithConfirmation }
  }
}))

// Like MainNav: hooks of its own, then the entry's hook inline and only while the nav is open
const NavHost = ({ entry, isOpen }: { entry: IMainNavItem, isOpen: boolean }): React.JSX.Element => {
  const [label] = React.useState('nav')
  const navItem = isOpen ? entry.useCustomMainNavItem!() : undefined

  return (
    <button
      onClick={ navItem?.onClick }
      type="button"
    >
      {label}
    </button>
  )
}

const findEntry = (): IMainNavItem | undefined => {
  const { result } = renderHook(() => useMainNav())
  const system = result.current.navItems.find(item => item.path === 'System')

  return system?.children?.find(item => item.path === 'System/Maintenance-Mode')
}

describe('maintenance mode module', () => {
  beforeAll(() => {
    moduleSystem.initModules()
  })

  beforeEach(() => {
    mockAllowed.admin = true
    mockAllowed.perspective = true
    mockActivateWithConfirmation.mockClear()
  })

  it('shows the System menu entry to admins without a user permission', () => {
    const entry = findEntry()

    expect(entry).toEqual(expect.objectContaining({
      label: 'navigation.maintenance-mode',
      perspectivePermission: 'system.maintenanceMode'
    }))
    expect(entry?.permission).toBeUndefined()
  })

  it('hides the entry from non-admins', () => {
    mockAllowed.admin = false

    expect(findEntry()).toBeUndefined()
  })

  it('hides the entry when the perspective does not allow it', () => {
    mockAllowed.perspective = false

    expect(findEntry()).toBeUndefined()
  })

  it('opens the activation confirm on click', () => {
    const entry = findEntry()
    const { result } = renderHook(() => entry!.useCustomMainNavItem!(), { wrapper: MaintenanceModeProvider })

    result.current.onClick()

    expect(mockActivateWithConfirmation).toHaveBeenCalledTimes(1)
  })

  it('keeps the main nav hook count when the nav opens', () => {
    const entry = findEntry()!
    const { rerender } = render(
      <NavHost
        entry={ entry }
        isOpen={ false }
      />,
      { wrapper: MaintenanceModeProvider }
    )

    rerender(
      <NavHost
        entry={ entry }
        isOpen
      />
    )
    fireEvent.click(screen.getByRole('button'))

    expect(mockActivateWithConfirmation).toHaveBeenCalledTimes(1)
  })

  it('registers the indicator in the left sidebar', () => {
    expect(mockRegisterToSlot).toHaveBeenCalledWith('leftSidebar.slot', expect.objectContaining({
      name: 'maintenanceModeIndicator',
      component: MaintenanceModeIndicator
    }))
  })
})
