/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch, useAppSelector } from '@sdk/app'
import {
  api,
  type UserCreateApiResponse,
  type UserGetTreeApiResponse,
  type UserDeleteByIdApiResponse,
  type UserCloneByIdApiResponse,
  type UserUpdateByIdApiResponse,
  type UserFolderCreateApiResponse,
  type UserFolderDeleteByIdApiResponse,
  type Error,
  type UserGetByIdApiResponse,
  type UserGetCollectionApiResponse,
  type PimcoreStudioApiUserSearchApiResponse,
  type UserDefaultKeyBindingsApiResponse,
  type UserUploadImageApiResponse,
  type UserGetTreeApiArg,
  type UserDeleteByIdApiArg,
  type UserFolderDeleteByIdApiArg,
  type User,
  type User2,
  type UserGetAvailablePermissionsApiResponse
} from '@Pimcore/modules/user/user-api-slice-enhanced'
import {
  userOpened,
  userClosed,
  userUpdated,
  changeUser,
  userAvailablePermissionsFetched,
  type UserDraft
} from '@Pimcore/modules/user/user-management-slice'
import { useTranslation } from 'react-i18next'
import type { UseTrackableChangesDraftReturn } from '@Pimcore/modules/user/hooks/use-user-management-trackable-changes'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { usePerspectives } from '@Pimcore/modules/perspectives/hooks/use-perspectives'
import { useMessage } from '@Pimcore/components/message/useMessage'

interface AddItemArgs {
  parentId: number
  name: string
}

interface IUser extends User {
  password?: string
}

interface UseUserReturn extends
  UseTrackableChangesDraftReturn {
  openUser: (id: number) => void
  closeUser: (id: number) => void
  getUserTree: (props: UserGetTreeApiArg) => Promise<UserGetTreeApiResponse>
  addNewUser: (props: AddItemArgs) => Promise<{ data: UserCreateApiResponse, error: any }>
  removeUser: (props: UserDeleteByIdApiArg) => Promise<{ data: UserDeleteByIdApiResponse, error: any }>
  removeFolder: (props: UserFolderDeleteByIdApiArg) => Promise<{ data: UserFolderDeleteByIdApiResponse, error: any }>
  cloneUser: (props: { id: number, name: string }) => Promise<{ data: UserCloneByIdApiResponse, error: any }>
  updateUserById: (props: { id: number, user: IUser }) => Promise<{ data: UserUpdateByIdApiResponse, error: any }>
  moveUserById: (props: { id: number, parentId: number }) => Promise<{ data: UserUpdateByIdApiResponse, error: any }>
  addNewFolder: (props: AddItemArgs) => Promise<{ data: UserFolderCreateApiResponse, error: any }>
  fetchUserList: () => Promise<UserGetCollectionApiResponse>
  searchUserByText: (query: string) => Promise<PimcoreStudioApiUserSearchApiResponse>
  resetUserKeyBindings: (id: number) => Promise<UserDefaultKeyBindingsApiResponse>
  uploadUserAvatar: (props: { id: number, file: File }) => Promise<{ data: UserUploadImageApiResponse, error: any }>
  deleteUserAvatar: (id: number) => Promise<{ data: UserUploadImageApiResponse, error: any }>
  activeId: number
  getAllIds: number[]
  getAvailablePermissions: () => any[]
  getDefaultKeyBindings: () => Promise<UserDefaultKeyBindingsApiResponse>
}

