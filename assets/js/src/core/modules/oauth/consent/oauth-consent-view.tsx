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
import { isEmpty, isNil, isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Title } from '@Pimcore/components/title/title'
import { Button } from '@Pimcore/components/button/button'
import { type OAuthAuthorizationConsent } from '../oauth-api-slice.gen'
import { useScopeDescriptions } from './hooks/use-scope-descriptions'
import { useStyle } from './oauth-consent-page.styles'

/** Ties the permissions list to its heading for assistive technology. */
const PERMISSIONS_HEADING_ID = 'oauth-consent-permissions-heading'

export interface OAuthConsentViewProps {
  consent: OAuthAuthorizationConsent
  submitting: boolean
  errorMessage?: string
  onDecision: (approved: boolean) => void
}

export const OAuthConsentView = ({
  consent,
  submitting,
  errorMessage,
  onDecision
}: OAuthConsentViewProps): React.JSX.Element => {
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
        <Title
          level={ 1 }
          titleClass={ styles.title }
        >
          { t('oauth.consent.title') }
        </Title>
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
        { !isNil(redirectHost) && !isEmpty(redirectHost) && (
          <Text
            data-testid="oauth-consent-redirect-host"
            type="secondary"
          >
            { t('oauth.consent.redirect-to', { host: redirectHost }) }
          </Text>
        ) }
      </Flex>

      { isEmpty(scopes)
        ? (
          // Without requested scopes there is nothing to list, and that is not the same as
          // "nothing granted": the server issues a token without scopes, and a resource that
          // does not check scopes accepts it with the user's own permissions. So the screen
          // warns instead of reassuring, and does not claim what the token will be able to do.
          <Text
            data-testid="oauth-consent-no-scopes"
            type="warning"
          >
            { t('oauth.consent.no-scopes-warning') }
          </Text>
          )
        : (
          <Flex
            gap={ 8 }
            vertical
          >
            <Title
              id={ PERMISSIONS_HEADING_ID }
              level={ 2 }
              theme="secondary"
              titleClass={ styles.sectionTitle }
              weight="normal"
            >
              { t('oauth.consent.permissions-heading') }
            </Title>
            { /* The implicit list role is redundant everywhere except WebKit, which drops it
                when list-style is none. "list, N items" is the announcement that matters most
                on this screen, so the redundancy is deliberate here. */ }
            { /* eslint-disable-next-line jsx-a11y/no-redundant-roles */ }
            <ul
              aria-labelledby={ PERMISSIONS_HEADING_ID }
              className={ styles.scopeList }
              role="list"
            >
              { scopes.map((scope) => (
                <li key={ scope.scope }>
                  <Flex
                    gap={ 2 }
                    vertical
                  >
                    <Text strong>{ scope.label }</Text>
                    { !isUndefined(scope.description) && (
                      <Text type="secondary">{ scope.description }</Text>
                    ) }
                  </Flex>
                </li>
              )) }
            </ul>
          </Flex>
          ) }

      { !isNil(consent.user) && (
        <Text type="secondary">
          { t('oauth.consent.signed-in-as', { username: consent.user.username }) }
        </Text>
      ) }

      { !isUndefined(errorMessage) && (
        <Text
          data-testid="oauth-consent-error"
          role="alert"
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
