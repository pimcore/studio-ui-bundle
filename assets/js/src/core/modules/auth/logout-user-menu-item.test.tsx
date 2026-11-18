/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook, waitFor } from '@testing-library/react'
import { isWelcomeScreenHandled, markWelcomeScreenHandled } from '@Pimcore/modules/app/welcome-screen/welcome-screen-session'
import { logoutUserMenuItemProvider } from './logout-user-menu-item'

const mockLogout = jest.fn()
const reload = jest.fn()

jest.mock('./authorization-api-slice.gen', () => ({ useLogoutMutation: () => [mockLogout] }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({ __esModule: true, default: jest.fn(), ApiError: class ApiError extends Error {} }))

const clickLogout = (): void => {
  const { result } = renderHook(() => logoutUserMenuItemProvider.useMenuItem({}))
  const item = result.current as unknown as { onClick: () => void }
  item.onClick()
}

describe('logoutUserMenuItemProvider', () => {
  beforeEach(() => {
    sessionStorage.clear()
    reload.mockClear()
    Object.defineProperty(window, 'location', { configurable: true, value: { ...window.location, reload } })
  })

  it('lets the welcome screen open again on the next login', async () => {
    mockLogout.mockResolvedValue({})
    markWelcomeScreenHandled(7)

    clickLogout()

    await waitFor(() => { expect(reload).toHaveBeenCalled() })
    expect(isWelcomeScreenHandled(7)).toBe(false)
  })

  it('keeps the welcome screen handled when the logout fails', async () => {
    mockLogout.mockRejectedValue(new Error('offline'))
    markWelcomeScreenHandled(7)

    clickLogout()

    await waitFor(() => { expect(mockLogout).toHaveBeenCalled() })
    expect(reload).not.toHaveBeenCalled()
    expect(isWelcomeScreenHandled(7)).toBe(true)
  })
})