export const useUserManagementHelper = (): UseUserReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const messageApi = useMessage()
  const activeId = useAppSelector(state => state.user.activeId)
  const getAllIds = useAppSelector(state => state.user.ids)
  const currentUser = useUser()
  const { refreshPerspectives } = usePerspectives()

  const handleNotification = async (successMessage: string, error?: any): Promise<void> => {
    if (error !== undefined) {
      await messageApi.error((error?.data?.message as string) ?? t('error'))
    } else {
      await messageApi.success(successMessage)
    }
  }

  function openUser (id: number): void {
    dispatch(userOpened(id))
  }

  function closeUser (id: number): void {
    dispatch(userClosed({ id, allIds: getAllIds }))
  }

  async function fetchUserById (props): Promise<UserGetByIdApiResponse> {
    const { id } = props
    const { data }: any = await dispatch(api.endpoints.userGetById.initiate({ id }))
    return data
  }

  async function fetchUserList (): Promise<UserGetCollectionApiResponse> {
    const { data }: any = await dispatch(api.endpoints.userGetCollection.initiate())
    return data
  }
  async function searchUserByText (query: string): Promise<PimcoreStudioApiUserSearchApiResponse> {
    const { data }: any = await dispatch(api.endpoints.pimcoreStudioApiUserSearch.initiate({ searchQuery: query }))
    return data
  }

  async function getDefaultKeyBindings (): Promise<UserDefaultKeyBindingsApiResponse> {
    const { data }: any = await dispatch(api.endpoints.userDefaultKeyBindings.initiate())
    return data
  }

  async function resetUserKeyBindings (id: number): Promise<UserDefaultKeyBindingsApiResponse> {
    const data = await getDefaultKeyBindings()
    dispatch(changeUser({ id, changes: { keyBindings: data.items } }))
    return data
  }

  async function getUserTree (props: UserGetTreeApiArg): Promise<UserGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.userGetTree.initiate({ parentId }, { forceRefetch: true }))
    return data
  }

  async function addNewUser (props: AddItemArgs): Promise<{ data: UserCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userCreate.initiate({ body: { parentId, name } }))
    await handleNotification(t('user-management.add-user.success'), error)
    return data
  }

  async function addNewFolder (props: AddItemArgs): Promise<{ data: UserFolderCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userFolderCreate.initiate({ body: { parentId, name } }))
    await handleNotification(t('user-management.add-folder.success'), error)

    return data
  }

  async function removeUser (props: UserDeleteByIdApiArg): Promise<{ data: UserDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.userDeleteById.initiate({ id }))
    await handleNotification(t('user-management.remove-user.success'), error)
    return data
  }

  async function removeFolder (props: UserFolderDeleteByIdApiArg): Promise<{ data: UserFolderDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.userFolderDeleteById.initiate({ id }))
    await handleNotification(t('user-management.remove-folder.success'), error)
    return data
  }

  async function cloneUser (props: { id: number, name: string }): Promise<{ data: UserCloneByIdApiResponse, error: Error }> {
    const { id, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userCloneById.initiate({ id, body: { name } }))

    dispatch(userOpened(data.id as number))
    await handleNotification(t('user-management.clone-user.success'), error)
    return data
  }

  async function updateUserById (props: { id: number, user: IUser }): Promise<{ data: UserUpdateByIdApiResponse, error: Error }> {
    const { id, user } = props

    const updateUser: User2 = {
      ...user,
      twoFactorAuthenticationRequired: user?.twoFactorAuthentication?.required ?? false,
      parentId: user.parentId ?? 0,
      dateTimeLocale: user.dateTimeLocale ?? ''
    }

    const { data, error }: any = await dispatch(api.endpoints.userUpdateById.initiate({
      id,
      updateUser
    }))

    if (user.password === undefined) {
      await handleNotification(t('user-management.save-user.success'), error)
    } else {
      const { error: passwordError }: any = await dispatch(api.endpoints.userUpdatePasswordById.initiate({
        id,
        body: {
          password: user.password,
          passwordConfirmation: user.password
        }
      }))

      await handleNotification(t('user-management.save-user.success'), passwordError)
    }

    if (currentUser.id === id && !currentUser.isAdmin) {
      void refreshPerspectives()
    }

    const userDraft: UserDraft = {
      ...data,
      modified: false,
      changes: {},
      modifiedCells: {}
    }
    dispatch(userUpdated(userDraft))
    return data
  }

  async function moveUserById (props: { id: number, parentId: number }): Promise<{ data: UserUpdateByIdApiResponse, error: Error }> {
    const { id, parentId } = props

    const user = await fetchUserById({ id })
    const { data, error }: any = await dispatch(api.endpoints.userUpdateById.initiate({ id, updateUser: { ...user, parentId, twoFactorAuthenticationRequired: user?.twoFactorAuthentication?.required ?? false, dateTimeLocale: user.dateTimeLocale ?? '' } }))
    await handleNotification(t('user-management.save-user.success'), error)
    return data
  }

  async function uploadUserAvatar (props: { id: number, file: File }): Promise<{ data: UserUploadImageApiResponse, error: Error }> {
    const { data, error }: any = await dispatch(api.endpoints.userUploadImage.initiate({ id: props.id, body: { userImage: props.file } }))
    await handleNotification(t('user-management.upload-image.success'), error)
    return data
  }

  async function deleteUserAvatar (id: number): Promise<{ data: UserUploadImageApiResponse, error: Error }> {
    const { data, error }: any = await dispatch(api.endpoints.userImageDeleteById.initiate({ id }))
    await handleNotification(t('user-management.upload-image.success'), error)

    return data
  }

  async function fetchUserAvailablePermissions (): Promise<UserGetAvailablePermissionsApiResponse> {
    const { data, isError: isFetchUserAvailablePermissionsError, error } = await dispatch(api.endpoints.userGetAvailablePermissions.initiate())
    if (data !== undefined) {
      dispatch(userAvailablePermissionsFetched(data))
      return data
    }
    if (isFetchUserAvailablePermissionsError) {
      trackError(new ApiError(error))
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as UserGetAvailablePermissionsApiResponse
  }

  const getAvailablePermissions = (): any[] => {
    let availablePermissions = useAppSelector(state => state.user.availablePermissions)
    if (availablePermissions.length === 0) {
      fetchUserAvailablePermissions().then((data) => {
        availablePermissions = data.items
      }).catch((error) => {
        console.error(error)
      })
    }
    return availablePermissions
  }

  return {
    removeTrackedChanges (): void {},
    setModifiedCells (type: string, modifiedCells): void {},
    openUser,
    closeUser,
    getUserTree,
    addNewUser,
    addNewFolder,
    removeUser,
    cloneUser,
    removeFolder,
    updateUserById,
    moveUserById,
    fetchUserList,
    searchUserByText,
    resetUserKeyBindings,
    getDefaultKeyBindings,
    uploadUserAvatar,
    deleteUserAvatar,
    getAvailablePermissions,
    activeId,
    getAllIds
  }
}
