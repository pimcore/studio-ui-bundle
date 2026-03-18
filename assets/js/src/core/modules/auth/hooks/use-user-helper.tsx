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
  type Error, type UserUpdateProfileApiResponse
} from '@Pimcore/modules/auth/user/user-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { userProfileUpdated, userProfileImageUpdated } from '@Pimcore/modules/auth/user/user-slice'
import { type KeyBindingForAUser } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useMessage } from '@Pimcore/components/message/useMessage'

interface UseUserReturn {
  updateUserProfile: (user) => Promise<{ data: UserUpdateProfileApiResponse, error: any }>
  getUserImageById: (id: number) => Promise<string | undefined>
  updateUserImageInState: (image: string, hasImage: boolean) => void
}

interface IBlobResponse {
  data: string
}

export const useUserHelper = (): UseUserReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const messageApi = useMessage()

  const handleNotification = async (successMessage: string, error?: any): Promise<void> => {
    if (error !== undefined) {
      await messageApi.error((error.data?.message as string) ?? t('user-management.save-user.error'))
    } else {
      await messageApi.success(successMessage)
    }
  }

  async function updateUserProfile (user): Promise<{ data: UserUpdateProfileApiResponse, error: Error }> {
    if (user.modifiedCells !== undefined) {
      const mergedKeyBindings = Array.from(([...(user.keyBindings ?? []), ...(user.modifiedCells.keyBindings ?? [])].reduce(
        (map, item: KeyBindingForAUser) => map.set(item.action, item), new Map<string, KeyBindingForAUser>()) as Map<string, KeyBindingForAUser>
      ).values()
      )

      const { keyBindings, ...restModifiedCells } = user.modifiedCells

      user = {
        ...user,
        ...restModifiedCells,
        keyBindings: mergedKeyBindings
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

    if (user?.modifiedCells?.password !== undefined || user?.modifiedCells?.passwordConfirmation !== undefined || user?.modifiedCells?.oldPassword !== undefined) {
      const { error: passwordError }: any = await dispatch(api.endpoints.userUpdatePasswordById.initiate({
        id: user.id,
        body: {
          password: user.modifiedCells?.password,
          passwordConfirmation: user.modifiedCells?.passwordConfirmation,
          oldPassword: user.modifiedCells?.oldPassword
        }
      }))

      await handleNotification(t('user-management.save-user.password.success'), passwordError)
      dispatch(userProfileUpdated(data))
      return data
    }

    await handleNotification(t('user-management.save-user.success'), error)

    if (data !== undefined) {
      dispatch(userProfileUpdated(data))
    }
    return data
  }

  async function getUserImageById (id: number): Promise<string | undefined> {
    const result = await dispatch(api.endpoints.userGetImage.initiate({ id }))

    const blobResponse = result.data as IBlobResponse | undefined

    return blobResponse?.data
  }

  function updateUserImageInState (image: string, hasImage: boolean): void {
    dispatch(userProfileImageUpdated({ data: { image, hasImage } }))
  }

  return {
    updateUserProfile, getUserImageById, updateUserImageInState
  }
}
