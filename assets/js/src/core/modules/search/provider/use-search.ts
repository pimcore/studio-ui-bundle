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
import { SearchContext } from './search-provider'

export interface UseSearchReturn {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSearch = (): UseSearchReturn => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  const open: UseSearchReturn['open'] = () => {
    context.setOpen(true)
  }

  const close: UseSearchReturn['close'] = () => {
    context.setOpen(false)
  }

  return {
    isOpen: context.open,
    open,
    close
  }
}
