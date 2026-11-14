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
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { OneTimeSecretModal } from './one-time-secret-modal'

const mockCopy = jest.fn()

jest.mock('@Pimcore/utils/clipboard', () => ({
  copyToClipboardWithFeedback: async (text: string, onSuccess: () => void) => { mockCopy(text); onSuccess() }
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn(), error: jest.fn() })
}))
jest.mock('@Pimcore/components/modal/modal', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/button/button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/input/input', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/alert/alert', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/text/text', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/formatted-date-time/formatted-date-time', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const credentials = { serviceUserId: 7, clientId: 'svc_7', clientSecret: 'shown-once' }
const accessToken = { token: 'pmcp_shown-once', expiresAt: 1_800_000_000 }

describe('OneTimeSecretModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('is closed without credentials', () => {
    render(<OneTimeSecretModal onClose={ jest.fn() } />)
    expect(screen.queryByRole('dialog')).toBeNull()

    cleanup()
    render(<OneTimeSecretModal
      credentials={ [] }
      onClose={ jest.fn() }
           />)

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows client id and secret with the warning that the secret is shown only once', () => {
    render(
      <OneTimeSecretModal
        credentials={ [credentials] }
        onClose={ jest.fn() }
      />
    )

    expect(screen.getByLabelText('service-users.credentials.client-id')).toHaveValue('svc_7')
    expect(screen.getByLabelText('service-users.secret.client-secret')).toHaveValue('shown-once')
    expect(screen.getByRole('alert')).toHaveTextContent('service-users.secret.warning')
  })

  it('copies the secret and closes', () => {
    const onClose = jest.fn()
    render(
      <OneTimeSecretModal
        credentials={ [credentials] }
        onClose={ onClose }
      />
    )

    fireEvent.click(screen.getByText('service-users.secret.copy'))
    fireEvent.click(screen.getByText('service-users.secret.close'))

    expect(mockCopy).toHaveBeenCalledWith('shown-once')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows every credential of a creation together under one warning, each with its own copy button', () => {
    const { baseElement } = render(
      <OneTimeSecretModal
        credentials={ [credentials, accessToken] }
        onClose={ jest.fn() }
      />
    )

    expect(screen.getAllByRole('alert')).toHaveLength(1)
    expect(screen.getByLabelText('service-users.credentials.client-id')).toHaveValue('svc_7')
    expect(screen.getByLabelText('service-users.secret.client-secret')).toHaveValue('shown-once')
    expect(screen.getByLabelText('service-users.credentials.token')).toHaveValue('pmcp_shown-once')

    const copyButtons = screen.getAllByText('service-users.secret.copy')
    expect(copyButtons).toHaveLength(2)
    fireEvent.click(copyButtons[0])
    fireEvent.click(copyButtons[1])
    expect(mockCopy).toHaveBeenNthCalledWith(1, 'shown-once')
    expect(mockCopy).toHaveBeenNthCalledWith(2, 'pmcp_shown-once')
    expect(baseElement.querySelectorAll('input')).toHaveLength(3)
  })

  it('shows no secret input and no copy button for a client secret that is null', () => {
    render(
      <OneTimeSecretModal
        credentials={ [{ clientId: 'svc_7', clientSecret: null }] }
        onClose={ jest.fn() }
      />
    )

    expect(screen.getByText('service-users.credentials.oauth.disabled')).toBeInTheDocument()
    expect(screen.queryByLabelText('service-users.secret.client-secret')).toBeNull()
    expect(screen.queryByText('service-users.secret.copy')).toBeNull()
  })

  it('shows an access token with its expiry and no client id, and copies the token', () => {
    render(
      <OneTimeSecretModal
        credentials={ [accessToken] }
        onClose={ jest.fn() }
      />
    )

    expect(screen.getByLabelText('service-users.credentials.token')).toHaveValue('pmcp_shown-once')
    expect(screen.getByText('date:1800000000')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('service-users.secret.warning')
    expect(screen.queryByLabelText('service-users.credentials.client-id')).toBeNull()
    expect(screen.queryByLabelText('service-users.secret.client-secret')).toBeNull()

    fireEvent.click(screen.getByText('service-users.secret.copy'))

    expect(mockCopy).toHaveBeenCalledWith('pmcp_shown-once')
  })
})
