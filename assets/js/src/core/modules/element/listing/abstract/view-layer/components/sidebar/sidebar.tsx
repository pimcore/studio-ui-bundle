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

import React, { useMemo } from 'react'
import { Sidebar as BaseSidebar } from '@Pimcore/components/sidebar/sidebar'
import { useSettings } from '../../../settings/use-settings'

export const Sidebar = (): React.JSX.Element => {
  const { useSidebarOptions } = useSettings()
  const { getProps } = useSidebarOptions()

  const hasEntries = getProps().entries.length > 0

  return useMemo(() => (
    <>
      { hasEntries && (
        <BaseSidebar
          sizing="large"
          { ...getProps() }
        />
      )}
    </>
  ), [getProps()])
}
