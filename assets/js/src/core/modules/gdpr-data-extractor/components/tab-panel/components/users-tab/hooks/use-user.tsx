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
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { UserDeleteJob } from '@Pimcore/modules/execution-engine/jobs/user-delete/user-delete-job'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UseUserReturn {
  deleteUser: (id: number, label: string, onFinish?: () => void) => void
  isLoading: boolean
}

export const useUser = (): UseUserReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const executionEngine = useExecutionEngine()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteUser = (id: number, label: string, onFinish?: () => void): void => {
    modal.confirm({
      title: t('user-management.remove-user'),
      content: <span>{t('user-management.remove-user.text', { name: label })}</span>,
      okText: t('element.delete.confirmation.ok'),
      onOk: async () => {
        setIsLoading(true)
        try {
          const job = new UserDeleteJob({ id })

          await executionEngine.runJob(job)

          onFinish?.()
        } catch (error: any) {
          trackError(new GeneralError(error.message as string))
        } finally {
          setIsLoading(false)
        }
      }
    })
  }

  return {
    deleteUser,
    isLoading
  }
}
