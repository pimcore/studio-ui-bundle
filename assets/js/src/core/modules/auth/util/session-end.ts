/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'

/**
 * Asks the server whether the Studio session is really gone. Fetched directly rather than
 * through the store, so the answer does not pass through the store's 401 handling.
 *
 * Only an explicit 401 counts. A network error or any other status resolves to `false`, so
 * nothing acts on a guess.
 */
export const isSessionGone = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${getPrefix()}/user/current-user-information`, {
      credentials: 'same-origin'
    })

    return response.status === 401
  } catch {
    return false
  }
}

export const reloadPage = (): void => {
  globalThis.location.reload()
}
