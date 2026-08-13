/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UploadRequestOption } from 'rc-upload/es/interface'
import { createUploadQueue, type UploadRequest } from './create-upload-queue'

interface RecordingTransport {
  /** Options every started upload was handed, in start order. */
  started: UploadRequestOption[]
  transport: UploadRequest
}

const recordingTransport = (): RecordingTransport => {
  const started: UploadRequestOption[] = []

  return {
    started,
    transport: (options) => {
      started.push(options)

      return { abort: () => {} }
    }
  }
}

type UploadCallbacks = Pick<UploadRequestOption, 'onSuccess' | 'onProgress' | 'onError'>

const upload = (action: string, callbacks: UploadCallbacks = {}): UploadRequestOption => {
  const requestOption: UploadRequestOption = {
    action,
    file: new Blob([action]),
    filename: 'file',
    method: 'post',
    ...callbacks
  }

  return requestOption
}

describe('createUploadQueue', () => {
  it('starts no more uploads than the limit allows', () => {
    const queue = createUploadQueue(2)
    const { started, transport } = recordingTransport()

    for (let i = 0; i < 5; i++) {
      queue.enqueue(upload(`file-${i}`), transport)
    }

    expect(started).toHaveLength(2)

    started[0].onSuccess?.({})
    expect(started).toHaveLength(3)

    started[1].onError?.(new Error('rejected'))
    expect(started).toHaveLength(4)
  })

  it('takes the transport per call instead of capturing one', () => {
    const queue = createUploadQueue(5)
    const first = recordingTransport()
    const second = recordingTransport()

    queue.enqueue(upload('a'), first.transport)
    queue.enqueue(upload('b'), second.transport)

    expect(first.started).toHaveLength(1)
    expect(second.started).toHaveLength(1)
    expect(second.started[0].action).toBe('b')
  })

  it('shares its slots across callers using different transports', () => {
    const queue = createUploadQueue(1)
    const first = recordingTransport()
    const second = recordingTransport()

    queue.enqueue(upload('a'), first.transport)
    queue.enqueue(upload('b'), second.transport)

    expect(second.started).toHaveLength(0)

    first.started[0].onSuccess?.({})
    expect(second.started).toHaveLength(1)
  })

  it('keeps its slots when an upload is cancelled before it started', () => {
    const queue = createUploadQueue(1)
    const { started, transport } = recordingTransport()

    queue.enqueue(upload('a'), transport)
    const queued = queue.enqueue(upload('b'), transport)
    queue.enqueue(upload('c'), transport)

    queued.abort()
    expect(started).toHaveLength(1)

    started[0].onSuccess?.({})

    expect(started).toHaveLength(2)
    expect(started[1].action).toBe('c')
  })

  it('releases the slot of a cancelled upload that was already running', () => {
    const queue = createUploadQueue(1)
    const { started, transport } = recordingTransport()

    const running = queue.enqueue(upload('a'), transport)
    queue.enqueue(upload('b'), transport)

    running.abort()

    expect(started).toHaveLength(2)
    expect(started[1].action).toBe('b')
  })

  it('passes the original callbacks through', () => {
    const queue = createUploadQueue(1)
    const { started, transport } = recordingTransport()
    const onSuccess = jest.fn()
    const onProgress = jest.fn()

    queue.enqueue(upload('a', { onSuccess, onProgress }), transport)

    started[0].onProgress?.({ percent: 40 })
    started[0].onSuccess?.({ id: 7 })

    expect(onProgress).toHaveBeenCalledWith({ percent: 40 })
    expect(onSuccess).toHaveBeenCalledWith({ id: 7 }, undefined)
  })
})
