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
import { SearchContext } from './classification-store-provider'

export interface UseSearchReturn {
  setSearchValue: (tabId: string, value: string) => void
  getSearchValue: (tabId: string) => string
}

export const useClassificationStore = (): UseSearchReturn => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useClassificationStore must be used within a ClassificationStoreProvider')
  }

  return {
    setSearchValue: context.setSearchValue,
    getSearchValue: context.getSearchValue
  }
}
