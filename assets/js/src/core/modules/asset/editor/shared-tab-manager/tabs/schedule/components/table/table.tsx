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
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Button, Result } from 'antd'
import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Icon } from '@Pimcore/components/icon/icon'
import { type Schedule, useDeleteScheduleMutation } from '@Pimcore/modules/element/editor/schedule-api-slice.gen'
import { Grid } from '@Pimcore/components/grid/grid'
import { useStyles } from './table.styles'

type ScheduleTable = Schedule & {
  actions: React.ReactNode
}

export const Table = ({ data }: { data: Schedule[] }): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { context } = useGlobalAssetContext()
  const [deleteSchedule] = useDeleteScheduleMutation()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  const columnHelper = createColumnHelper<ScheduleTable>()
  const columns = [
    columnHelper.accessor('date', {
      header: t('asset.asset-editor-tabs.schedule.columns.date'),
      id: 'schedule-table--date-column',
      meta: {
        type: 'date',
        editable: true
      }
    }),
    columnHelper.accessor('date', {
      header: t('asset.asset-editor-tabs.schedule.columns.time'),
      id: 'schedule-table--time-column',
      meta: {
        type: 'time',
        editable: true
      }
    }),
    columnHelper.accessor('action', {
      header: t('asset.asset-editor-tabs.schedule.columns.action'),
      id: 'schedule-table--action-column',
      meta: {
        type: 'schedule-actions-select',
        editable: true
      }
    }),
    columnHelper.accessor('version', {
      header: t('asset.asset-editor-tabs.schedule.columns.version'),
      id: 'schedule-table--version-column',
      meta: {
        type: 'version-id-select',
        editable: true
      },
      size: 80
    }),
    columnHelper.accessor('active', {
      header: t('asset.asset-editor-tabs.schedule.columns.active'),
      id: 'schedule-table--active-column',
      size: 60,
      meta: {
        type: 'checkbox',
        editable: true
      }
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.schedule.columns.actions'),
      cell: (info) => {
        return (
          <div className={ 'schedule-table--actions-column' }>
            <Button
              icon={ <Icon name="trash" /> }
              onClick={ (): void => {
                deleteSchedule({ id: info.row.original.id })
                  .unwrap()
                  .catch((error) => {
                    console.error(error)
                  })
              } }
              type="link"
            />
          </div>
        )
      },
      size: 70
    })
  ]

  function onUpdateCellData ({ rowIndex, columnId, value, rowData }): void {
    if (columnId === 'schedule-table--version-column') {
      const updatedSchedules = [...(data ?? [])]
      const scheduleToUpdate = { ...updatedSchedules.find((schedule) => schedule.id === rowData.id) }

      scheduleToUpdate.version = value

      console.log('updated Schedule', scheduleToUpdate)
    }
  }

  return (
    <div className={ styles.table }>
      <Grid
        columns={ columns }
        data={ data }
        onUpdateCellData={ onUpdateCellData }
      />
    </div>
  )
}
