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
import { useSettings } from './settings/use-settings'

export const ListingInnerContainer = (): React.JSX.Element => {
  const { ContextComponent } = useSettings()

  return useMemo(() => (
    <ContextComponent key={ 'context-component' } />
  ), [ContextComponent])
}
