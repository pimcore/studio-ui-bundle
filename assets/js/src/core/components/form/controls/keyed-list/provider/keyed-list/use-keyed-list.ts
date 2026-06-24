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
import { KeyedListContext, type KeyedListData } from './keyed-list-provider'

export interface UseKeyedListReturn {
  values: KeyedListData['values']
  operations: KeyedListData['operations']
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
  getValueByKey: (key: string) => any
}

// Subscribes to the full keyed-list value. Use this for consumers that depend on
// the list structure (group/brick keys, activeGroups, …). For a single field's
// value, prefer useKeyedListValue so a change to one field does not re-render here.
export const useKeyedList = (): UseKeyedListReturn => {
  const context = useContext(KeyedListContext)

  if (context === undefined) {
    throw new Error('useKeyedList must be used within a KeyedListProvider')
  }

  const values = useSyncExternalStore(context.store.subscribe, context.store.getSnapshot)

  const getValueByKey = (key: string): any => {
    return values[key]
  }

  return {
    values,
    operations: context.operations,
    getAdditionalComponentProps: context.getAdditionalComponentProps,
    getValueByKey
  }
}
