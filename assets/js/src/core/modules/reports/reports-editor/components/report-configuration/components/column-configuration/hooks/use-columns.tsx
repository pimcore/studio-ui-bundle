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
import { type AccessorKeyColumnDef, type CellContext, createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { COLUMN_KEYS } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants'
import { DefaultCell, type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { addColumnMeta } from '@Pimcore/components/grid/columns/helpers'

export const useColumns = (): Array<AccessorKeyColumnDef<unknown, never>> => {
  const columnHelper = createColumnHelper()
  const { t } = useTranslation()

  const withEditable = (cellData: CellContext<unknown, unknown>, editable: boolean): DefaultCellProps => (
    addColumnMeta(cellData, { editable })
  )

  return [
    columnHelper.accessor(COLUMN_KEYS.NAME, {
      header: t('reports.editor.manage-column-configuration.name'),
      meta: { type: 'text-cell' }
    }),
    columnHelper.accessor(COLUMN_KEYS.DISPLAY, {
      header: t('reports.editor.manage-column-configuration.display'),
      meta: { type: 'checkbox', editable: true }
    }),
    columnHelper.accessor(COLUMN_KEYS.EXPORT, {
      header: t('reports.editor.manage-column-configuration.export'),
      meta: { type: 'checkbox', editable: true }
    }),
    columnHelper.accessor(COLUMN_KEYS.ORDER, {
      header: t('reports.editor.manage-column-configuration.order'),
      cell: (cellData: CellContext<any, any>) => {
        const disableOrderBy: boolean = cellData.row.original.disableOrderBy

        return <DefaultCell { ...withEditable(cellData, !disableOrderBy) } />
      },
      meta: { type: 'checkbox' }
    }),
    columnHelper.accessor(COLUMN_KEYS.FILTER_TYPE, {
      header: t('reports.editor.manage-column-configuration.filter-type'),
      cell: (cellData: CellContext<any, any>) => {
        const disableFilterable: boolean = cellData.row.original.disableFilterable

        return <DefaultCell { ...withEditable(cellData, !disableFilterable) } />
      },
      meta: {
        type: 'select',
        config: {
          options: [
            { label: t('reports.editor.manage-column-configuration.filter-type.empty'), value: '' },
            { label: t('reports.editor.manage-column-configuration.filter-type.text'), value: 'string' },
            { label: t('reports.editor.manage-column-configuration.filter-type.number'), value: 'numeric' },
            { label: t('reports.editor.manage-column-configuration.filter-type.date'), value: 'date' },
            { label: t('reports.editor.manage-column-configuration.filter-type.bool'), value: 'boolean' }
          ]
        }
      }
    }),
    columnHelper.accessor(COLUMN_KEYS.DISPLAY_TYPE, {
      header: t('reports.editor.manage-column-configuration.display-type'),
      meta: {
        type: 'select',
        editable: true,
        config: {
          options: [
            { label: t('reports.editor.manage-column-configuration.display-type.none'), value: '' },
            { label: t('reports.editor.manage-column-configuration.display-type.text'), value: 'text' },
            { label: t('reports.editor.manage-column-configuration.display-type.date'), value: 'date' },
            { label: t('reports.editor.manage-column-configuration.display-type.hide'), value: 'hide' }
          ]
        }
      }
    }),
    columnHelper.accessor(COLUMN_KEYS.FILTER_DRILLDOWN, {
      header: t('reports.editor.manage-column-configuration.filter-drilldown'),
      cell: (cellData: CellContext<any, any>) => {
        const disableDropdownFilterable: boolean = cellData.row.original.disableDropdownFilterable

        return <DefaultCell { ...withEditable(cellData, !disableDropdownFilterable) } />
      },
      meta: {
        type: 'select',
        config: {
          options: [
            { label: t('reports.editor.manage-column-configuration.filter-drilldown.empty'), value: '' },
            { label: t('reports.editor.manage-column-configuration.filter-drilldown.only-filter'), value: 'only_filter' },
            { label: t('reports.editor.manage-column-configuration.filter-drilldown.filter-and-show'), value: 'filter_and_show' }
          ]
        }
      }
    }),
    columnHelper.accessor(COLUMN_KEYS.WIDTH, {
      header: t('reports.editor.manage-column-configuration.width'),
      meta: { type: 'number', editable: true }
    }),
    columnHelper.accessor(COLUMN_KEYS.LABEL, {
      header: t('reports.editor.manage-column-configuration.label'),
      cell: (cellData: CellContext<any, any>) => {
        const disableLabel: boolean = cellData.row.original.disableLabel

        return <DefaultCell { ...withEditable(cellData, !disableLabel) } />
      },
      meta: {
        type: 'text-cell'
      }
    }),
    columnHelper.accessor(COLUMN_KEYS.ACTION, {
      header: t('reports.editor.manage-column-configuration.action'),
      meta: {
        type: 'select',
        editable: true,
        config: {
          options: [
            { label: t('reports.editor.manage-column-configuration.action.none'), value: '' },
            { label: t('reports.editor.manage-column-configuration.action.open-document'), value: 'openDocument' },
            { label: t('reports.editor.manage-column-configuration.action.open-asset'), value: 'openAsset' },
            { label: t('reports.editor.manage-column-configuration.action.open-object'), value: 'openObject' },
            { label: t('reports.editor.manage-column-configuration.action.open-url'), value: 'openUrl' }
          ]
        }
      }
    })
  ]
}
