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
import { RowSelectionContext, type RowSelectionData } from './row-selection-provider'

export interface UseRowSelectionReturn extends RowSelectionData {}

export const useRowSelection = (): UseRowSelectionReturn => {
  const context = useContext(RowSelectionContext)

  if (context === undefined || context === null) {
    throw new Error('useRowSelection must be used within a RowSelectionProvider')
  }

  return context
}
