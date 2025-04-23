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
import { ClassDefinitionSelectionContext, type ClassDefinitionSelectionData } from './class-definition-selection-provider'

export const useClassDefinitionSelection = (): ClassDefinitionSelectionData => {
  const context = useContext(ClassDefinitionSelectionContext)

  if (context === undefined) {
    throw new Error('useClassDefinitionSelection must be used within a ClassDefinitionSelectionProvider')
  }

  return context
}
