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
import { useStyles } from './schedule-container.styles'
import { useTranslation } from 'react-i18next'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Button, Result, Segmented, Switch } from 'antd'
import {
  type Schedule,
  useGetSchedulesForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/schedule-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/components/table/table'
import { DeleteOutlined } from '@ant-design/icons'

export const ScheduleTabContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { context } = useGlobalAssetContext()
  const [scheduleTab, setScheduleTab] = useState<string>('upcoming')
  const [activeOnly, setActiveOnly] = useState<boolean>(true)

  if (context === undefined) {
    return <Result title="No context" />
  }

  const { data, isLoading, isError } = useGetSchedulesForElementByTypeAndIdQuery({
    elementType: context.type,
    id: context.config.id
  })

  const [gridDataUpcoming, setGridDataUpcoming] = useState<Schedule[]>([])
  const [gridDataArchive, setGridDataArchive] = useState<Schedule[]>([])
  useEffect(() => {
    const currentDate = Math.floor(Date.now() / 1000)

    if (data !== undefined && Array.isArray(data.items)) {
      setGridDataUpcoming(data.items.filter((item) => {
        return item.date > currentDate
      }))

      setGridDataArchive(data.items.filter((item) => {
        return item.date < currentDate
      }))
    }
  }, [data])

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

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
            <Button
              className={ 'pimcore-schedule-toolbar__headline__buttons__add' }
              icon={ <Icon name={ 'PlusOutlined' } /> }
            >
              {t('asset.asset-editor-tabs.schedule.toolbar.add')}
            </Button>

            <Button
              className={ 'pimcore-schedule-toolbar__headline__buttons__save' }
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
        <Table data={ filterSchedules(gridDataUpcoming ?? []) } />

        {scheduleTab === 'all' && (
          <>
            <div className={ 'pimcore-schedule-content__archive__toolbar' }>
              <p className={ 'pimcore-schedule-content__archive__toolbar__headline' }>
                {t('asset.asset-editor-tabs.schedule.archived')}
              </p>
              <Button icon={ <DeleteOutlined /> }>
                {t('asset.asset-editor-tabs.schedule.archived.cleanup-all')}
              </Button>
            </div>
            <Table data={ filterSchedules(gridDataArchive ?? []) } />
          </>
        )}
      </div>
    </div>
  )
}
