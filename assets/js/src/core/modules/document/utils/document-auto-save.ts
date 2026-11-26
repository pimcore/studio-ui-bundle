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
import { getSettings } from '@Pimcore/modules/app/settings/settings-slice'

/**
 * Document auto-save is turned off with `pimcore.documents.auto_save_interval: 0`.
 * Read at call time, because debounced callbacks outlive the render that created them.
 * A missing setting (older backend) keeps auto-save enabled.
 */
export const isDocumentAutoSaveEnabled = (): boolean => {
  return getSettings(store.getState())?.document_auto_save_interval !== 0
}
