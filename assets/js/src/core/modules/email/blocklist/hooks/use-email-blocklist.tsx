import { useFormModal } from "@Pimcore/components/modal/form-modal/hooks/use-form-modal";
import { ApiError, GeneralError, trackError } from "@sdk/modules/app";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEmailBlocklistAddMutation, useEmailBlocklistDeleteMutation } from "../../emails-api-slice.gen";

interface UseEmailBlocklistHookReturn {
  addNewEmail: (onFinish?: () => void) => void;
  removeEmail: (email: string, onFinish?: () => void) => void;
}

export const useEmailBlocklist = (): UseEmailBlocklistHookReturn => {
  const modal = useFormModal()
  const { t } = useTranslation()
  const [emailBlocklistAddMutation] = useEmailBlocklistAddMutation()
  const [emailBlocklistDeleteMutation] = useEmailBlocklistDeleteMutation()

  const addNewEmail = (onFinish?: (value: string) => void) => {
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

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
    } catch (error) {
      trackError(new GeneralError('Failed to add email to blocklist'))
      return
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
      return
    }
  }

  return {
    addNewEmail,
    removeEmail
  }
}