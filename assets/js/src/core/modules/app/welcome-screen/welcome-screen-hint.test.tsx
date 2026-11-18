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
import { type ArgsProps } from 'antd/es/notification/interface'
import { useWelcomeScreenHint } from './welcome-screen-hint'

const open = jest.fn()
const destroy = jest.fn()
const openMainWidget = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/notification/useNotification', () => ({ useNotification: () => [{ open, destroy }] }))
jest.mock('@Pimcore/modules/widget-manager/hooks/use-widget-manager', () => ({ useWidgetManager: () => ({ openMainWidget }) }))
jest.mock('@Pimcore/modules/auth/profile/profile-container', () => ({ USERPROFILE: { component: 'user-profile', id: 'user-profile' } }))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => <button onClick={ onClick }>{children}</button>
}))

const showHint = (hasDashboards: boolean): ArgsProps => {
  const { result } = renderHook(() => useWelcomeScreenHint())
  result.current({ hasDashboards })

  return open.mock.calls[0][0]
}

describe('useWelcomeScreenHint', () => {
  beforeEach(() => {
    open.mockClear()
    destroy.mockClear()
    openMainWidget.mockClear()
  })

  it('asks the user to select a dashboard in the profile', () => {
    const hint = showHint(true)

    expect(open).toHaveBeenCalledTimes(1)
    expect(hint.message).toBe('welcome-screen.hint.title')
    expect(hint.description).toBe('welcome-screen.hint.select-dashboard')
  })

  it('tells the user that no dashboard is available', () => {
    const hint = showHint(false)

    expect(hint.message).toBe('welcome-screen.hint.title')
    expect(hint.description).toBe('welcome-screen.hint.no-dashboard')
  })

  it.each([[true], [false]])('opens the profile from its button and closes itself (dashboards available: %p)', (hasDashboards) => {
    const hint = showHint(hasDashboards)
    render(<>{hint.btn}</>)

    fireEvent.click(screen.getByRole('button', { name: 'welcome-screen.hint.open-profile' }))

    expect(openMainWidget).toHaveBeenCalledWith({ component: 'user-profile', id: 'user-profile' })
    expect(destroy).toHaveBeenCalledWith(hint.key)
  })
})
