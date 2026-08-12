/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import defaultRequest from 'rc-upload/es/request'
import type { UploadRequestOption } from 'rc-upload/es/interface'
import { isNil } from 'lodash'

/** Handle Ant keeps per file so it can cancel an upload that is still running. */
export interface UploadAbortHandle {
  abort: () => void
}

/**
 * Ant's own `customRequest` may return nothing, so the wrapped transport is
 * narrowed at the call site rather than modelled with a `void` union.
 */
export type UploadRequest = (options: UploadRequestOption) => UploadAbortHandle

/**
 * Limits how many uploads are in flight at the same time.
 *
 * Ant starts every accepted file in the same tick. On HTTP/1.1 the browser's
 * six-connections-per-origin cap throttles that by accident; on HTTP/2 all of
 * them are multiplexed over one connection, so the whole batch reaches the
 * server at once and can exhaust the PHP-FPM pool.
 *
 * `customRequest` is the seam: Ant still calls it once per file immediately,
 * but nothing obliges it to start a request there and then. Queued files start
 * only once a slot frees up, and the rest of the upload lifecycle is untouched
 * because progress and completion callbacks are passed straight through.
 */
export const createUploadQueue = (
  limit: number,
  request: UploadRequest = defaultRequest
): UploadRequest => {
  const pending: Array<() => void> = []
  let active = 0

  const runNext = (): void => {
    while (active < limit && pending.length > 0) {
      const start = pending.shift()!
      active++
      start()
    }
  }

  return (options: UploadRequestOption) => {
    let started = false
    let settled = false
    let aborted = false
    let inFlight: UploadAbortHandle | undefined

    // Releasing must happen exactly once per file. `abort()` on the underlying
    // request only cancels the XHR — it fires neither onSuccess nor onError —
    // so without settling here an aborted upload would hold its slot forever.
    const settle = (): void => {
      if (settled) {
        return
      }

      settled = true

      if (started) {
        active--
        runNext()
      }
    }

    const start = (): void => {
      started = true

      if (aborted) {
        settle()
        return
      }

      inFlight = request({
        ...options,
        onSuccess: (body, fileOrXhr) => {
          settle()
          options.onSuccess?.(body, fileOrXhr)
        },
        onError: (event, body) => {
          settle()
          options.onError?.(event, body)
        }
      })
    }

    pending.push(start)
    runNext()

    return {
      abort: () => {
        aborted = true

        if (!isNil(inFlight)) {
          inFlight.abort()
        }

        settle()
      }
    }
  }
}
