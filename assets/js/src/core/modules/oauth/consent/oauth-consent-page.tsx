/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'
import { isNull, isNumber, isUndefined } from 'lodash'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { routes } from '@Pimcore/app/router/router'
import { useOauthAuthorizationApproveMutation, useOauthAuthorizationDetailsQuery } from '../oauth-api-slice.gen'
import { OAuthConsentView } from './oauth-consent-view'
import { useStyle } from './oauth-consent-page.styles'
import { sanitizeAuthorizationId } from './authorization-id'

const QUERY_PARAM = 'authorization_id'

/** Extract the numeric HTTP status from an RTK Query error, if any. */
const httpStatusOf = (error: FetchBaseQueryError | SerializedError | undefined): number | undefined => {
  if (!isUndefined(error) && 'status' in error && isNumber(error.status)) {
    return error.status
  }

  return undefined
}

export const OAuthConsentPage = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const authorizationId = sanitizeAuthorizationId(searchParams.get(QUERY_PARAM))
  // The id is opaque, so it is encoded before it reaches the generated client,
  // which interpolates it into the request path verbatim. A no-op for the
  // characters sanitizeAuthorizationId accepts, and a second barrier if that
  // set is ever widened.
  const requestId = isNull(authorizationId) ? '' : encodeURIComponent(authorizationId)

  // Set once the decision has been accepted and the browser is leaving the SPA. Assigning
  // window.location does not unmount synchronously, so the page keeps rendering for a moment.
  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    // currentData (not data) so the view never renders a previously loaded
    // authorization while a different id is still in flight — the decision must
    // always be taken against the authorization actually on screen.
    currentData: consent,
    isLoading,
    isError,
    error,
    refetch
  } = useOauthAuthorizationDetailsQuery(
    { id: requestId },
    // Skipped once the decision succeeded: approving invalidates the OAuth tag, which would
    // otherwise refetch an authorization the backend has just consumed and answer 404 while the
    // browser is still navigating away.
    { skip: isNull(authorizationId) || isRedirecting }
  )

  const [approve, { isLoading: isSubmitting }] = useOauthAuthorizationApproveMutation()
  const [decisionError, setDecisionError] = useState<string | undefined>(undefined)
  const [decisionExpired, setDecisionExpired] = useState(false)

  const status = httpStatusOf(error)

  // A 401 means there is no live session (the guard's cached auth state was
  // stale). Send the user through login and return to this exact request so the
  // authorization_id survives the round-trip.
  useEffect(() => {
    if (isError && status === 401) {
      navigate(routes.login, { state: { from: location } })
    }
  }, [isError, status])

  const onDecisionFailed = (reason: unknown): void => {
    const failureStatus = httpStatusOf(reason as FetchBaseQueryError | SerializedError | undefined)

    if (failureStatus === 401) {
      // The session died between loading the authorization and submitting the
      // decision. Same round-trip as the query path, so the authorization_id
      // survives the login; retrying here could only 401 again.
      navigate(routes.login, { state: { from: location } })

      return
    }

    if (failureStatus === 404) {
      // The authorization expired between loading it and submitting the
      // decision; retrying can never succeed, so show the expired state.
      setDecisionExpired(true)

      return
    }

    // The id is valid until it expires, so let the user retry the decision.
    setDecisionError(t('oauth.consent.error.decision-failed'))
  }

  const onDecision = (approved: boolean): void => {
    if (isNull(authorizationId)) {
      return
    }

    setDecisionError(undefined)

    approve({ id: requestId, body: { approved } })
      .unwrap()
      .then((result) => {
        // Leave the SPA for the client's redirect_uri (Allow -> code, Deny -> error).
        setIsRedirecting(true)
        window.location.assign(result.location)
      })
      .catch(onDecisionFailed)
  }

  const renderMessage = (title: string, description: string): React.JSX.Element => (
    <Flex
      className={ styles.card }
      gap={ 16 }
      vertical
    >
      <NoContent text={ title } />
      <Text type="secondary">{ description }</Text>
    </Flex>
  )

  const renderExpired = (): React.JSX.Element =>
    renderMessage(t('oauth.consent.expired.title'), t('oauth.consent.expired.description'))

  let body: React.JSX.Element

  if (isNull(authorizationId)) {
    body = renderExpired()
  } else if (isRedirecting) {
    // The decision succeeded and the browser is navigating to the client's redirect_uri.
    // Nothing the query does in the meantime may replace this with an error card: showing
    // "expired" right after a successful authorization would be actively misleading.
    body = <Spin type="classic" />
  } else if (status === 401) {
    // Redirect is in flight (see effect above); render nothing meaningful.
    body = <Spin type="classic" />
  } else if (status === 404 || decisionExpired) {
    body = renderExpired()
  } else if (isError) {
    body = (
      <Flex
        className={ styles.card }
        gap={ 16 }
        vertical
      >
        <NoContent text={ t('oauth.consent.error.load-failed') } />
        <Button
          color="primary"
          onClick={ () => { void refetch() } }
          type="primary"
        >
          { t('oauth.consent.retry') }
        </Button>
      </Flex>
    )
  } else if (isLoading || isUndefined(consent)) {
    body = <Spin type="classic" />
  } else {
    body = (
      <OAuthConsentView
        consent={ consent }
        errorMessage={ decisionError }
        onDecision={ onDecision }
        submitting={ isSubmitting }
      />
    )
  }

  return (
    <div
      className={ styles.page }
      data-testid="oauth-consent-page"
    >
      { body }
    </div>
  )
}
