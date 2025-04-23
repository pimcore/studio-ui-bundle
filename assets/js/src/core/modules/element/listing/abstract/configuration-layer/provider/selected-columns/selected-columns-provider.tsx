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

import { uuid } from '@Pimcore/utils/uuid'
import React, { createContext, useMemo, useState } from 'react'

export interface SelectedColumn {
  key: string
  type: string
  config: any
  sortable: boolean
  editable: boolean
  localizable: boolean
  exportable?: boolean
  frontendType?: string
  locale?: string
  group?: string
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

  const encodeColumnIdentifier = (column: SelectedColumn): string => {
    return JSON.stringify({
      uuid: uuid(),
      key: column.key.replaceAll('.', '**'),
      locale: column.locale
    })
  }

  const decodeColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => {
    try {
      JSON.parse(columnIdentifier)
    } catch (e) {
      return undefined
    }

    const { key, locale } = JSON.parse(columnIdentifier)
    const formattedKey = key.replaceAll('**', '.')

    return selectedColumns.find(column => column.key === formattedKey && column.locale === locale)!
  }

  return useMemo(() => (
    <SelectedColumnsContext.Provider value={ { selectedColumns, setSelectedColumns, encodeColumnIdentifier, decodeColumnIdentifier } }>
      {children}
    </SelectedColumnsContext.Provider>
  ), [selectedColumns])
}
