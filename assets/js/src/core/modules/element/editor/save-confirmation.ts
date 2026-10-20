/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'

/**
 * A save action stores the element and its schedules. Once the element itself is saved, the
 * confirmation waits for the schedules of the same action and is skipped if they failed.
 */
export const confirmWhenSchedulesSaved = async (schedulesSaved: Promise<boolean> | undefined, confirm: () => void): Promise<void> => {
  const isSaved = isUndefined(schedulesSaved) ? true : await schedulesSaved

  if (isSaved) {
    confirm()
  }
}
