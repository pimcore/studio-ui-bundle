/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type SendEmailParameters, useNotificationSendMutation } from '../notifications-slice.gen'

interface UseNotificationReturn {
  sendNotification: (notification: SendEmailParameters, onSuccess?: () => void) => Promise<void>
  isLoading: boolean
}

export const useNotification = (): UseNotificationReturn => {
  const [sendNotificationMutation, { isLoading }] = useNotificationSendMutation()

  const sendNotification = async (notification: SendEmailParameters, onSuccess?: () => void): Promise<void> => {
    const sendNottificationTask = sendNotificationMutation({
      sendNotificationParameters: notification
    })

    try {
      const response = (await sendNottificationTask)

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      if (onSuccess !== undefined) {
        onSuccess()
      }
    } catch (error: any) {
      trackError(new GeneralError(error.message as string))
    }
  }

  return {
    sendNotification,
    isLoading
  }
}
