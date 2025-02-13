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
import { useTranslation } from 'react-i18next'
import { Switch } from '@Pimcore/components/switch/switch'
import { Button } from '@Pimcore/components/button/button'
import {
  type Schedule as ApiSchedule,
  useScheduleGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced'
import {
  Table
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/components/table/table'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { type Schedule } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useSaveSchedules } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'

export const ScheduleTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()
  const [scheduleTab, setScheduleTab] = useState<string>('upcoming')
  const [activeOnly, setActiveOnly] = useState<boolean>(false)
  const { element, schedules, setSchedules, addSchedule, removeSchedule } = useElementDraft(id, elementType)
  const { saveSchedules, isLoading: isSaveLoading } = useSaveSchedules(elementType, id)

  const { data, isLoading, isError } = useScheduleGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id
  })

  useEffect(() => {
    if (data !== undefined && element?.changes.schedules === undefined && Array.isArray(data.items)) {
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
    if (schedules !== undefined) {
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
      padded
    >
      <Header title={ t('schedule.headline') }>
        <ButtonGroup items={ [
          <IconTextButton
            className={ 'pimcore-schedule-toolbar__headline__buttons__add' }
            icon={ { value: 'new' } }
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
            {t('schedule.toolbar.new')}
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

      <Flex
        align={ 'center' }
        justify={ 'space-between' }
      >
        <Segmented
          onChange={ setScheduleTab }
          options={ [
            { label: t('schedule.upcoming'), value: 'upcoming' },
            { label: t('schedule.all'), value: 'all' }
          ] }
        />

        <Space
          className={ 'pimcore-schedule-toolbar__filters__active-switch' }
          size='extra-small'
        >
          <Switch
            labelLeft={ t('schedule.toolbar.filters.active-switch') }
            onChange={ setActiveOnly }
            value={ activeOnly }
          />
        </Space>
      </Flex>

      <div
        className={ 'pimcore-schedule-content' }
        style={ { marginLeft: 0 } }
      >

        <Table data={ filterSchedules(gridDataUpcoming ?? []) } />

        {scheduleTab === 'all' && (
          <>
            <Box padding={ { y: 'small' } }>
              <Space>
                <Text strong>
                  {t('schedule.archived')}
                </Text>

                <IconTextButton
                  disabled={ gridDataArchive.length === 0 }
                  icon={ { value: 'trash' } }
                  onClick={ cleanupArchivedVersions }
                >
                  {t('schedule.archived.cleanup-all')}
                </IconTextButton>
              </Space>
            </Box>
            <Table
              data={ filterSchedules(gridDataArchive ?? []) }
            />
          </>
        )}
      </div>
    </Content>
  )
}
