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
import { FolderNavigationContext, type FolderNavigationData } from './folder-navigation-provider'

export type UseFolderNavigationReturn = FolderNavigationData

export const useFolderNavigation = (): UseFolderNavigationReturn => {
  const context = useContext(FolderNavigationContext)

  if (context === undefined) {
    throw new Error('useFolderNavigation must be used within a FolderNavigationProvider')
  }

  return context
}
