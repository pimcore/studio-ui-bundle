/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@sdk/app'
import {
  api,
  type Error,
  type UserDefaultKeyBindingsApiResponse, UserUpdateProfileApiResponse,
} from '@Pimcore/modules/auth/user/user-api-slice-enhanced'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useTranslation } from 'react-i18next'
import { userProfileUpdated } from '@Pimcore/modules/auth/user/user-slice'

interface UseUserReturn {
  getDefaultKeyBindings: () => Promise<UserDefaultKeyBindingsApiResponse>
  updateUserProfile: (user) => Promise<{ data: UserUpdateProfileApiResponse, error: any }>
}

export const useUserHelper = (): UseUserReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [notificationApi] = useNotification()

  const handleNotification = (successMessage, error): void => {
    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: error.data?.message ?? t('user-management.save-user.error'),
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: successMessage
      })
    }
  }

  async function updateUserProfile (user): Promise<{ data: UserUpdateProfileApiResponse, error: Error }> {
    if (user.modifiedCells !== undefined) {
      user = {
        ...user,
        ...user.modifiedCells
      }
    }

    const { data, error }: any = await dispatch(api.endpoints.userUpdateProfile.initiate({
      updateUserProfile: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        language: user.language,
        dateTimeLocale: user.dateTimeLocale,
        welcomeScreen: user.welcomeScreen,
        memorizeTabs: user.memorizeTabs,
        contentLanguages: user.contentLanguages,
        keyBindings: user.keyBindings
      }
    }))

    handleNotification(t('user-management.save-user.success'), error)

    dispatch(userProfileUpdated(data))
    return data
  }

  return {
    updateUserProfile
  } as UseUserReturn
}
