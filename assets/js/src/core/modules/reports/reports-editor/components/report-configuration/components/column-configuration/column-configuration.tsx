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
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { isEqual, isNil } from 'lodash'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { Grid } from '@Pimcore/components/grid/grid'
import { useColumns } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns'

export const ColumnConfiguration = ({ currentData, updateFormData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()

  const tableColumns = useColumns()
  const columnConfigurationsData = currentData?.columnConfigurations

  const handleUpdateCellData = ({ rowIndex, columnId, value }): void => {
    const updatedColumnConfigurations = columnConfigurationsData?.map((item, index) => {
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

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    if (!isNil(active) && !isNil(over) && !isEqual(active.id, over.id)) {
      const oldIndex = columnConfigurationsData?.findIndex(row => row.id === active.id)
      const newIndex = columnConfigurationsData?.findIndex(row => row.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const reorderedColumnConfigurations = arrayMove(columnConfigurationsData, oldIndex, newIndex)

      updateFormData?.({
        ...currentData,
        columnConfigurations: reorderedColumnConfigurations
      })
    }
  }

  return (
    <FormKit.Panel title={ t('reports.editor.manage-column-configuration.title') }>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ columnConfigurationsData }
        enableRowDrag
        handleDragEnd={ handleDragEnd }
        onUpdateCellData={ handleUpdateCellData }
        resizable
        setRowId={ (originalRow) => originalRow.id }
      />
    </FormKit.Panel>
  )
}
