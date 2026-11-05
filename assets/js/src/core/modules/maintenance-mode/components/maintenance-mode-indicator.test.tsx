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
import { fireEvent, render, screen } from '@testing-library/react'
import { MaintenanceModeIndicator } from './maintenance-mode-indicator'

const mockConfirm = jest.fn()
const mockDeactivate = jest.fn()
const mockUseGetQuery = jest.fn()
const mockIsAllowed = jest.fn()

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm: mockConfirm } })
}))
jest.mock('../maintenance-mode-api-slice-enhanced', () => ({
  useMaintenanceModeGetQuery: (arg: undefined, options: { skip: boolean }) => mockUseGetQuery(arg, options),
  useMaintenanceModeDeactivateMutation: () => [mockDeactivate]
}))
jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: (permission: string) => mockIsAllowed(permission)
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick, ...props }: { onClick: () => void, 'data-testid': string }) => (
    <button
      data-testid={ props['data-testid'] }
      onClick={ onClick }
    />
  )
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn()
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const INDICATOR = 'maintenance-mode-indicator'

describe('MaintenanceModeIndicator', () => {
  beforeEach(() => {
    mockConfirm.mockReset()
    mockDeactivate.mockReset()
    mockDeactivate.mockResolvedValue({ data: { active: false } })
    mockIsAllowed.mockReturnValue(true)
    mockUseGetQuery.mockReturnValue({ data: { active: true } })
  })

  it('is hidden while maintenance mode is off', () => {
    mockUseGetQuery.mockReturnValue({ data: { active: false } })

    render(<MaintenanceModeIndicator />)

    expect(screen.queryByTestId(INDICATOR)).toBeNull()
  })

  it('is shown while maintenance mode is on', () => {
    render(<MaintenanceModeIndicator />)

    expect(screen.getByTestId(INDICATOR)).toBeInTheDocument()
  })

  it('does not ask for the state without the maintenance_mode permission', () => {
    mockIsAllowed.mockReturnValue(false)
    mockUseGetQuery.mockReturnValue({ data: undefined })

    render(<MaintenanceModeIndicator />)

    expect(mockIsAllowed).toHaveBeenCalledWith('maintenance_mode')
    expect(mockUseGetQuery).toHaveBeenCalledWith(undefined, { skip: true })
    expect(screen.queryByTestId(INDICATOR)).toBeNull()
  })

  it('deactivates after the confirm', async () => {
    render(<MaintenanceModeIndicator />)

    fireEvent.click(screen.getByTestId(INDICATOR))

    expect(mockDeactivate).not.toHaveBeenCalled()
    const { title, onOk } = mockConfirm.mock.calls[0][0] as { title: string, onOk: () => Promise<void> }
    expect(title).toBe('maintenance-mode.deactivate.title')

    await onOk()

    expect(mockDeactivate).toHaveBeenCalledTimes(1)
  })
})
