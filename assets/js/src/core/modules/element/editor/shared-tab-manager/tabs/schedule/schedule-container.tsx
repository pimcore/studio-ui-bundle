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
import { Switch } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import {
  type Schedule as ApiSchedule,
  useScheduleGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/schedule-api-slice-enhanced'
import {
  Table
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/components/table/table'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import {
  useSaveSchedules
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import { type Schedule } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

export const ScheduleTabContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()
  const [scheduleTab, setScheduleTab] = useState<string>('upcoming')
  const [activeOnly, setActiveOnly] = useState<boolean>(false)
  const { element, schedules, setSchedules, addSchedule, removeSchedule } = useElementDraft(id!, elementType!)
  const { saveSchedules, isLoading: isSaveLoading } = useSaveSchedules(elementType!, id!)

  const { data, isLoading, isError } = useScheduleGetCollectionForElementByTypeAndIdQuery({
    elementType: elementType!,
    id: id!
  })

  useEffect(() => {
    if (data !== undefined && Array.isArray(data.items)) {
      const currentDate = Math.floor(Date.now() / 1000)

      const schedules = data.items.map((item: ApiSchedule): Schedule => {
        return { ...item, archived: item.date !== 0 && item.date < currentDate }
      })
      setSchedules(schedules)
    }
  }, [data])

  const [gridDataUpcoming, setGridDataUpcoming] = useState<Schedule[]>([])
  const [gridDataArchive, setGridDataArchive] = useState<Schedule[]>([])
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

  function filterSchedules (schedules: Schedule[]): Schedule[] {
    return schedules.filter((item: Schedule): boolean => {
      return !activeOnly || item.active
    })
  }

  function cleanupArchivedVersions (): void {
    schedules?.forEach((item) => {
      if (item.archived) {
        removeSchedule(item)
      }
    })
  }

  return (
    <Content
      className={ styles.tab }
      padded
    >
      <Header title={ t('schedule.headline') }>
        <ButtonGroup items={ [
          <IconTextButton
            className={ 'pimcore-schedule-toolbar__headline__buttons__add' }
            icon={ 'PlusCircleOutlined' }
            key={ 'add' }
            onClick={ (): void => {
              addSchedule({
                id: -new Date().getTime(),
                archived: false,
                ctype: 'asset',
                userId: 0,
                username: '',
                date: 0,
                active: true
              })
            } }
          >
            {t('schedule.toolbar.add')}
          </IconTextButton>,

          <Button
            className={ 'pimcore-schedule-toolbar__headline__buttons__save' }
            disabled={ element?.changes.schedules === undefined }
            key={ 'save' }
            loading={ isSaveLoading }
            onClick={ saveSchedules }
            type={ 'primary' }
          >
            {t('schedule.toolbar.save-scheduled-tasks')}
          </Button>
        ] }
        />
      </Header>

      <div className={ 'pimcore-schedule-toolbar__filters' }>
        <Segmented
          onChange={ setScheduleTab }
          options={ [
            { label: t('schedule.upcoming'), value: 'upcoming' },
            { label: t('schedule.all'), value: 'all' }
          ] }
        />
        <div className={ 'pimcore-schedule-toolbar__filters__active-switch' }>
          <p>{t('schedule.toolbar.filters.active-switch')}</p>
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
              {t('schedule.archived')}
            </p>

            <IconTextButton
              disabled={ gridDataArchive.length === 0 }
              icon={ 'trash' }
              onClick={ cleanupArchivedVersions }
            >
              {t('schedule.archived.cleanup-all')}
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
