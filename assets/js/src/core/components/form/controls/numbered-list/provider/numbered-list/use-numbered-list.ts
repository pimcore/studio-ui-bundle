/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useSyncExternalStore } from 'react'
import { type NamePath } from 'antd/es/form/interface'
import { NumberedListContext, type NumberedListData } from './numbered-list-provider'

export interface UseNumberedListReturn {
  values: NumberedListData['values']
  operations: NumberedListData['operations']
  onChange?: (value: NumberedListData['values']) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
  getValueByKey: (key: string) => any
}

// Subscribes to the full numbered-list value. Use this for consumers that depend
// on the list structure (item count/order). For a single item's value, prefer
// useNumberedListValue so a change to one item does not re-render here.
export const useNumberedList = (): UseNumberedListReturn => {
  const context = useContext(NumberedListContext)

  if (context === undefined) {
    throw new Error('useNumberedList must be used within a NumberedListProvider')
  }

  const values = useSyncExternalStore(context.store.subscribe, context.store.getSnapshot)

  const getValueByKey = (key: string): any => {
    return values[key]
  }

  return {
    values,
    operations: context.operations,
    onChange: context.onChange,
    getAdditionalComponentProps: context.getAdditionalComponentProps,
    getValueByKey
  }
}
