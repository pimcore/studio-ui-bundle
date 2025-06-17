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
import { userProfileUpdated } from '@Pimcore/modules/auth/user/user-slice'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useTranslation } from 'react-i18next'
// import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'

interface UseUserReturn {
  getDefaultKeyBindings: () => Promise<UserDefaultKeyBindingsApiResponse>
  updateUserProfile: (props) => Promise<{ data: UserUpdateProfileApiResponse, error: any }>
}

export const useUserHelper = (): UseUserReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [notificationApi] = useNotification()

  const handleNotification = (successMessage, error): void => {
    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: successMessage
      })
    }
  }

  async function updateUserProfile (props): Promise<{ data: UserUpdateProfileApiResponse, error: Error }> {
    const user = props.user

    const { data, error }: any = await dispatch(api.endpoints.updateUserProfile.initiate({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      active: user.active,
      admin: user.admin,
      classes: user.classes,
      twoFactorAuthenticationEnabled: user.twoFactorAuthenticationEnabled,
      language: user.language,
      welcomeScreen: user.welcomeScreen,
      memorizeTabs: user.memorizeTabs,
      allowDirtyClose: user.allowDirtyClose,
      closeWarning: user.closeWarning,
      permissions: user.permissions,
      parentId: user.parentId ?? 0,
      roles: user.roles,
      contentLanguages: user.contentLanguages,
      websiteTranslationLanguagesEdit: user.websiteTranslationLanguagesEdit,
      websiteTranslationLanguagesView: user.websiteTranslationLanguagesView,
      keyBindings: user.keyBindings,
      assetWorkspaces: user.assetWorkspaces,
      dataObjectWorkspaces: user.dataObjectWorkspaces,
      documentWorkspaces: user.documentWorkspaces,
      perspectives: user.perspectives
    }))

    handleNotification(t('user-management.save-user.success'), error)
    dispatch(userProfileUpdated(data))
    return data
  }

  return {
    updateUserProfile
  } as UseUserReturn
}
