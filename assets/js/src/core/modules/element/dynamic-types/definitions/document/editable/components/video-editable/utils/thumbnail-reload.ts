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

/**
 * The rendered video preview is stale while a named thumbnail is still converting. Reports, once per
 * editable instance, that the conversion ended so the editor can be refreshed (or the refresh handed
 * to the owner of the editable, e.g. an open editable dialog that reloads on Save).
 */
export const hasThumbnailConversionEnded = (
  thumbnailStatus: { status: string } | null | undefined,
  alreadyReported: boolean
): boolean => {
  if (isNil(thumbnailStatus) || alreadyReported) {
    return false
  }

  return thumbnailStatus.status === 'finished' || thumbnailStatus.status === 'error'
}
