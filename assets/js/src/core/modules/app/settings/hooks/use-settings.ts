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

import { type SystemSettingsGetApiResponse } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useSelector } from 'react-redux'
import { getSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { useMemo } from 'react'

export const useSettings = (): SystemSettingsGetApiResponse => {
  const settings = useSelector(getSettings)

  return useMemo(() => (settings), [settings])
}
