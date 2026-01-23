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
import GeneralError from '@Pimcore/modules/app/error-handler/classes/general-error'
import trackError from '@Pimcore/modules/app/error-handler/error-handler'
import { useUserDeleteByIdMutation } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { ApiError } from '@sdk/modules/app'
import { isUndefined } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UseUserReturn {
  deleteUser: (id: number, label: string, onFinish?: () => void) => void
  deleteUserMutation: (id: number, onFinish?: () => void) => Promise<void>
  isLoading: boolean
}

export const useUser = (): UseUserReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userDeleteMutation] = useUserDeleteByIdMutation()

  const deleteUser = (id: number, label: string, onFinish?: () => void): void => {
    modal.confirm({
      title: t('user-management.remove-user'),
      content: <span>{t('user-management.remove-user.text', { name: label })}</span>,
      okText: t('element.delete.confirmation.ok'),
      onOk: async () => {
        setIsLoading(true)
        try {
          await deleteUserMutation(id, onFinish)

          onFinish?.()
        } catch (error: any) {
          trackError(new GeneralError(error.message as string))
        } finally {
          setIsLoading(false)
        }
      }
    })
  }

  const deleteUserMutation = async (id: number, onFinish?: () => void): Promise<void> => {
    const userDeleteTask = userDeleteMutation({ id })

    try {
      const response = await userDeleteTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
    } catch {
      trackError(new GeneralError('Error deleting user'))
    }
  }

  return {
    deleteUser,
    deleteUserMutation,
    isLoading
  }
}
