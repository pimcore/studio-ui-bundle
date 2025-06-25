/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import React, { createContext, useMemo, useState } from 'react'
import { type GridColumnConfiguration as AssetGridColumnConfig } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type GridColumnConfiguration as ObjectGridColumnConfig } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useTranslation } from 'react-i18next'

// @todo: Create a union type for all the different element types
export type AvailableColumn = (AssetGridColumnConfig | ObjectGridColumnConfig) & {
  __meta?: {
    uniqueId?: string
    advancedColumnConfig?: Record<string, any>
    [key: string]: any
  }
}

export interface OnMenuItemClickEvent {
  column: AvailableColumn
}

export type OnMenuItemClick = (column: AvailableColumn) => void

export interface AvailableColumnsData {
  availableColumns: AvailableColumn[]
  setAvailableColumns: (availableColumns: AvailableColumn[]) => void
  getAvailableColumnsDropdown: (menuClickHandler: OnMenuItemClick) => DropdownProps
}

export type AvailableColumnsContextProps = AvailableColumnsData | undefined

export const AvailableColumnsContext = createContext<AvailableColumnsContextProps>(undefined)

export interface AvailableColumnsProviderProps {
  children: React.ReactNode
}

export const AvailableColumnsProvider = ({ children }: AvailableColumnsProviderProps): React.JSX.Element => {
  const [availableColumns, setAvailableColumns] = useState<AvailableColumnsData['availableColumns']>([])
  const { t } = useTranslation()

  const getAvailableColumnsDropdown: AvailableColumnsData['getAvailableColumnsDropdown'] = useMemo(() => {
    return (onMenuItemClick: OnMenuItemClick): DropdownProps => {
      let index = 0
      const columnsMappedByGroup: Record<string, AvailableColumn[]> = {}

      availableColumns.forEach((column) => {
        if (columnsMappedByGroup[column.group] === undefined) {
          columnsMappedByGroup[column.group] = []
        }

        columnsMappedByGroup[column.group].push(column)
      })

      return {
        menu: {
          items: Object.entries(columnsMappedByGroup).map(([key, value]) => ({
            key: index++,
            label: t(key),
            children: value.map((column) => {
              let translationKey = `${column.key}`

              if ('fieldDefinition' in column.config) {
                const fieldDefinition = column.config.fieldDefinition as Record<string, any>
                translationKey = fieldDefinition?.title ?? column.key
              }

              return {
                key: column.key,
                label: t(translationKey),
                group: column.group,
                frontendType: column.frontendType,
                editable: column.editable,
                onClick: () => {
                  onMenuItemClick(column)
                }
              }
            })
          }))
        }
      }
    }
  }, [availableColumns])

  return useMemo(() => (
    <AvailableColumnsContext.Provider value={ { availableColumns, setAvailableColumns, getAvailableColumnsDropdown } }>
      {children}
    </AvailableColumnsContext.Provider>
  ), [availableColumns])
}
