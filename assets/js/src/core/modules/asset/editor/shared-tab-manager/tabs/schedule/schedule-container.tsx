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

import React, { useContext, useEffect, useState } from 'react'
import { useStyles } from './schedule-container.styles'
import { useTranslation } from 'react-i18next'
import { Segmented, Switch } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import {
  type Schedule,
  useScheduleGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/schedule-api-slice.gen'
import {
  Table
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/components/table/table'
import {
  useCleanupArchivedSchedules
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/hooks/use-cleanup-archived-schedules'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { type AssetDraftSchedule } from '@Pimcore/modules/asset/asset-draft-slice'

export const ScheduleTabContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const [scheduleTab, setScheduleTab] = useState<string>('upcoming')
  const [activeOnly, setActiveOnly] = useState<boolean>(false)
  const { cleanup, isLoading: deleteArchivedSchedulesLoading } = useCleanupArchivedSchedules()
  const { schedules, setSchedules, addSchedule } = useAssetDraft(id!)

  const { data, isLoading, isError } = useScheduleGetCollectionForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: id!
  })

  useEffect(() => {
    if (data !== undefined && Array.isArray(data.items)) {
      const currentDate = Math.floor(Date.now() / 1000)

      const schedules = data.items.map((item: Schedule): AssetDraftSchedule => {
        return { ...item, hidden: activeOnly && !item.active, archived: item.date !== 0 && item.date < currentDate }
      })
      setSchedules(schedules)
    }
  }, [data])

  const [gridDataUpcoming, setGridDataUpcoming] = useState<AssetDraftSchedule[]>([])
  const [gridDataArchive, setGridDataArchive] = useState<AssetDraftSchedule[]>([])
  useEffect(() => {
    if (schedules !== undefined && schedules.length > 0) {
      setGridDataUpcoming(schedules.filter((item) => {
        return !item.archived
      }))

      setGridDataArchive(schedules.filter((item) => {
        return item.archived
      }))
    }
  }, [schedules])

  if (isLoading || data === undefined) {
    return <Content loading />
  }

  if (isError) {
    return <div>Error</div>
  }

  function filterSchedules (schedules: AssetDraftSchedule[]): AssetDraftSchedule[] {
    return schedules.filter((item: AssetDraftSchedule): boolean => {
      return !activeOnly || item.active
    })
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
            icon={ 'PlusCircleOutlined' }
            key={ 'add' }
            onClick={ (): void => {
              addSchedule({
                id: -new Date().getTime(),
                archived: false,
                hidden: false,
                ctype: 'asset',
                userId: 0,
                username: '',
                date: 0,
                active: true
              })
            } }
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

            <IconTextButton
              disabled={ gridDataArchive.length === 0 }
              icon={ 'trash' }
              loading={ deleteArchivedSchedulesLoading }
              onClick={ cleanupArchivedVersions }
            >
              {t('asset.asset-editor-tabs.schedule.archived.cleanup-all')}
            </IconTextButton>
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
