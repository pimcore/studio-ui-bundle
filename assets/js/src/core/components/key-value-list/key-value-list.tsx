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

import { isEmpty } from 'lodash'
import React from 'react'
import { useStyles } from './key-value-list.styles'

export interface KeyValueListItem {
  key: string
  value: string
}

export interface KeyValueListProps {
  items: KeyValueListItem[]
  skipEmpty?: boolean
  skipComplexTypes?: boolean
}

export const KeyValueList = ({ items, skipEmpty = true, skipComplexTypes = true }: KeyValueListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const preparedItems: KeyValueListItem[] = []

  items.forEach((item) => {
    if (skipEmpty && isEmpty(item.value)) {
      return
    }

    if (skipComplexTypes && (typeof item.value === 'object' || Array.isArray(item.value))) {
      return
    }

    preparedItems.push(item)
  })

  return (
    <table className={ styles.keyValueList }>
      {preparedItems.map((item) => (
        <tr key={ item.key }>
          <td>{item.key}</td>
          <td>{item.value}</td>
        </tr>
      ))}
    </table>
  )
}
