/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import type { UploadAbortHandle, UploadRequest, UploadRequestOption } from './create-upload-queue'

/** Matches the error shape Ant's own transport reports, so callers see no difference. */
interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestOption['method']
  url?: string
}

const buildError = (options: UploadRequestOption, xhr: XMLHttpRequest): UploadRequestError => {
  const error: UploadRequestError = new Error(
    `cannot ${options.method ?? 'post'} ${options.action} ${xhr.status}`
  )

  error.status = xhr.status
  error.method = options.method
  error.url = options.action

  return error
}

const readBody = (xhr: XMLHttpRequest): unknown => {
  const text = xhr.responseText ?? xhr.response

  if (isNil(text) || text === '') {
    return text
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const buildFormData = (options: UploadRequestOption): FormData => {
  const formData = new FormData()

  if (!isNil(options.data)) {
    Object.entries(options.data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => { formData.append(`${key}[]`, item as string) })

        return
      }

      formData.append(key, value as string)
    })
  }

  if (options.file instanceof Blob) {
    formData.append(options.filename ?? 'file', options.file, (options.file as File).name)
  } else {
    formData.append(options.filename ?? 'file', options.file)
  }

  return formData
}

/**
 * Sends one file.
 *
 * Behaves like the transport Ant falls back to, with one guarantee added: it
 * reports exactly one outcome, always. `rc-upload`'s own version listens for
 * `load` and `error` only, so a request the browser ends any other way — an
 * abort above all — finishes without telling anyone. A caller that counts
 * outstanding uploads, as the concurrency queue does, would wait on it forever.
 * `loadend` fires however a request ends, so it backstops the two paths that
 * carry a result.
 */
export const uploadRequest: UploadRequest = (options: UploadRequestOption): UploadAbortHandle => {
  const xhr = new XMLHttpRequest()

  let reported = false
  const report = (outcome: () => void): void => {
    if (reported) {
      return
    }

    reported = true
    outcome()
  }

  if (!isNil(options.onProgress) && !isNil(xhr.upload)) {
    xhr.upload.onprogress = (event: ProgressEvent): void => {
      // The percentage is set on the event itself rather than on a copy: a
      // ProgressEvent keeps its fields on the prototype, so spreading one
      // yields an empty object.
      const progress = event as ProgressEvent & { percent?: number }

      if (event.total > 0) {
        progress.percent = (event.loaded / event.total) * 100
      }

      options.onProgress?.(progress)
    }
  }

  xhr.onload = (): void => {
    if (xhr.status < 200 || xhr.status >= 300) {
      report(() => { options.onError?.(buildError(options, xhr), readBody(xhr)) })

      return
    }

    report(() => { options.onSuccess?.(readBody(xhr), xhr) })
  }

  xhr.onerror = (event): void => {
    report(() => { options.onError?.(event) })
  }

  // Reached only when neither handler above already reported, i.e. when the
  // request was aborted or ended without a response.
  xhr.addEventListener('loadend', () => {
    report(() => {
      const aborted: UploadRequestError = new Error(`upload of ${options.action} did not complete`)
      aborted.status = xhr.status
      aborted.url = options.action

      options.onError?.(aborted)
    })
  })

  xhr.open(options.method ?? 'post', options.action, true)

  if (options.withCredentials === true && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = options.headers ?? {}

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  Object.entries(headers).forEach(([header, value]) => {
    if (value !== null) {
      xhr.setRequestHeader(header, value)
    }
  })

  xhr.send(buildFormData(options))

  return {
    abort: () => { xhr.abort() }
  }
}
