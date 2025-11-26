/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface FetchBlobWithPollingParams {
  url: string
  onSuccess: (blob: Blob) => void
  interval?: number
  throwOnError?: boolean
}

export async function fetchBlobWithPolling ({
  url,
  onSuccess,
  interval = 3000,
  throwOnError = false
}: FetchBlobWithPollingParams): Promise<void> {
  await new Promise((resolve, reject) => {
    const fetchUrl = async (): Promise<void> => {
      try {
        const response = await fetch(url)
        if (response.status === 200) {
          const blob = await response.blob()
          onSuccess(blob)
          resolve(undefined)
        } else if (response.status === 202) {
          setTimeout(() => { void fetchUrl() }, interval)
        } else {
          if (throwOnError) {
            reject(new Error(`Unexpected response status: ${response.status}`))
          } else {
            trackError(new GeneralError(`Unexpected response status: ${response.status}`))
            resolve(undefined)
          }
        }
      } catch (error) {
        if (throwOnError) {
          reject(error)
        } else {
          trackError(new GeneralError('An error occurred while fetching the blob'))
          resolve(undefined)
        }
      }
    }

    void fetchUrl()
  })
}
