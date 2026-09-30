/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useTwoFactorAuthentication } from '@Pimcore/modules/auth/hooks/use-two-factor-authentication'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface TwoFactorResetButtonProps {
  userId: number
  isTwoFactorActive: boolean
}

export const TwoFactorResetButton = ({ userId, isTwoFactorActive }: TwoFactorResetButtonProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const messageApi = useMessage()
  const currentUser = useUser()
  const { isAvailable, resetUserTwoFactor } = useTwoFactorAuthentication()
  const [isReset, setIsReset] = useState<boolean>(false)

  // Same rule as the backend: admins may reset anyone, other users only themselves
  const mayReset = currentUser.isAdmin || currentUser.id === userId

  if (!isAvailable || !isTwoFactorActive || isReset || !mayReset) {
    return null
  }

  const handleClick = (): void => {
    modal.confirm({
      title: t('user-management.two-factor-authentication.reset.confirmation.title'),
      content: t('user-management.two-factor-authentication.reset.confirmation.text'),
      okText: t('user-management.two-factor-authentication.reset'),
      onOk: async () => {
        try {
          await resetUserTwoFactor(userId)
          setIsReset(true)
          await messageApi.success(t('user-management.two-factor-authentication.reset.success'))
        } catch {
          await messageApi.error(t('user-management.two-factor-authentication.reset.error'))
        }
      }
    })
  }

  return (
    <Button
      className="m-t-small"
      onClick={ handleClick }
      type="default"
    >
      {t('user-management.two-factor-authentication.reset')}
    </Button>
  )
}
