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
import { ItemContext, type ItemData } from './item-provider'

export interface UseItemReturn extends ItemData {}

export const useItem = (): UseItemReturn => {
  const context = useContext(ItemContext)

  if (context === undefined) {
    throw new Error('useItem must be used within a ItemProvider')
  }

  return context
}

export const useItemOptional = (): UseItemReturn | undefined => {
  return useContext(ItemContext)
}
