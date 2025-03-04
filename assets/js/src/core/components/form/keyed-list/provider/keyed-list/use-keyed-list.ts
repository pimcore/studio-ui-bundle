/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
