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

import React from 'react'
import { Sidebar as BaseSidebar } from '@Pimcore/components/sidebar/sidebar'
import { useSettings } from '../../../settings/use-settings'

export const Sidebar = (): React.JSX.Element => {
  const { useSidebarOptions } = useSettings()
  const { getProps } = useSidebarOptions()

  console.log({ props: getProps() })

  const hasEntries = getProps().entries.length > 0

  if (!hasEntries) {
    return <></>
  }

  return (
    <BaseSidebar
      sizing="large"
      { ...getProps() }
    />
  )
}
