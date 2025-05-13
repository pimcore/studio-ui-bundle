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
import { DataContext, type DataContextProps } from './data-provider'

export interface UseDataReturn extends DataContextProps {}

export const useData = (): UseDataReturn => {
  const context = useContext(DataContext)

  if (context === undefined || context === null) {
    throw new Error('useData must be used within a DataProvider')
  }

  return context
}
