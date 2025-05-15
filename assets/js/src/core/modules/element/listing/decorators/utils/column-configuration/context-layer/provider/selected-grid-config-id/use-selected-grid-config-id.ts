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
import { SelectedGridConfigIdContext, type SelectedGridConfigIdData } from './selected-grid-config-id-provider'

export const useSelectedGridConfigId = (): SelectedGridConfigIdData => {
  const context = useContext(SelectedGridConfigIdContext)

  if (context === undefined) {
    throw new Error('useSelectedGridConfigId must be used within a SelectedGridConfigIdProvider')
  }

  return context
}
