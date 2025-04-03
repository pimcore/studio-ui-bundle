/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface FetchBlobWithPollingParams {
  url: string
  onSuccess: (blob: Blob) => void
  interval?: number
}

export async function fetchBlobWithPolling ({
  url,
  onSuccess,
  interval = 3000
}: FetchBlobWithPollingParams): Promise<void> {
  const fetchUrl = async (): Promise<void> => {
    const response = await fetch(url)
    if (response.status === 200) {
      const blob = await response.blob()
      onSuccess(blob)
    } else if (response.status === 202) {
      setTimeout(fetchUrl, interval)
    } else {
      trackError(new GeneralError(`Unexpected response status: ${response.status}`))
    }
  }

  await fetchUrl()
}
