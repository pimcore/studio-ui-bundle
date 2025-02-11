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
