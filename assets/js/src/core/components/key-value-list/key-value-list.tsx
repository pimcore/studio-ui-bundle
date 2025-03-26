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
import { useTranslation } from 'react-i18next'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'
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

const FIELDS_TO_CONVERT_TO_DATE = ['creationDate', 'modificationDate']

export const KeyValueList = ({ items, skipEmpty = true, skipComplexTypes = true }: KeyValueListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

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

  const renderItem = (item: KeyValueListItem): React.JSX.Element => {
    let fieldValue = item?.value

    if (FIELDS_TO_CONVERT_TO_DATE.includes(item.key)) {
      fieldValue = formatDateTime({ timestamp: item?.value ?? null, dateStyle: 'short', timeStyle: 'short' })
    }

    return (
      <tr key={ item.key }>
        <td>
          <Text>{t(`modal-search.field.${item.key}`)}</Text>
        </td>
        <td>
          <Text>{fieldValue}</Text>
        </td>
      </tr>
    )
  }

  return (
    <table className={ styles.keyValueList }>
      {preparedItems.map((item) => renderItem(item))}
    </table>
  )
}
