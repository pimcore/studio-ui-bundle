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
import { KeyedListContext, type KeyedListData } from './keyed-list-provider'

export interface UseKeyedListReturn extends KeyedListData {
  getValueByKey: (key: string) => any
}

export const useKeyedList = (): UseKeyedListReturn => {
  const context = useContext(KeyedListContext)

  if (context === undefined) {
    throw new Error('useKeyedList must be used within a KeyedListProvider')
  }

  const getValueByKey = (key: string): any => {
    return context.values[key]
  }

  return {
    ...context,
    getValueByKey
  }
}
