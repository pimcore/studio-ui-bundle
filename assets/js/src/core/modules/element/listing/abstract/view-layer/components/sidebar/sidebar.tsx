/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
