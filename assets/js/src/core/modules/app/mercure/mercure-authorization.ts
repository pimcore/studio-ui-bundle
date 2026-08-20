/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/app/mercure-api-slice.gen'

/**
 * Keeps the `mercureAuthorization` cookie alive for as long as the tab is open.
 *
 * The hub authorises a subscription exactly once, when the EventSource connects, from the
 * cookie sent with that request. The cookie lives for `cookie_lifetime` seconds (one hour by
 * default) while a Studio tab lives for as long as the user leaves it open, and the hub closes
 * every stream on its own `write_timeout` (600s by default), so the browser reconnects roughly
 * every nine minutes on its own. The first of those reconnects made without a valid cookie is
 * answered with `200 OK` by a hub that allows anonymous subscribers - and then silently drops
 * every private update, so notifications, job progress and agent chat stop arriving with no
 * error anywhere, until the page is fully reloaded.
 *
 * Renewing before each connect is therefore not an optimisation, it is the only point in time
 * that is guaranteed to be early enough. The interval below is a backstop for hubs configured
 * without a write timeout, where a single connection can outlive the cookie.
 */

/** Assumed cookie lifetime until the server has told us the real one. */
const FALLBACK_LIFETIME_MS = 3_600_000

/**
 * Fraction of the lifetime after which the cookie is renewed. The remaining fifth absorbs a
 * failed request, a suspended tab and any clock difference between server and browser.
 */
const RENEWAL_RATIO = 0.8

let lifetimeMs = FALLBACK_LIFETIME_MS
let renewalTimeout: ReturnType<typeof setTimeout> | undefined

/**
 * Read the cookie lifetime from the auth response.
 *
 * The generated response type is `unknown` until the API client is regenerated, and a Studio UI
 * can run against a backend that does not send the field yet, so this narrows defensively and
 * keeps the last known value when the response carries nothing usable.
 */
const readLifetimeMs = (response: unknown): number | null => {
  if (typeof response !== 'object' || response === null) {
    return null
  }

  const cookieLifetime = (response as Record<string, unknown>).cookieLifetime

  return typeof cookieLifetime === 'number' && cookieLifetime > 0
    ? cookieLifetime * 1000
    : null
}

/** Lifetime of the most recently issued cookie, in milliseconds. */
export const getAuthorizationLifetimeMs = (): number => lifetimeMs

/**
 * Request a fresh authorization cookie. Resolves once the cookie is set, so callers can connect
 * straight afterwards; rejects when the request failed, leaving the previous cookie in place.
 */
export const renewMercureAuthorization = async (): Promise<void> => {
  const response = await store.dispatch(api.endpoints.mercureCreateCookie.initiate()).unwrap()

  lifetimeMs = readLifetimeMs(response) ?? lifetimeMs
}

const scheduleRenewal = (): void => {
  renewalTimeout = setTimeout(() => {
    void renewMercureAuthorization()
      .catch(() => {
        // A failed renewal is not fatal: the cookie we hold is still valid for the remaining
        // fifth of its lifetime, and every reconnect renews as well. Keep the schedule alive.
      })
      .finally(() => {
        scheduleRenewal()
      })
  }, Math.round(lifetimeMs * RENEWAL_RATIO))
}

/**
 * Start renewing the cookie in the background. Idempotent, so a second call does not stack a
 * second timer on top of the first.
 */
export const startMercureAuthorizationRenewal = (): void => {
  if (renewalTimeout !== undefined) {
    return
  }

  scheduleRenewal()
}

/** Stop the background renewal. */
export const stopMercureAuthorizationRenewal = (): void => {
  if (renewalTimeout !== undefined) {
    clearTimeout(renewalTimeout)
    renewalTimeout = undefined
  }
}
