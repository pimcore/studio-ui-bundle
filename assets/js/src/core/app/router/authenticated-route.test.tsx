/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockUseIsAuthenticated = jest.fn()

jest.mock('@Pimcore/modules/auth/hooks/use-is-authenticated', () => ({
  useIsAuthenticated: () => mockUseIsAuthenticated()
}))

// The real login screen reaches for the store, i18n, antd and the thumbnail API. What
// matters here is which screen the guard chose and where it left the browser, so a marker
// that records the props it was given stands in for it.
jest.mock('@Pimcore/modules/auth/login-page', () => ({
  LoginPage: ({ inPlace }: { inPlace?: boolean }) => {
    const { createElement } = jest.requireActual('react')
    return createElement('div', { 'data-testid': 'login', 'data-in-place': String(inPlace) })
  }
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { MemoryRouter, useLocation } from 'react-router-dom'
// eslint-disable-next-line import/first
import { AuthenticatedRoute } from './authenticated-route'

const CONSENT_URL = '/pimcore-studio/oauth/consent?authorization_id=a50cfbca5cea94ff'

const LocationProbe = (): React.JSX.Element => {
  const location = useLocation()

  return <span data-testid="url">{ `${location.pathname}${location.search}` }</span>
}

const renderAt = (url: string): void => {
  render(
    <MemoryRouter initialEntries={ [url] }>
      <LocationProbe />
      <AuthenticatedRoute>
        <div data-testid="protected" />
      </AuthenticatedRoute>
    </MemoryRouter>
  )
}

describe('AuthenticatedRoute', () => {
  afterEach(() => {
    mockUseIsAuthenticated.mockReset()
  })

  it('renders the guarded content once the session is known to exist', () => {
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: true })

    renderAt(CONSENT_URL)

    expect(screen.getByTestId('protected')).toBeInTheDocument()
    expect(screen.queryByTestId('login')).not.toBeInTheDocument()
  })

  /**
   * The point of the guard: a login that leaves the application - an external identity
   * provider - can only find its way back from the browser's address, because React
   * Router's in-memory state does not survive a full page navigation. Redirecting to
   * /login here is what dropped the OAuth `authorization_id` and returned the user to
   * Studio's start page instead of the consent screen.
   */
  it('shows the login screen without moving off the guarded address', () => {
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: false })

    renderAt(CONSENT_URL)

    expect(screen.getByTestId('login')).toBeInTheDocument()
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument()
    expect(screen.getByTestId('url')).toHaveTextContent(CONSENT_URL)
  })

  /**
   * Rendered in place, the login screen must not navigate anywhere of its own accord:
   * the address it sits on is already the destination.
   */
  it('tells the login screen it is standing in for the guarded route', () => {
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: false })

    renderAt(CONSENT_URL)

    expect(screen.getByTestId('login')).toHaveAttribute('data-in-place', 'true')
  })

  it('shows neither while the session is still being established', () => {
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: undefined })

    renderAt(CONSENT_URL)

    expect(screen.queryByTestId('login')).not.toBeInTheDocument()
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument()
  })

  it('keeps an element deep link on its address too', () => {
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: false })

    renderAt('/pimcore-studio/asset/1234')

    expect(screen.getByTestId('login')).toBeInTheDocument()
    expect(screen.getByTestId('url')).toHaveTextContent('/pimcore-studio/asset/1234')
  })
})
