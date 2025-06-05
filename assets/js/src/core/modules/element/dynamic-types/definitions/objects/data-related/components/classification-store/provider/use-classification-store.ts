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
import { ClassificationStoreContext } from './classification-store-provider'

export interface UseClassificationStoreReturn {
  isOpenModal: boolean
  openModal: () => void
  closeModal: () => void
  setSearchValue: (tabId: string, value: string) => void
  getSearchValue: (tabId: string) => string
  currentLayoutData: any[]
  updateCurrentLayoutData: (layoutData: any[]) => void
}

const useClassificationStore = (): UseClassificationStoreReturn => {
  const context = useContext(ClassificationStoreContext)

  if (context === undefined) {
    throw new Error('useClassificationStore must be used within a ClassificationStoreProvider')
  }

  return {
    isOpenModal: context.isOpen,
    openModal: context.open,
    closeModal: context.close,
    setSearchValue: context.setSearchValue,
    getSearchValue: context.getSearchValue,
    currentLayoutData: context.currentLayoutData,
    updateCurrentLayoutData: context.setCurrentLayoutData
  }
}

export default useClassificationStore
