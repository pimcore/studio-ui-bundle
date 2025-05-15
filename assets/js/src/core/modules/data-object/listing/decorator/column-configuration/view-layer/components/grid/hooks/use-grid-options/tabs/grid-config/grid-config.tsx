/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { GridConfigProvider } from './grid-config-provider'
import { GridConfigInner } from './grid-config-inner'

export const GridConfig = (): React.JSX.Element => {
  return (
    <GridConfigProvider>
      <GridConfigInner />
    </GridConfigProvider>
  )
}
