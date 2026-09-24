/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { OAuthConsentView } from './oauth-consent-view'
import { type OAuthAuthorizationConsent } from '../oauth-api-slice.gen'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { exists: () => false } })
}))

// The generated slice pulls in the store; only its type is used here.
jest.mock('../oauth-api-slice.gen', () => ({}))

// The `.styles` file pulls in antd-style's untranspiled ESM build, which jest does not transform.
jest.mock('./oauth-consent-page.styles', () => ({ useStyle: () => ({ styles: {} }) }))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children, type, ...props }: { children: React.ReactNode, type?: string, 'data-testid'?: string }) => (
    <span
      data-testid={ props['data-testid'] }
      data-type={ type }
    >{children}</span>
  )
}))

jest.mock('@Pimcore/components/title/title', () => ({
  Title: ({ children, id }: { children: React.ReactNode, id?: string }) => <h2 id={ id }>{children}</h2>
}))

jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button type="button">{children}</button>
}))

const consentWith = (scopes: string[]): OAuthAuthorizationConsent => ({
  authorizationId: 'abc',
  client: { name: 'My Desktop App', redirectHost: 'oauth.tools', verified: true },
  scopes,
  user: { username: 'admin' }
} as unknown as OAuthAuthorizationConsent)

const renderView = (scopes: string[]): void => {
  render(
    <OAuthConsentView
      consent={ consentWith(scopes) }
      onDecision={ jest.fn() }
      submitting={ false }
    />
  )
}

describe('OAuthConsentView', () => {
  // An empty scope list used to read "No specific permissions were requested." But the token
  // issued for such a request still reaches any resource that does not check scopes, with the
  // user's own permissions, so the screen must warn rather than reassure.
  it('warns instead of listing permissions when no scope was requested', () => {
    renderView([])

    const warning = screen.getByTestId('oauth-consent-no-scopes')
    expect(warning).toHaveTextContent('oauth.consent.no-scopes-warning')
    expect(warning).toHaveAttribute('data-type', 'warning')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('oauth.consent.permissions-heading')).not.toBeInTheDocument()
  })

  it('lists the requested scopes under the permissions heading', () => {
    renderView(['mcp:read', 'mcp:write'])

    expect(screen.getByText('oauth.consent.permissions-heading')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('mcp:read')).toBeInTheDocument()
    expect(screen.queryByTestId('oauth-consent-no-scopes')).not.toBeInTheDocument()
  })
})
