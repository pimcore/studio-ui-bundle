/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SystemSettingsGetApiResponse } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useSelector } from 'react-redux'
import { getSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { useMemo } from 'react'

export const useSettings = (): SystemSettingsGetApiResponse => {
  const settings = useSelector(getSettings)

  return useMemo(() => (settings), [settings])
}
