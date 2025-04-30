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
import { GlobalRowSelectionContext, type GlobalRowSelectionData } from './global-row-selection-provider'

export type UseGlobalRowSelectionReturn = GlobalRowSelectionData & {
  getSelectedData: () => {
    assets: any[]
    documents: any[]
    objects: any[]
  }
  getSelectionCount: () => number
}

export const useGlobalRowSelection = (): UseGlobalRowSelectionReturn => {
  const context = useContext(GlobalRowSelectionContext)

  if (context === undefined) {
    throw new Error('useGlobalRowSelection must be used within a GlobalRowSelectionProvider')
  }

  const getSelectedData: UseGlobalRowSelectionReturn['getSelectedData'] = () => {
    const { assets, assetsData, documents, documentsData, objects, objectsData } = context

    return {
      assets: Object.keys(assets ?? {}).map((id) => assetsData[id]),
      documents: Object.keys(documents ?? {}).map((id) => documentsData[id]),
      objects: Object.keys(objects ?? {}).map((id) => objectsData[id])
    }
  }

  const getSelectionCount = (): number => {
    const { assets, documents, objects } = getSelectedData()

    return assets.length + documents.length + objects.length
  }

  return {
    ...context,
    getSelectedData,
    getSelectionCount
  }
}
