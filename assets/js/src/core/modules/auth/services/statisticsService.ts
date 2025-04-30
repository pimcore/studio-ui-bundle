/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { currentDomain } from '@Pimcore/app/config/app-config'

const PIMCORE_STATISTICS_URL = `${currentDomain}/pimcore-statistics`
const LICENSE_STATISTICS_URL = 'https://license.pimcore.com/statistics'

export const sendStatistics = async (isAdmin: boolean): Promise<void> => {
  try {
    const response = await fetch(PIMCORE_STATISTICS_URL, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    if (response.ok) {
      const res = await response.json()

      if (isAdmin) {
        await fetch(LICENSE_STATISTICS_URL, {
          method: 'POST',
          body: new URLSearchParams({
            data: encodeURIComponent(JSON.stringify(res))
          })
        })
      }
    }
  } catch (e) {
    console.error('Error while sending statistics: ', e)
  }
}
