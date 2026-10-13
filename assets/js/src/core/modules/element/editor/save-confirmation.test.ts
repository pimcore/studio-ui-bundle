/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { confirmWhenSchedulesSaved } from './save-confirmation'

describe('confirmWhenSchedulesSaved', () => {
  it('confirms once the schedules are saved', async () => {
    const confirm = jest.fn()

    await confirmWhenSchedulesSaved(Promise.resolve(true), confirm)

    expect(confirm).toHaveBeenCalledTimes(1)
  })

  it('does not confirm when the schedules failed', async () => {
    const confirm = jest.fn()

    await confirmWhenSchedulesSaved(Promise.resolve(false), confirm)

    expect(confirm).not.toHaveBeenCalled()
  })

  it('confirms when no schedules were saved by the action', async () => {
    const confirm = jest.fn()

    await confirmWhenSchedulesSaved(undefined, confirm)

    expect(confirm).toHaveBeenCalledTimes(1)
  })
})
