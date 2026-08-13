/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UploadProps } from 'antd'
import { isNil } from 'lodash'

/**
 * What Ant hands a `customRequest`. Derived from Ant's own prop rather than
 * imported from `rc-upload`, which is a transitive dependency this bundle does
 * not declare and whose deep paths are not part of Ant's public API.
 */
export type UploadRequestOption = Parameters<NonNullable<UploadProps['customRequest']>>[0]

/** Handle Ant keeps per file so it can cancel an upload that is still running. */
export interface UploadAbortHandle {
  abort: () => void
}

/**
 * Ant's own `customRequest` may return nothing, so the wrapped transport is
 * narrowed at the call site rather than modelled with a `void` union.
 */
export type UploadRequest = (options: UploadRequestOption) => UploadAbortHandle

export interface UploadQueue {
  /**
   * Hands one file to `request`, either right away or once a slot frees up.
   * The transport is taken per call rather than captured when the queue is
   * built, so a caller-supplied `customRequest` is read at upload time.
   */
  enqueue: (options: UploadRequestOption, request: UploadRequest) => UploadAbortHandle
}

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
export const createUploadQueue = (limit: number): UploadQueue => {
  const pending: Array<() => void> = []
  let active = 0

  const runNext = (): void => {
    while (active < limit && pending.length > 0) {
      const start = pending.shift()!
      active++
      start()
    }
  }

  const enqueue = (options: UploadRequestOption, request: UploadRequest): UploadAbortHandle => {
    let inFlight: UploadAbortHandle | undefined

    // Set once this file has taken a slot, which is what tells a file cancelled
    // while still queued — it never held one — apart from a file whose request
    // has actually started. Releasing without it would lose a slot for good.
    let holdsSlot = false

    const release = (): void => {
      if (!holdsSlot) {
        return
      }

      holdsSlot = false
      active--
      runNext()
    }

    const start = (): void => {
      holdsSlot = true

      inFlight = request({
        ...options,
        onSuccess: (body, fileOrXhr) => {
          release()
          options.onSuccess?.(body, fileOrXhr)
        },
        onError: (event, body) => {
          release()
          options.onError?.(event, body)
        }
      })
    }

    pending.push(start)
    runNext()

    return {
      abort: () => {
        // Still queued, so drop it rather than let a slot start a cancelled upload.
        const queuedAt = pending.indexOf(start)

        if (queuedAt !== -1) {
          pending.splice(queuedAt, 1)
        }

        if (!isNil(inFlight)) {
          inFlight.abort()
        }

        // `abort()` on the underlying request only cancels the XHR — it fires
        // neither onSuccess nor onError — so the slot is handed back here.
        release()
      }
    }
  }

  return { enqueue }
}
