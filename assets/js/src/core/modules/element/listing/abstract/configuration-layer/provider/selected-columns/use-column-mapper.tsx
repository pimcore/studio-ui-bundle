/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { uuid } from '@Pimcore/utils/uuid'
import { type SelectedColumn } from './selected-columns-provider'

export interface UseColumnMapperReturn {
  encodeColumnIdentifier: (column: SelectedColumn) => string
  decodeColumnIdentifier: (columnIdentifier: string, selectedColumns: SelectedColumn[]) => SelectedColumn | undefined
  shouldMapDataToColumn: (data: any, column: SelectedColumn) => boolean
}

export const useColumnMapper = (): UseColumnMapperReturn => {
  const encodeColumnIdentifier = (column: SelectedColumn): string => {
    return JSON.stringify({
      uuid: uuid(),
      key: column?.key?.replaceAll('.', '**'),
      locale: column.locale
    })
  }

  const decodeColumnIdentifier = (columnIdentifier: string, selectedColumns: SelectedColumn[]): SelectedColumn | undefined => {
    try {
      JSON.parse(columnIdentifier)
    } catch (e) {
      return undefined
    }

    const { key, locale } = JSON.parse(columnIdentifier)
    const formattedKey = key.replaceAll('**', '.')

    return selectedColumns.find(column => column.key === formattedKey && column.locale === locale)!
  }

  const shouldMapDataToColumn = (data: any, column: SelectedColumn): boolean => {
    return data.key === column.key && data.locale === column.locale
  }

  return {
    encodeColumnIdentifier,
    decodeColumnIdentifier,
    shouldMapDataToColumn
  }
}
