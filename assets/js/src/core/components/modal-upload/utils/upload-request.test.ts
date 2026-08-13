/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UploadRequestOption } from './create-upload-queue'
import { uploadRequest } from './upload-request'

/** Stands in for XMLHttpRequest, so a test can end a request however it likes. */
class FakeXhr {
  static last: FakeXhr
  status = 200
  responseText = ''
  response = ''
  upload: { onprogress?: (event: ProgressEvent) => void } = {}
  onload?: () => void
  onerror?: (event: ProgressEvent) => void
  withCredentials = false
  sent: FormData | null = null
  opened: [string, string, boolean] | null = null
  headers: Record<string, string> = {}
  private readonly listeners: Record<string, Array<() => void>> = {}

  constructor () {
    FakeXhr.last = this
  }

  open (method: string, url: string, async: boolean): void { this.opened = [method, url, async] }
  setRequestHeader (name: string, value: string): void { this.headers[name] = value }
  send (body: FormData): void { this.sent = body }
  addEventListener (type: string, listener: () => void): void {
    this.listeners[type] = [...(this.listeners[type] ?? []), listener]
  }

  private emit (type: string): void { (this.listeners[type] ?? []).forEach((l) => { l() }) }

  /** A normal response: `load` then `loadend`, the order a browser uses. */
  finish (status: number, body = ''): void {
    this.status = status
    this.responseText = body
    this.onload?.()
    this.emit('loadend')
  }

  /** A transport-level failure: `error` then `loadend`. */
  fail (): void {
    this.onerror?.(new ProgressEvent('error'))
    this.emit('loadend')
  }

  /** What `xhr.abort()` produces: `loadend` alone, with no result. */
  abortSilently (): void {
    this.status = 0
    this.emit('loadend')
  }
}

const request = (over: Partial<UploadRequestOption> = {}): UploadRequestOption => {
  const options: UploadRequestOption = {
    action: '/assets/add/1',
    filename: 'file',
    file: new Blob(['x']),
    method: 'post',
    ...over
  }

  return options
}

beforeEach(() => {
  ;(globalThis as { XMLHttpRequest: unknown }).XMLHttpRequest = FakeXhr
})

describe('uploadRequest', () => {
  it('reports success with the parsed body', () => {
    const onSuccess = jest.fn()

    uploadRequest(request({ onSuccess }))
    FakeXhr.last.finish(200, '{"id":7}')

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onSuccess.mock.calls[0][0]).toEqual({ id: 7 })
  })

  it('reports a non-2xx response as an error carrying the status', () => {
    const onError = jest.fn()
    const onSuccess = jest.fn()

    uploadRequest(request({ onError, onSuccess }))
    FakeXhr.last.finish(500)

    expect(onSuccess).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0].status).toBe(500)
  })

  it('reports an outcome for a request aborted without a response', () => {
    const onError = jest.fn()
    const onSuccess = jest.fn()

    uploadRequest(request({ onError, onSuccess }))
    FakeXhr.last.abortSilently()

    // rc-upload's transport stays silent here, which is what strands a queue slot.
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('reports exactly once when loadend follows a result', () => {
    const onError = jest.fn()
    const onSuccess = jest.fn()

    uploadRequest(request({ onError, onSuccess }))
    FakeXhr.last.finish(200, '{}')

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onError).not.toHaveBeenCalled()

    uploadRequest(request({ onError, onSuccess }))
    FakeXhr.last.fail()

    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('opens the configured action and sends the file under the given field name', () => {
    uploadRequest(request({ filename: 'attachment', action: '/assets/add/9' }))

    expect(FakeXhr.last.opened).toEqual(['post', '/assets/add/9', true])
    expect(FakeXhr.last.sent?.get('attachment')).toBeInstanceOf(Blob)
    expect(FakeXhr.last.headers['X-Requested-With']).toBe('XMLHttpRequest')
  })

  it('forwards progress as a percentage', () => {
    const onProgress = jest.fn()

    uploadRequest(request({ onProgress }))
    const progressEvent: Pick<ProgressEvent, 'loaded' | 'total'> = { loaded: 25, total: 50 }

    FakeXhr.last.upload.onprogress?.(progressEvent as ProgressEvent)

    expect(onProgress.mock.calls[0][0].percent).toBe(50)
  })
})
