/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { getActiveBundles } from '@Pimcore/modules/app/settings/settings-slice'

/**
 * A bundle is active when it is both enabled and installed. The list is
 * loaded once at app start; before it is available every bundle counts
 * as inactive.
 */
export const isBundleActive = (bundleName: string): boolean => {
  const activeBundles = getActiveBundles(store.getState())

  return activeBundles?.includes(bundleName) === true
}
