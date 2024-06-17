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

import React, { useEffect, useState } from 'react'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { Grid } from '@Pimcore/components/grid/grid'
import { useStyles } from './schedule-container.styles'
import { useTranslation } from 'react-i18next'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Button, Result, Segmented, Switch } from 'antd'
import {
  type Schedule, useDeleteScheduleMutation,
  useGetSchedulesForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/schedule-api-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { Icon } from '@Pimcore/components/icon/icon'

type ScheduleTable = Schedule & {
  actions: React.ReactNode
}

export const ScheduleTabContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { context } = useGlobalAssetContext()
  const [scheduleTab, setScheduleTab] = useState<string>('upcoming')
  const [activeOnly, setActiveOnly] = useState<boolean>(true)
  const [deleteSchedule] = useDeleteScheduleMutation()

  if (context === undefined) {
    return <Result title="No context" />
  }

  const { data, isLoading, isError } = useGetSchedulesForElementByTypeAndIdQuery({
    elementType: context.type,
    id: context.config.id
  })

  const [gridDataUpcoming, setGridDataUpcoming] = useState<Schedule[]>([])
  useEffect(() => {
    const currentDate = Math.floor(Date.now() / 1000)

    if (data !== undefined && Array.isArray(data.items)) {
      setGridDataUpcoming(data.items.filter((item) => {
        return item.date > currentDate
      }))
    }
  }, [data])

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const columnHelper = createColumnHelper<ScheduleTable>()
  const columns = [
    columnHelper.accessor('date', {
      header: t('asset.asset-editor-tabs.schedule.columns.date'),
      id: 'schedule-table--date-column',
      meta: {
        type: 'date'
      }
    }),
    columnHelper.accessor('date', {
      header: t('asset.asset-editor-tabs.schedule.columns.time'),
      id: 'schedule-table--time-column',
      meta: {
        type: 'time'
      }
    }),
    columnHelper.accessor('action', {
      header: t('asset.asset-editor-tabs.schedule.columns.action')
    }),
    columnHelper.accessor('version', {
      header: t('asset.asset-editor-tabs.schedule.columns.version')
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

  function filterSchedules (schedules: Schedule[]): Schedule[] {
    if (schedules !== undefined) {
      return schedules.filter((item) => {
        if (activeOnly) {
          return item.active === activeOnly
        }

        return true
      })
    }

    return []
  }

  return (
    <div className={ styles.tab }>
      <ElementToolbar />

      <div className={ 'pimcore-schedule-toolbar' }>
        <div className={ 'pimcore-schedule-toolbar__headline' }>
          <p className={ 'pimcore-schedule-toolbar__headline__text' }>
            {t('asset.asset-editor-tabs.schedule.headline')}
          </p>

          <div className={ 'pimcore-schedule-toolbar__headline__buttons' }>
            <Button icon={ <Icon name={ 'PlusOutlined' } /> }>
              {t('asset.asset-editor-tabs.schedule.toolbar.add')}
            </Button>

            <Button
              className={ 'pimcore-schedule-toolbar__headline__buttons__add' }
              type={ 'primary' }
            >
              {t('asset.asset-editor-tabs.schedule.toolbar.save-scheduled-tasks')}
            </Button>
          </div>
        </div>

        <div className={ 'pimcore-schedule-toolbar__filters' }>
          <Segmented<string>
            onChange={ setScheduleTab }
            options={ [
              { label: t('asset.asset-editor-tabs.schedule.upcoming'), value: 'upcoming' },
              { label: t('asset.asset-editor-tabs.schedule.all'), value: 'all' }
            ] }
          />
          <div className={ 'pimcore-schedule-toolbar__filters__active-switch' }>
            <p>{t('asset.asset-editor-tabs.schedule.toolbar.filters.active-switch')}</p>
            <Switch
              onChange={ setActiveOnly }
              value={ activeOnly }
            />
          </div>
        </div>
      </div>

      <div
        className={ 'pimcore-schedule-content' }
        style={ { marginLeft: 0 } }
      >
        {scheduleTab === 'upcoming' && (
          <Grid
            columns={ columns }
            data={ filterSchedules(gridDataUpcoming ?? []) }
          />
        )}

        {scheduleTab === 'all' && (
          <Grid
            columns={ columns }
            data={ filterSchedules(data.items ?? []) }
          />
        )}
      </div>
    </div>
  )
}
