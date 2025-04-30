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
