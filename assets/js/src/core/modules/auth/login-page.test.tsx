/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockLoginWithToken = jest.fn()
const mockNavigate = jest.fn()
const mockUseIsAuthenticated = jest.fn(() => ({ isAuthenticated: false }))

// The router barrel builds the browser router, which pulls in the whole application shell
// and antd-style's untranspiled ESM. Only the two route constants are read here.
jest.mock('@Pimcore/app/router/router', () => ({
  routes: { root: '/pimcore-studio/', login: '/pimcore-studio/login/' }
}))

// The auth slice re-exports through the SDK barrel, which boots i18n and the store.
jest.mock('./auth-slice', () => ({ setAuthState: (v: boolean) => ({ type: 'auth/set', payload: v }) }))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))
jest.mock('./hooks/use-authentication', () => ({
  useAuthentication: () => ({ loginWithToken: mockLoginWithToken })
}))
jest.mock('./hooks/use-is-authenticated', () => ({
  useIsAuthenticated: () => mockUseIsAuthenticated()
}))
jest.mock('./hooks/use-user', () => ({ useUser: () => ({ isAdmin: false }) }))
jest.mock('@Pimcore/modules/app/branding/hooks/use-admin-thumbnails', () => ({
  useAdminThumbnails: () => ({ customLogoSmall: '', loginScreenCustomBackgroundImage: '' })
}))
jest.mock('./login-page.styles', () => ({ useStyle: () => ({ styles: {} }) }))
jest.mock('@Pimcore/app/store', () => ({ useAppDispatch: () => jest.fn() }))
jest.mock('./components/login-form/login-form-container', () => ({ LoginFormContainer: () => null }))
jest.mock('./services/statisticsService', () => ({ sendStatistics: jest.fn() }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { MemoryRouter } from 'react-router-dom'
// eslint-disable-next-line import/first
import { LoginPage } from './login-page'

const renderAt = (url: string, inPlace: boolean): void => {
  render(
    <MemoryRouter initialEntries={ [url] }>
      <LoginPage inPlace={ inPlace } />
    </MemoryRouter>
  )
}

describe('LoginPage token login', () => {
  afterEach(() => {
    mockLoginWithToken.mockReset()
    mockNavigate.mockReset()
  })

  it('signs a user in from a login link on the login route', () => {
    renderAt('/pimcore-studio/login/?token=abc123', false)

    expect(mockLoginWithToken).toHaveBeenCalledWith('abc123', expect.anything(), expect.anything())
  })

  /**
   * The screen now stands in for every guarded route, and those keep their address, query
   * string included. A token is issued for the login route; acting on one found on a deep
   * link would let `/asset/1234?token=<attacker's>` establish a session as whoever that
   * token names, on a page the victim opened believing it was their own.
   *
   * Redirecting to the login route used to drop the query string, so this is the surface
   * staying where it was rather than a restriction being added.
   */
  it('ignores a token in the address when standing in for a guarded route', () => {
    renderAt('/pimcore-studio/asset/1234?token=attacker-token', true)

    expect(mockLoginWithToken).not.toHaveBeenCalled()
  })

  it('ignores a token on the consent route too', () => {
    renderAt('/pimcore-studio/oauth/consent?authorization_id=abc&token=attacker-token', true)

    expect(mockLoginWithToken).not.toHaveBeenCalled()
  })

  it('does not navigate away while standing in for a guarded route', () => {
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: true })

    renderAt('/pimcore-studio/oauth/consent?authorization_id=abc', true)

    expect(mockNavigate).not.toHaveBeenCalled()
    mockUseIsAuthenticated.mockReturnValue({ isAuthenticated: false })
  })
})
