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
import { TypeSelectContext, type TypeSelectData } from './type-select-provider'

export interface UseTypeSelectReturn extends TypeSelectData {}

export const useTypeSelect = (): UseTypeSelectReturn => {
  const context = useContext(TypeSelectContext)

  if (context === undefined) {
    throw new Error('useTypeSelect must be used within a TypeSelectProvider')
  }

  return context
}
