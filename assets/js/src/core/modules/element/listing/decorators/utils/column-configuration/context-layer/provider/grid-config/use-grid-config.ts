/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { GridConfigContext, type GridConfigData } from './grid-config-provider'

export const useGridConfig = (): GridConfigData => {
  const context = useContext(GridConfigContext)

  if (context === undefined) {
    throw new Error('useGridConfig must be used within a GridConfigProvider')
  }

  return context
}
