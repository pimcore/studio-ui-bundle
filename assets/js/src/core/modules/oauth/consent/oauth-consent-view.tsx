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
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { type OAuthAuthorizationConsent } from '../oauth-api-slice.gen'
import { useScopeDescriptions } from './hooks/use-scope-descriptions'
import { useStyle } from './oauth-consent-page.styles'

export interface OAuthConsentViewProps {
  consent: OAuthAuthorizationConsent
  submitting: boolean
  errorMessage?: string
  onDecision: (approved: boolean) => void
}

export const OAuthConsentView = ({ consent, submitting, errorMessage, onDecision }: OAuthConsentViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const describeScopes = useScopeDescriptions()

  const clientName = consent.client.name
  const redirectHost = consent.client.redirectHost
  const scopes = describeScopes(consent.scopes)

  return (
    <Flex
      className={ styles.card }
      data-testid="oauth-consent"
      gap={ 24 }
      vertical
    >
      <Flex
        gap={ 8 }
        vertical
      >
        <Text
          strong
          style={ { fontSize: 20 } }
        >
          { t('oauth.consent.title') }
        </Text>
        <Text>
          { t('oauth.consent.subtitle', { client: clientName }) }
        </Text>
        { !consent.client.verified && (
          <Text
            data-testid="oauth-consent-unverified"
            type="warning"
          >
            { t('oauth.consent.unverified') }
          </Text>
        ) }
        { redirectHost != null && redirectHost !== '' && (
          <Text
            data-testid="oauth-consent-redirect-host"
            type="secondary"
          >
            { t('oauth.consent.redirect-to', { host: redirectHost }) }
          </Text>
        ) }
      </Flex>

      <Flex
        gap={ 8 }
        vertical
      >
        <Text type="secondary">
          { t('oauth.consent.permissions-heading') }
        </Text>
        { scopes.length === 0
          ? (
            <Text type="secondary">
              { t('oauth.consent.no-scopes') }
            </Text>
            )
          : (
            <ul className={ styles.scopeList }>
              { scopes.map((scope) => (
                <li key={ scope.scope }>
                  <Flex
                    gap={ 2 }
                    vertical
                  >
                    <Text strong>{ scope.label }</Text>
                    { scope.description !== undefined && (
                      <Text type="secondary">{ scope.description }</Text>
                    ) }
                  </Flex>
                </li>
              )) }
            </ul>
            ) }
      </Flex>

      { consent.user != null && (
        <Text type="secondary">
          { t('oauth.consent.signed-in-as', { username: consent.user.username }) }
        </Text>
      ) }

      { errorMessage !== undefined && (
        <Text
          data-testid="oauth-consent-error"
          type="danger"
        >
          { errorMessage }
        </Text>
      ) }

      <Flex
        className={ styles.actions }
        gap={ 12 }
      >
        <Button
          data-testid="oauth-consent-deny"
          disabled={ submitting }
          onClick={ () => { onDecision(false) } }
        >
          { t('oauth.consent.deny') }
        </Button>
        <Button
          color="primary"
          data-testid="oauth-consent-allow"
          loading={ submitting }
          onClick={ () => { onDecision(true) } }
          type="primary"
        >
          { t('oauth.consent.allow') }
        </Button>
      </Flex>
    </Flex>
  )
}
