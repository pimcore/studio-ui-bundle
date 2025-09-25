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
  activeKey: string
  isOpen: boolean
  open: (key?: string) => void
  close: () => void
}

export const useSearch = (): UseSearchReturn => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  const open: UseSearchReturn['open'] = (key?: string) => {
    if (key !== undefined) {
      context.setActiveKey(key)
    }
    context.setOpen(true)
  }

  const close: UseSearchReturn['close'] = () => {
    context.setOpen(false)
  }

  return {
    activeKey: context.activeKey,
    isOpen: context.open,
    open,
    close
  }
}
