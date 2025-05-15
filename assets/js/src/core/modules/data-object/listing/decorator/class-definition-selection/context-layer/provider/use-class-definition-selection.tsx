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
import { ClassDefinitionSelectionContext, type ClassDefinitionSelectionData } from './class-definition-selection-provider'

export const useClassDefinitionSelection = (): ClassDefinitionSelectionData => {
  const context = useContext(ClassDefinitionSelectionContext)

  if (context === undefined) {
    throw new Error('useClassDefinitionSelection must be used within a ClassDefinitionSelectionProvider')
  }

  return context
}
