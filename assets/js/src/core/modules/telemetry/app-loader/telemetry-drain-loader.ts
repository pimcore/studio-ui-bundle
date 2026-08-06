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
 */

const MAX_BATCHES_PER_SESSION = 50

export const telemetryDrainLoader: Loader = {
  name: 'telemetry-drain',

  async onLoad (): Promise<void> {
    for (let i = 0; i < MAX_BATCHES_PER_SESSION; i++) {
      let batch: TelemetryOutboxBatch | null

      try {
        // The endpoint answers 204 with an empty body when the pool is empty and RTK's JSON
        // response handler turns that into null - which the generated type, describing only the
        // 200 response, cannot express.
        batch = await store.dispatch(
          telemetryApi.endpoints.telemetryOutboxNextBatch.initiate(undefined, { forceRefetch: true, subscribe: false })
        ).unwrap() as TelemetryOutboxBatch | null
      } catch {
        // backend not ready / not enabled - try again next session
        return
      }

      // 204 -> null: the pool is empty, nothing more to deliver.
      if (batch === null) {
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
}

async function forwardToRelay (batch: TelemetryOutboxBatch): Promise<boolean> {
  try {
    const response = await fetch(batch.relayEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  }
}
