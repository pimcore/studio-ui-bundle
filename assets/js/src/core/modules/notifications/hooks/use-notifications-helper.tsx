/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import {
  api,
  NotificationReadByIdApiResponse
} from '../notifications-slice-enhanced'

interface INotificationsHelperProps {
  setNotificationReadById: (id: number) => Promise<NotificationReadByIdApiResponse>
}

export const useNotificationsHelper = (): INotificationsHelperProps => {
  const dispatch = useAppDispatch()

  async function setNotificationReadById(id: number): Promise<NotificationReadByIdApiResponse> {
    const {data} = await dispatch(api.endpoints.notificationReadById.initiate({ id }))
    return data
  }

  return {
    setNotificationReadById
  }
}
