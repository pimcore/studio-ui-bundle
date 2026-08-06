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
import { type Loader } from '@Pimcore/modules/app/app-loader/services/app-loader-registry'
import isNull from 'lodash/isNull'
import { api as telemetryApi, type TelemetryOutboxBatch } from '../telemetry-api-slice.gen'

/**
 * Drains whatever telemetry is left in the instance's spool and forwards it to the first-party relay.
 *
 * This is NOT a DMZ-only fallback: it always runs (once, after login) and delivers whatever the
 * maintenance job has not already delivered. On a healthy instance the backend returns 204 (pool
 * empty) and this is a no-op; behind a DMZ (where the server cannot reach the relay) the browser is
 * the courier. The backend hands out product-key-encrypted, opaque batches - the browser never sees
 * the telemetry contents and cannot forge a batch.
 *
 * Delivery is deliver-then-ack: a batch is acked (removed from the pool) only after the relay
 * confirms it. On any failure we stop and leave the rest in the pool for the next session or the
 * maintenance job to retry. A per-session cap bounds the work.
 *
 * The loader schedules the drain and returns immediately. `AppLoaderRegistry.loadAll()` awaits every
 * loader before the application finishes loading, so anything awaited here would sit between the
 * user and the UI - and this talks to a relay that may be firewalled or silently black-holed.
 * Telemetry must never be able to delay a login, so the work runs detached and each relay request is
 * additionally time-boxed.
 */

const MAX_BATCHES_PER_SESSION = 50

const RELAY_TIMEOUT_MS = 10_000

export const telemetryDrainLoader: Loader = {
  name: 'telemetry-drain',

  onLoad: async (): Promise<void> => {
    // Deliberately not awaited - see the note above. drain() resolves on every path; the catch is
    // only there so an unexpected throw cannot surface as an unhandled rejection.
    void drain().catch(() => {})
  }
}

/**
 * The drain state machine itself. Exported separately from the loader so it can be driven directly:
 * the loader's contract is "schedules and returns", which is only meaningful if the work it
 * schedules can be verified on its own.
 */
export async function drain (): Promise<void> {
  for (let i = 0; i < MAX_BATCHES_PER_SESSION; i++) {
    let batch: TelemetryOutboxBatch | null

    try {
      // The endpoint answers 204 with an empty body when the pool is empty and RTK's JSON response
      // handler turns that into null - which the generated type, describing only the 200 response,
      // cannot express.
      batch = await store.dispatch(
        telemetryApi.endpoints.telemetryOutboxNextBatch.initiate(undefined, { forceRefetch: true, subscribe: false })
      ).unwrap() as TelemetryOutboxBatch | null
    } catch {
      // backend not ready / not enabled - try again next session
      return
    }

    // 204 -> null: the pool is empty, nothing more to deliver.
    if (isNull(batch)) {
      return
    }

    const delivered = await forwardToRelay(batch)

    // Leave the batch in the pool on failure; the next login or the maintenance job retries it.
    if (!delivered) {
      return
    }

    try {
      await store.dispatch(
        telemetryApi.endpoints.telemetryOutboxAck.initiate({
          telemetryOutboxAckParameters: { nonce: batch.nonce }
        })
      ).unwrap()
    } catch {
      return
    }
  }
}

async function forwardToRelay (batch: TelemetryOutboxBatch): Promise<boolean> {
  // A relay that accepts the connection but never answers would otherwise keep this request pending
  // for the browser's full timeout; on abort the batch simply stays in the pool for next time.
  // AbortController rather than AbortSignal.timeout: the latter is absent in older runtimes, and
  // clearing the timer keeps it from outliving a request that answered quickly.
  const abort = new AbortController()
  const timeout = setTimeout(() => { abort.abort() }, RELAY_TIMEOUT_MS)

  try {
    const response = await fetch(batch.relayEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: abort.signal,
      body: JSON.stringify({
        instanceIdentifier: batch.instanceIdentifier,
        v: batch.v,
        ciphertext: batch.ciphertext
      })
    })

    if (!response.ok) {
      return false
    }

    const body = await response.json().catch(() => null)

    // Success is a confirmed acceptance, not merely a 2xx (mirrors the relay's own contract).
    return body?.status === 'ok'
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}
