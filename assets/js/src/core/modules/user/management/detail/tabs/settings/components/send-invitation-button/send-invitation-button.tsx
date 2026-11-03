/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { currentDomain } from '@Pimcore/app/config/app-config'
import { routes } from '@Pimcore/app/router/router'
import { Button } from '@Pimcore/components/button/button'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useUserSendInvitationMutation } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'

export interface SendInvitationButtonProps {
  userId: number
  email?: string | null
  lastLogin?: number | null
  disabled?: boolean
}

export const SendInvitationButton = ({
  userId,
  email,
  lastLogin,
  disabled
}: SendInvitationButtonProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const currentUser = useUser()
  const [sendInvitation, { isLoading }] = useUserSendInvitationMutation()

  // Same rule as the Classic UI: an invitation is for somebody who has never been here,
  // and nobody invites themselves.
  const alreadyLoggedIn = lastLogin !== undefined && lastLogin !== null && lastLogin > 0

  if (alreadyLoggedIn || currentUser.id === userId) {
    return null
  }

  const hasEmail = typeof email === 'string' && email.trim().length > 0

  const handleClick = async (): Promise<void> => {
    // The link must land on the reset password route: it logs the user in with the token and
    // opens the profile in reset mode, so the invitee sets a password of their own. The plain
    // login route would drop them at the root holding a password they do not know.
    const { error } = await sendInvitation({
      id: userId,
      invitation: {
        invitationUrl: `${currentDomain}${generatePath(routes.passwordReset)}`
      }
    })

    if (!isUndefined(error)) {
      trackError(new ApiError(error))
      return
    }

    void messageApi.success(t('user-management.send-invitation.success', { email }))
  }

  return (
    <Button
      className="m-t-small"
      disabled={ disabled === true || !hasEmail }
      loading={ isLoading }
      onClick={ () => { void handleClick() } }
      title={ hasEmail ? undefined : t('user-management.send-invitation.no-email') }
      type="default"
    >
      {t('user-management.send-invitation')}
    </Button>
  )
}
