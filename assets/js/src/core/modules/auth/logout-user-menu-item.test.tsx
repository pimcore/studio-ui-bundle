/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockLogout = jest.fn()
const mockCheckLogout = jest.fn()

jest.mock('./authorization-api-slice.gen', () => ({
  useLogoutMutation: () => [mockLogout]
}))
jest.mock('@Pimcore/modules/maintenance-mode/hooks/use-logout-check', () => ({
  useLogoutCheck: () => mockCheckLogout
}))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn()
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { logoutUserMenuItemProvider } from './logout-user-menu-item'

describe('logoutUserMenuItemProvider', () => {
  beforeEach(() => {
    mockLogout.mockReset()
    mockLogout.mockReturnValue(new Promise(() => {}))
    mockCheckLogout.mockReset()
  })

  it('logs out only once the maintenance mode check lets it', () => {
    const { result } = renderHook(() => logoutUserMenuItemProvider.useMenuItem({}))
    const item = result.current as unknown as { onClick: () => void }

    item.onClick()

    expect(mockCheckLogout).toHaveBeenCalledTimes(1)
    expect(mockLogout).not.toHaveBeenCalled()

    const proceed = mockCheckLogout.mock.calls[0][0] as () => void
    proceed()

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })
})
