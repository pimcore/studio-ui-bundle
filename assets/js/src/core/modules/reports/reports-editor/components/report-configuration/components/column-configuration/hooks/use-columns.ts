/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import {
  COLUMN_KEYS
} from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants'

export const useColumns = (): Array<AccessorKeyColumnDef<unknown, never>> => {
  const columnHelper = createColumnHelper()
  const { t } = useTranslation()

  return [
    columnHelper.accessor(COLUMN_KEYS.ROW_DRAG, { header: '', size: 40 }),
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
      meta: { type: 'checkbox', editable: true }
    }),
    columnHelper.accessor(COLUMN_KEYS.FILTER_TYPE, {
      header: t('reports.editor.manage-column-configuration.filter-type'),
      meta: {
        type: 'select',
        editable: true,
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
      meta: {
        type: 'select',
        editable: true,
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
      meta: { type: 'text-cell', editable: true }
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
