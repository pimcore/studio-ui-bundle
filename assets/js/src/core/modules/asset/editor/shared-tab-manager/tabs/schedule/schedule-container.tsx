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
import { useStyles } from './schedule-container.styles'
import { useTranslation } from 'react-i18next'
import { Segmented, Switch } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import {
  type Schedule,
  useScheduleGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/schedule-api-slice.gen'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/components/table/table'
import { DeleteOutlined } from '@ant-design/icons'
import {
  useCleanupArchivedSchedules
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/hooks/use-cleanup-archived-schedules'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

export const ScheduleTabContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { id } = useAsset()
  const [scheduleTab, setScheduleTab] = useState<string>('upcoming')
  const [activeOnly, setActiveOnly] = useState<boolean>(true)
  const { cleanup, isLoading: deleteArchivedSchedulesLoading } = useCleanupArchivedSchedules()

  const { data, isLoading, isError } = useScheduleGetCollectionForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: id!
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
    return <Content loading />
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

  function cleanupArchivedVersions (): void {
    void cleanup({ ids: gridDataArchive.map((item) => item.id) })
  }

  return (
    <Content
      className={ styles.tab }
      padded
    >
      <Header title={ t('asset.asset-editor-tabs.schedule.headline') }>
        <ButtonGroup items={ [
          <IconTextButton
            className={ 'pimcore-schedule-toolbar__headline__buttons__add' }
            icon={ 'PlusOutlined' }
            key={ 'add' }
          >
            {t('asset.asset-editor-tabs.schedule.toolbar.add')}
          </IconTextButton>,

          <Button
            className={ 'pimcore-schedule-toolbar__headline__buttons__save' }
            key={ 'save' }
            type={ 'primary' }
          >
            {t('asset.asset-editor-tabs.schedule.toolbar.save-scheduled-tasks')}
          </Button>
        ] }
        />
      </Header>

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
            {/* @todo check button and icon */}
            <Button
              disabled={ gridDataArchive.length === 0 }
              icon={ <DeleteOutlined /> }
              loading={ deleteArchivedSchedulesLoading }
              onClick={ cleanupArchivedVersions }
            >
              {t('asset.asset-editor-tabs.schedule.archived.cleanup-all')}
            </Button>
          </div>

          <Table
            data={ filterSchedules(gridDataArchive ?? []) }
          />
        </>
        )}
      </div>
    </Content>
  )
}
