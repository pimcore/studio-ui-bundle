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

import { useEffect, useState } from 'react'
import {
  type UpdateSchedule,
  useScheduleUpdateForElementByTypeAndIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { type Schedule } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'

interface UseCleanupArchivedSchedulesResponseInterface {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
  saveSchedules: () => Promise<void>
}

export const useSaveSchedules = (elementType: ElementType, id: number, showNotifications: boolean = true): UseCleanupArchivedSchedulesResponseInterface => {
  const [updateSchedulesApi, { isLoading, isSuccess: isApiSuccess, isError, error }] = useScheduleUpdateForElementByTypeAndIdMutation()
  const [isSuccess, setIsSuccess] = useState(false)
  const { element, schedules, resetSchedulesChanges } = useElementDraft(id, elementType)
  const messageApi = useMessage()
  const { t } = useTranslation()

  useEffect(() => {
    if (isSuccess) {
      if (showNotifications) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        messageApi.success(t('save-success'))
      }
      resetSchedulesChanges()
    }
  }, [isSuccess])

  useEffect(() => {
    setIsSuccess(isApiSuccess)
  }, [isApiSuccess])

  useEffect(() => {
    if (isError && showNotifications) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error(t('save-failed'))
    }
  }, [isError])

  const saveSchedules = async (): Promise<void> => {
    if (element?.changes.schedules === undefined) {
      setIsSuccess(true)
      return
    }
    await updateSchedulesApi({
      elementType,
      id,
      body: {
        items: schedules?.map((schedule: Schedule): UpdateSchedule => ({
          id: schedule.id > 0 ? schedule.id : null,
          date: schedule.date,
          action: schedule.action,
          version: schedule.version,
          active: schedule.active
        }))
      }
    })
  }

  return { isLoading, isSuccess, isError, error, saveSchedules }
}
