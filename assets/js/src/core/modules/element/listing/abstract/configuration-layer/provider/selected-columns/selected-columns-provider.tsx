/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { uuid } from '@Pimcore/utils/uuid'
import React, { createContext, useMemo, useState } from 'react'

export interface SelectedColumn {
  key?: string
  type: string
  config: any
  sortable: boolean
  editable: boolean
  localizable: boolean
  exportable?: boolean
  frontendType?: string
  locale?: string | null
  group?: AvailableColumn['group']
  originalApiDefinition?: Record<string, any>
  meta?: Record<string, any>
}

export interface SelectedColumnsContextProps {
  selectedColumns: SelectedColumn[]
  setSelectedColumns: (columns: SelectedColumn[]) => void
  encodeColumnIdentifier: (column: SelectedColumn) => string
  decodeColumnIdentifier: (columnIdentifier: string) => SelectedColumn | undefined
}

export const SelectedColumnsContext = createContext<SelectedColumnsContextProps>({
  selectedColumns: [],
  setSelectedColumns: () => {},
  encodeColumnIdentifier: () => '',
  decodeColumnIdentifier: () => undefined
})

export interface SelectedColumnsProviderProps {
  children: React.ReactNode
}

export const SelectedColumnsProvider = ({ children }: SelectedColumnsProviderProps): React.JSX.Element => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumn[]>([])

  const formattedSelectedColumns: SelectedColumn[] = useMemo(() => {
    return selectedColumns.map(column => ({
      ...column,
      key: column.originalApiDefinition?.__meta?.advancedColumnConfig?.title ?? column.key
    })) ?? []
  }, [selectedColumns])

  const encodeColumnIdentifier = (column: SelectedColumn): string => {
    let columnIdentifier: Record<string, any> = {
      uuid: uuid(),
      key: column?.key,
      locale: column.locale
    }

    if (column.type === 'dataobject.classificationstore') {
      columnIdentifier = {
        uuid: uuid(),
        locale: column.locale,
        type: column.type,
        config: {
          keyId: column.config?.keyId,
          groupId: column.config?.groupId
        }
      }
    }

    return JSON.stringify(columnIdentifier).replaceAll('.', '*||*')
  }

  const decodeColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => {
    try {
      JSON.parse(columnIdentifier.replaceAll('*||*', '.'))
    } catch (e) {
      return undefined
    }

    const { key, locale, config, type } = JSON.parse(columnIdentifier.replaceAll('*||*', '.'))

    console.log({key, locale, config, type})
    console.log({formattedSelectedColumns})

    if (type === 'dataobject.classificationstore' && config?.keyId !== undefined && config?.groupId !== undefined) {
      // @todo also should check for something unique to identify same classifications in different class properties
      return formattedSelectedColumns.find(column => type === 'dataobject.classificationstore' && column.config?.keyId === config.keyId && column.config?.groupId === config.groupId && column.locale === locale)
    }

    return formattedSelectedColumns.find(column => column.key === key && column.locale === locale)!
  }

  return useMemo(() => (
    <SelectedColumnsContext.Provider value={ { selectedColumns: formattedSelectedColumns, setSelectedColumns, encodeColumnIdentifier, decodeColumnIdentifier } }>
      {children}
    </SelectedColumnsContext.Provider>
  ), [formattedSelectedColumns])
}
