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

import { useTranslation } from 'react-i18next'
import React, { useContext, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Grid } from '@Pimcore/components/grid/grid'
import { useStyles } from './table.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { type AssetDraftSchedule } from '@Pimcore/modules/asset/asset-draft-slice'

type ScheduleTable = AssetDraftSchedule & {
  actions: React.ReactNode
}

export const Table = ({ data }: { data: AssetDraftSchedule[] }): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { updateSchedule, removeSchedule } = useAssetDraft(id!)
  const [modifiedCells, setModifiedCells] = useState<Array<{ rowIndex: string, columnId: string }>>([])

  const columnHelper = createColumnHelper<ScheduleTable>()
  const columns = [
    columnHelper.accessor('date', {
      header: t('asset.asset-editor-tabs.schedule.columns.datetime'),
      meta: {
        type: 'date',
        editable: true,
        config: {
          showTime: true
        }
      },
      size: 200
    }),
    columnHelper.accessor('action', {
      header: t('asset.asset-editor-tabs.schedule.columns.action'),
      meta: {
        type: 'schedule-actions-select',
        editable: true
      }
    }),
    columnHelper.accessor('version', {
      header: t('asset.asset-editor-tabs.schedule.columns.version'),
      meta: {
        type: 'version-id-select',
        editable: true
      },
      size: 80
    }),
    columnHelper.accessor('active', {
      header: t('asset.asset-editor-tabs.schedule.columns.active'),
      size: 60,
      meta: {
        type: 'checkbox',
        config: {
          align: 'center'
        },
        editable: true
      }
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.schedule.columns.actions'),
      cell: (info) => {
        return (
          <div className={ 'schedule-table--actions-column' }>
            <IconButton
              icon={ 'trash' }
              onClick={ (): void => {
                removeSchedule(info.row.original)
              } }
              type="link"
            />
          </div>
        )
      },
      size: 70
    })
  ]

  const getRowId = (row: any): string => {
    return String(row.id)
  }

  const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
    const updatedSchedules = [...(data ?? [])]
    const scheduleToUpdate: AssetDraftSchedule | undefined = updatedSchedules.find((schedule) => schedule.id === rowData.id)
    if (scheduleToUpdate === undefined) {
      return
    }

    const updatedSchedule: AssetDraftSchedule = { ...scheduleToUpdate, [columnId]: value }
    updateSchedule(updatedSchedule)
    console.log('..', rowIndex, columnId, rowData)
    setModifiedCells([...modifiedCells, { rowIndex: getRowId(rowData), columnId }])
  }
  return (
    <div className={ styles.table }>
      <Grid
        columns={ columns }
        data={ data }
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        setRowId={ getRowId }
      />
    </div>
  )
}
