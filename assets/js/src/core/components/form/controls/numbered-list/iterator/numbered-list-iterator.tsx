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
import { useNumberedList } from '../provider/numbered-list/use-numbered-list'
import NumberedListIteratorItem from './numbered-list-iterator-item'

export interface NumberedListIteratorProps {
  children: React.ReactNode
}

export const NumberedListIterator = ({ children }: NumberedListIteratorProps): React.JSX.Element => {
  const { values } = useNumberedList()

  const valuesIterator = useMemo(() => {
    return Object.keys(values).map((key) => ({
      key,
      value: values[key]
    }))
  }, [values])

  return (
    <>
      {valuesIterator.map(({ key }) => (
        <NumberedListIteratorItem
          itemKey={ key }
          key={ key }
        >
          {children}
        </NumberedListIteratorItem>
      ))}
    </>
  )
}
