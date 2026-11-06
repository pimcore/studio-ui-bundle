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
import { Provider } from 'react-redux'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { setLockedOut } from '../maintenance-mode-slice'
import { LockedOutNotice, PING_INTERVAL } from './locked-out-notice'

const mockReloadPage = jest.fn()
const mockShowError = jest.fn()

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))
jest.mock('@Pimcore/modules/auth/util/session-end', () => ({
  isSessionGone: async () => false,
  reloadPage: () => mockReloadPage()
}))
jest.mock('@Pimcore/modules/app/error-handler/services/error-modal-service', () => ({
  ErrorModalService: { showError: (error: unknown) => mockShowError(error) }
}))
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ open, children, footer }: { open: boolean, children: React.ReactNode, footer: React.ReactNode }) => (
    <>{open ? <div>{children}{footer}</div> : null}</>
  )
}))
jest.mock('@Pimcore/components/modal/footer/modal-footer', () => ({
  ModalFooter: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => <button onClick={ onClick }>{children}</button>
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const NOTICE = 'maintenance-mode-locked-out-notice'
const MAINTENANCE_PAGE = {
  status: 'PARSING_ERROR',
  originalStatus: 503,
  data: '<!DOCTYPE html><html><body>Maintenance</body></html>',
  error: 'SyntaxError: Unexpected token \'<\''
}

// A request to Studio's API that the server answered with the maintenance page
const failWithMaintenancePage = (): void => {
  store.dispatch({
    type: 'test/executeQuery/rejected',
    payload: MAINTENANCE_PAGE,
    error: { message: 'Rejected' },
    meta: {
      rejectedWithValue: true,
      requestStatus: 'rejected',
      requestId: 'r1',
      arg: { endpointName: 'documentGetById' },
      baseQueryMeta: { request: { url: 'http://localhost/pimcore-studio/api/documents/1' } }
    }
  })
}

const renderNotice = (): void => {
  render(<Provider store={ store }><LockedOutNotice /></Provider>)
}

const pingAnswers = (status: number): void => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status }))
}

describe('LockedOutNotice', () => {
  afterEach(() => {
    act(() => { store.dispatch(setLockedOut(false)) })
    jest.restoreAllMocks()
    jest.useRealTimers()
    mockReloadPage.mockReset()
    mockShowError.mockReset()
  })

  it('stays closed while Studio\'s API answers', () => {
    renderNotice()

    expect(screen.queryByTestId(NOTICE)).toBeNull()
  })

  it('opens once when Studio\'s API answers with the maintenance page, also after many failures', () => {
    renderNotice()

    act(() => {
      failWithMaintenancePage()
      failWithMaintenancePage()
      failWithMaintenancePage()
    })

    expect(screen.getAllByTestId(NOTICE)).toHaveLength(1)
  })

  it('shows no error modal for the maintenance page while it is open', () => {
    renderNotice()
    act(() => { failWithMaintenancePage() })

    trackError(new ApiError(MAINTENANCE_PAGE as unknown as ConstructorParameters<typeof ApiError>[0]))

    expect(mockShowError).not.toHaveBeenCalled()
  })

  it('closes itself once the ping is answered again', async () => {
    jest.useFakeTimers()
    pingAnswers(503)
    renderNotice()
    act(() => { failWithMaintenancePage() })

    await act(async () => { await jest.advanceTimersByTimeAsync(PING_INTERVAL) })

    expect(globalThis.fetch).toHaveBeenCalledWith('/pimcore-studio/api/settings/ping', expect.anything())
    expect(screen.getByTestId(NOTICE)).toBeInTheDocument()

    pingAnswers(200)
    await act(async () => { await jest.advanceTimersByTimeAsync(PING_INTERVAL) })

    expect(screen.queryByTestId(NOTICE)).toBeNull()
  })

  it('reloads the page on Reload', () => {
    renderNotice()
    act(() => { failWithMaintenancePage() })

    fireEvent.click(screen.getByText('maintenance-mode.locked-out.reload'))

    expect(mockReloadPage).toHaveBeenCalledTimes(1)
  })
})
