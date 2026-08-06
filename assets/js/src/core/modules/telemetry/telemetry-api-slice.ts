/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api } from '@sdk/api'

/**
 * One encrypted batch handed out by the Studio backend outbox endpoint. The `ciphertext` is opaque
 * to the browser (it is encrypted with the instance product key); the UI only forwards it to
 * `relayEndpoint` and never inspects it.
 */
export interface TelemetryOutboxBatch {
  nonce: string
  instanceIdentifier: string
  v: number
  ciphertext: string
  relayEndpoint: string
}

export interface TelemetryAckResponse {
  acked: number
}

export const telemetryApi = api.injectEndpoints({
  endpoints: (build) => ({
    telemetryGetOutbox: build.query<TelemetryOutboxBatch | null, void>({
      query: () => ({
        url: '/pimcore-studio/api/telemetry/outbox',
        // The endpoint answers 204 when the pool is empty; map that to null rather than let the
        // default JSON handler throw on an empty body.
        responseHandler: async (response: Response) =>
          response.status === 204 ? null : await response.json()
      })
    }),
    telemetryAckOutbox: build.mutation<TelemetryAckResponse, { nonce: string }>({
      query: (body) => ({
        url: '/pimcore-studio/api/telemetry/outbox/ack',
        method: 'POST',
        body
      })
    })
  })
})
