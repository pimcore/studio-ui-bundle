/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useKeyedList } from '../provider/keyed-list/use-keyed-list'
import KeyedListIteratorItem from './keyed-list-iterator-item'

export interface KeyedListIteratorProps {
  children: React.ReactNode
}

export const KeyedListIterator = ({ children }: KeyedListIteratorProps): React.JSX.Element => {
  const { values } = useKeyedList()

  const valuesIterator = useMemo(() => {
    return Object.keys(values).map((key) => ({
      key,
      value: values[key]
    }))
  }, [values])

  return (
    <>
      {valuesIterator.map(({ key }) => (
        <KeyedListIteratorItem
          itemKey={ key }
          key={ key }
        >
          {children}
        </KeyedListIteratorItem>
      ))}
    </>
  )
}
