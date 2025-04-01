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
import { NumberedListContext, type NumberedListData } from './numbered-list-provider'

export interface UseNumberedListReturn extends NumberedListData {
  getValueByKey: (key: string) => any
}

export const useNumberedList = (): UseNumberedListReturn => {
  const context = useContext(NumberedListContext)

  if (context === undefined) {
    throw new Error('useNumberedList must be used within a NumberedListProvider')
  }

  const getValueByKey = (key: string): any => {
    return context.values[key]
  }

  return {
    ...context,
    getValueByKey
  }
}
