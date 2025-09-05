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
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { Grid } from '@Pimcore/components/grid/grid'

export const ColumnConfiguration = ({ currentData, updateFormData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper()

  const tableColumns = [
    columnHelper.accessor('name', {
      header: 'Name',
      meta: {
        type: 'text-cell'
      }
    }),
    columnHelper.accessor('display', {
      header: 'Display',
      meta: {
        type: 'checkbox',
        editable: true
      }
    }),
    columnHelper.accessor('export', {
      header: 'Export',
      meta: {
        type: 'checkbox',
        editable: true
      }
    }),
    columnHelper.accessor('order', {
      header: 'Order',
      meta: {
        type: 'checkbox',
        editable: true
      }
    })
  ]

  const handleUpdateCellData = ({ rowIndex, columnId, value }): void => {
    const updatedColumnConfigurations = currentData?.columnConfigurations?.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, [columnId]: value }
      }

      return item
    })

    updateFormData?.({
      ...currentData,
      columnConfigurations: updatedColumnConfigurations
    })
  }

  return (
    <FormKit.Panel title={ t('reports.editor.manage-column-configuration.title') }>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ currentData?.columnConfigurations }
        onUpdateCellData={ handleUpdateCellData }
      />
    </FormKit.Panel>
  )
}
