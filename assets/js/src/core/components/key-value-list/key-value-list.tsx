/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isEqual, isObject } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Text } from '@Pimcore/components/text/text'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { useStyles } from './key-value-list.styles'

export interface KeyValueListItem {
  key: string
  value: string
  withoutTranslate?: boolean
}

export interface KeyValueListProps {
  items: KeyValueListItem[]
  skipEmpty?: boolean
  skipComplexTypes?: boolean
}

const FIELDS_TO_CONVERT_TO_DATE = ['creationDate', 'modificationDate']
const SPECIAL_DATA_TYPES = ['documentData', 'objectData']

export const KeyValueList = ({ items, skipEmpty = true }: KeyValueListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const preparedItems: KeyValueListItem[] = []

  const shouldSkipValue = (value: any): boolean => skipEmpty && (isEmptyValue(value) || isEqual(value, false))

  items.forEach((item) => {
    if (shouldSkipValue(item?.value)) {
      return
    }

    if (SPECIAL_DATA_TYPES.includes(item.key)) {
      if (isObject(item.value)) {
        const renderObjectValue = (objectValue: object): void => {
          Object.entries(objectValue).forEach(([key, value]) => {
            if (shouldSkipValue(value)) {
              return
            }

            if (isObject(value)) {
              renderObjectValue(value)
            } else {
              preparedItems.push({ key, value, withoutTranslate: item.key === 'objectData' })
            }
          })
        }

        renderObjectValue(item.value)
      }
    } else {
      preparedItems.push(item)
    }
  })

  const renderItem = (item: KeyValueListItem): React.JSX.Element => {
    let fieldValue: any = item?.value

    if (FIELDS_TO_CONVERT_TO_DATE.includes(item.key)) {
      fieldValue = formatDateTime({ timestamp: item?.value ?? null, dateStyle: 'short', timeStyle: 'short' })
    }

    return (
      <tr key={ item.key }>
        <td>
          <Text>{item?.withoutTranslate === true ? item.key : t(`modal-search.field.${item.key}`)}</Text>
        </td>
        <td>
          <Text>
            {fieldValue === 0 ? fieldValue : <SanitizeHtml html={ fieldValue ?? '' } /> }
          </Text>
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
