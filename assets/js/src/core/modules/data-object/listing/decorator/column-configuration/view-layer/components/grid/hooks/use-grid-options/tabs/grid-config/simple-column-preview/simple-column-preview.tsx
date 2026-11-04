/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import { createColumnHelper } from '@tanstack/react-table'
import { Text } from '@Pimcore/components/text/text'
import { Grid } from '@Pimcore/components/grid/grid'
import { GridContentRenderer } from '@Pimcore/components/grid-content-renderer/grid-content-renderer'
import { ColumnPreview } from '@Pimcore/components/preview-mode/column-preview'
import { usePreviewModeOptional } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import {
  type DataObjectGetGridApiArg,
  type DataObjectGetGridApiResponse,
  useDataObjectGetGridQuery
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

type GridRow = DataObjectGetGridApiResponse['items'][number]

interface SimpleColumnPreviewsContextValue {
  isLoading: boolean
  hasError: boolean
  /** Undefined until a row was requested */
  row?: GridRow
  hasItem: boolean
  getLocale: (column: AvailableColumn) => string | null | undefined
}

const SimpleColumnPreviewsContext = createContext<SimpleColumnPreviewsContextValue | undefined>(undefined)

const isSimpleColumn = (column: AvailableColumn): boolean => column.key !== 'advanced' && column.type !== 'dataobject.advanced'

export interface SimpleColumnPreviewsProviderProps {
  /** All columns of the list; the advanced ones are left out of the request */
  columns: AvailableColumn[]
  children?: React.ReactNode
}

/** Loads the values of all simple columns for the preview item with a single grid request */
export const SimpleColumnPreviewsProvider = ({ columns, children }: SimpleColumnPreviewsProviderProps): React.JSX.Element => {
  const { enabled, item, fallbackItem, language: previewLanguage } = usePreviewModeOptional()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { currentLanguage } = useLanguageSelection()

  const itemId = item?.data?.id ?? fallbackItem?.id

  const getLocale = (column: AvailableColumn): string | null | undefined => {
    if (!column.localizable) {
      return undefined
    }
    const locale = column.locale ?? previewLanguage ?? currentLanguage
    return locale === 'default' ? null : locale
  }

  const requestColumns = useMemo(() => columns.filter(isSimpleColumn).map((column) => ({
    key: column.key,
    type: column.type,
    locale: getLocale(column),
    group: column.group as unknown as string[] | undefined,
    config: column.config
  })), [columns, currentLanguage, previewLanguage])

  const skip = !enabled || itemId === undefined || selectedClassDefinition === undefined || requestColumns.length === 0

  const { currentData, isFetching, error } = useDataObjectGetGridQuery({
    classId: selectedClassDefinition?.id ?? '',
    body: {
      folderId: 1,
      columns: requestColumns as DataObjectGetGridApiArg['body']['columns'],
      filters: {
        page: 1,
        pageSize: 1,
        includeDescendants: true,
        columnFilters: [{ type: 'system.ids', filterValue: [itemId] }]
      }
    }
  }, { skip })

  // `data` keeps the previous arguments' result while a changed request loads; `currentData` does not
  const isLoading = isFetching && currentData === undefined

  const value = useMemo(() => ({
    isLoading,
    hasError: error !== undefined,
    row: currentData?.items?.[0],
    hasItem: itemId !== undefined,
    getLocale
  }), [isLoading, error, currentData, itemId, currentLanguage, previewLanguage])

  return <SimpleColumnPreviewsContext.Provider value={ value }>{children}</SimpleColumnPreviewsContext.Provider>
}

const columnHelper = createColumnHelper()

export interface SimpleColumnPreviewProps {
  column: AvailableColumn
}

/** The value of a simple column for the preview item, rendered with the grid's cell renderers */
export const SimpleColumnPreview = ({ column }: SimpleColumnPreviewProps): React.JSX.Element | null => {
  const context = useContext(SimpleColumnPreviewsContext)
  const { t } = useTranslation()
  const { useGridOptions, useColumnMapper } = useSettings()
  const { transformGridColumn } = useGridOptions()
  const { shouldMapDataToColumn } = useColumnMapper()

  if (context === undefined) {
    return null
  }

  const { isLoading, hasError, row, hasItem, getLocale } = context
  const locale = getLocale(column)
  const rowColumn = row?.columns?.find((c) => {
    if (column.type === 'dataobject.classificationstore') {
      // The mapper falls back to the UI language for a missing locale: hand it the resolved preview locale
      const mapped = { ...column, locale: locale === null ? 'default' : locale ?? column.locale } as unknown as SelectedColumn
      return shouldMapDataToColumn(c, mapped)
    }
    return c.key === column.key && (locale === undefined || (c.locale ?? null) === locale)
  })

  return (
    <ColumnPreview>
      {() => {
        if (!hasItem) {
          return <Text type="secondary">{t('grid.advanced-column.no-preview')}</Text>
        }

        if (isLoading) {
          return <Spin size="small" />
        }

        if (hasError) {
          return <Text type="danger">{t('grid.advanced-column.error-preview-data')}</Text>
        }

        if (rowColumn === undefined) {
          return <Text type="secondary">{t('grid.advanced-column.no-preview-data')}</Text>
        }

        const accessor = 'value'
        const columnDefinition = transformGridColumn(column as unknown as SelectedColumn)
        const accessorOptions: Parameters<typeof columnHelper.accessor>[1] = {
          ...columnDefinition,
          meta: { ...columnDefinition.meta, editable: false }
        }
        const gridColumn = columnHelper.accessor(accessor, accessorOptions)

        return (
          <GridContentRenderer>
            <Grid
              autoWidth
              columns={ [gridColumn] }
              data={ [{ [accessor]: rowColumn.value }] }
              hideColumnHeaders
            />
          </GridContentRenderer>
        )
      }}
    </ColumnPreview>
  )
}
