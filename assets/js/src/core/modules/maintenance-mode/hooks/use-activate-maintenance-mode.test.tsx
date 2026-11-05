/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockConfirm = jest.fn()
const mockActivate = jest.fn()
const mockTrackError = jest.fn()

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm: mockConfirm } })
}))
jest.mock('../maintenance-mode-api-slice-enhanced', () => ({
  useMaintenanceModeActivateMutation: () => [mockActivate]
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class { constructor (public readonly data: unknown) {} }
}))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, renderHook, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DISABLE_COMMAND, useActivateMaintenanceMode } from './use-activate-maintenance-mode'

interface ConfirmConfig {
  title: string
  content: React.ReactElement
  okText: string
  onOk: () => Promise<void>
}

const openConfirm = (): ConfirmConfig => {
  const { result } = renderHook(() => useActivateMaintenanceMode())
  result.current.activateWithConfirmation()

  return mockConfirm.mock.calls[0][0] as ConfirmConfig
}

describe('useActivateMaintenanceMode', () => {
  beforeEach(() => {
    mockConfirm.mockReset()
    mockActivate.mockReset()
    mockActivate.mockResolvedValue({ data: { active: true } })
    mockTrackError.mockReset()
  })

  it('asks first and warns about the lock-out and the CLI command', () => {
    const config = openConfirm()

    expect(config.title).toBe('maintenance-mode.activate.title')
    expect(config.okText).toBe('maintenance-mode.activate.ok')

    render(<>{config.content}</>)

    expect(screen.getByText('maintenance-mode.activate.lock-out')).toBeInTheDocument()
    expect(screen.getByText(DISABLE_COMMAND)).toBeInTheDocument()
    expect(DISABLE_COMMAND).toBe('bin/console pimcore:maintenance-mode --disable')
  })

  it('does not activate before the user confirms', () => {
    openConfirm()

    expect(mockActivate).not.toHaveBeenCalled()
  })

  it('activates on OK', async () => {
    await openConfirm().onOk()

    expect(mockActivate).toHaveBeenCalledTimes(1)
    expect(mockTrackError).not.toHaveBeenCalled()
  })

  it('reports a failed activation', async () => {
    mockActivate.mockResolvedValue({ error: { status: 403, data: { message: 'Forbidden' } } })

    await openConfirm().onOk()

    expect(mockTrackError).toHaveBeenCalledTimes(1)
  })
})
