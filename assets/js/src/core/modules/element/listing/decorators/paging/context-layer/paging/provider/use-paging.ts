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
import { PagingContext, type PagingData } from './paging-provider'

export type UsePagingReturn = PagingData

export const usePaging = (): UsePagingReturn => {
  const context = useContext(PagingContext)

  if (context === undefined) {
    throw new Error('usePaging must be used within a PagingProvider')
  }

  return context
}
