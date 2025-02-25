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

import React from 'react'
import { useKeyedList } from '../provider/keyed-list/use-keyed-list'
import { Form } from '../../form'

export interface KeyedListIteratorProps {
  children: React.ReactNode
}

export const KeyedListIterator = ({ children }: KeyedListIteratorProps): React.JSX.Element => {
  const { values } = useKeyedList()

  const getValuesIterator = (): Array<{ key: string, value: any }> => {
    return Object.keys(values).map((key) => {
      return {
        key,
        value: values[key]
      }
    })
  }

  return (
    <>
      {getValuesIterator().map(({ key, value }) => {
        return (
          <Form.Group
            key={ key }
            name={ key }
          >
            {children}
          </Form.Group>
        )
      })}
    </>
  )
}
