/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UploadProps as AntUploadProps } from 'antd'
import { isNil } from 'lodash'

/** What Ant hands to `customRequest`, taken from its own prop rather than rc-upload. */
export type UploadRequestOption = Parameters<NonNullable<AntUploadProps['customRequest']>>[0]

/** Handle Ant keeps per file so it can cancel an upload that is still running. */
export interface UploadAbortHandle {
  abort: () => void
}

/**
 * Ant's `customRequest` is typed as returning nothing, so callers are asserted
 * into this shape; `no-invalid-void-type` rules out saying `| void` here.
 */
export type UploadRequest = (options: UploadRequestOption) => UploadAbortHandle

export interface UploadQueue {
  /** Runs `request` now or once a slot frees. Taken per call, never captured. */
  enqueue: (options: UploadRequestOption, request: UploadRequest) => UploadAbortHandle
}

/**
 * Limits how many uploads are in flight at the same time. See
 * Configuration → Parallel Asset Uploads for why the limit exists.
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

    // Only an entry that took a slot may give one back, otherwise cancelling a
    // still-queued file would release a slot it never held.
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

      try {
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
      } catch (error) {
        // A transport that throws reports no outcome, so it would hold its slot
        // for the life of the tab. Ant also calls this from an uncaught `.then()`,
        // where the throw is swallowed and takes the rest of the batch with it, so
        // the failure is reported here rather than propagated.
        release()
        options.onError?.(error as Error)
      }
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

        // abort() cancels the XHR without firing onSuccess or onError.
        release()
      }
    }
  }

  return { enqueue }
}
