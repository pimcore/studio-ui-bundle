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
import { AreaControlContext, type AreaControlData } from './area-control-provider'

export const useAreaControl = (): AreaControlData => {
  const context = useContext(AreaControlContext)

  if (context === undefined) {
    throw new Error('useAreaControl must be used within a AreaControlProvider')
  }

  return context
}
