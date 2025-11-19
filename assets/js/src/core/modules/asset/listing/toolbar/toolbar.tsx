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
import { componentConfig, ComponentRenderer } from '@sdk/modules/app'
import { useSettings } from '@sdk/modules/element'

export const Toolbar = (): React.JSX.Element => {
  const { toolbarSlotName } = useSettings()

  return useMemo(() => (
    <ComponentRenderer component={ toolbarSlotName ?? componentConfig.asset.listing.toolbar.component.name } />
  ), [])
}
