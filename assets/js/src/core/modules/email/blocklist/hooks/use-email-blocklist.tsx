/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { ApiError, GeneralError, trackError } from '@sdk/modules/app'
import { useTranslation } from 'react-i18next'
import { useEmailBlocklistAddMutation, useEmailBlocklistDeleteMutation } from '../../emails-api-slice.gen'
import { isUndefined } from 'lodash'
import { useMessage } from '@Pimcore/components/message/useMessage'

interface UseEmailBlocklistHookReturn {
  addNewEmail: (onFinish?: () => void) => Promise<void>
  removeEmail: (email: string, onFinish?: () => void) => Promise<void>
}

export const useEmailBlocklist = (): UseEmailBlocklistHookReturn => {
  const modal = useFormModal()
  const { t } = useTranslation()
  const [emailBlocklistAddMutation] = useEmailBlocklistAddMutation()
  const [emailBlocklistDeleteMutation] = useEmailBlocklistDeleteMutation()
  const { success } = useMessage()

  const addNewEmail = async (onFinish?: (value: string) => void): Promise<void> => {
    modal.input({
      title: t('email-blocklist.add.label'),
      label: t('email-blocklist.add.email-address.label'),
      rule: {
        required: true,
        type: 'email',
        message: t('email-blocklist.add.validation')
      },
      onOk: async (value: string) => {
        await addNewEmailMutation(value, () => {
          onFinish?.(value)
        })
      }
    })
  }

  const addNewEmailMutation = async (email: string, onFinish?: () => void): Promise<void> => {
    const emailToBlocklistTask = emailBlocklistAddMutation({
      emailAddressParameter: {
        email
      }
    })

    try {
      const response = await emailToBlocklistTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
      void success(t('email-blocklist.add.email.success'))
    } catch (error) {
      trackError(new GeneralError('Failed to add email to blocklist'))
    }
  }

  const removeEmail = async (email: string, onFinish?: () => void): Promise<void> => {
    const deleteEmailTask = emailBlocklistDeleteMutation({
      email
    })

    try {
      const response = await deleteEmailTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
    } catch (error) {
      trackError(new GeneralError('Failed to remove email from blocklist'))
    }
  }

  return {
    addNewEmail,
    removeEmail
  }
}
