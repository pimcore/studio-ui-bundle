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

import { useEffect } from 'react'
import {
  type UpdateSchedule,
  useScheduleUpdateForElementByTypeAndIdMutation
} from '@Pimcore/modules/element/editor/schedule-api-slice.gen'
import { type ElementType } from 'types/element-type.d'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { type Schedule } from '@Pimcore/modules/asset/asset-draft-slice'

interface UseCleanupArchivedSchedulesResponseInterface {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  saveSchedules: () => Promise<void>
}

export const useSaveSchedules = (elementType: ElementType, id: number, showNotifications: boolean = true): UseCleanupArchivedSchedulesResponseInterface => {
  const [updateSchedulesApi, { isLoading, isSuccess, isError }] = useScheduleUpdateForElementByTypeAndIdMutation()
  const { asset, schedules, resetSchedulesChanges } = useAssetDraft(id)
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
    if (isError && showNotifications) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error(t('save-failed'))
    }
  }, [isError])

  const saveSchedules = async (): Promise<void> => {
    if (asset?.changes.schedules === undefined) {
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

  return { isLoading, isSuccess, isError, saveSchedules }
}
