/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
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
  type UserGetAvailablePermissionsApiResponse,
  type UserGetByIdApiResponse,
  type UserGetCollectionApiResponse,
  type PimcoreStudioApiUserSearchApiResponse,
  type UserDefaultKeyBindingsApiResponse,
  type UserUploadImageApiResponse,
  type UserGetTreeApiArg,
  type UserDeleteByIdApiArg,
  type UserFolderDeleteByIdApiArg, type User2, type User, type UserGetImageApiResponse
} from '@Pimcore/modules/user/user-api-slice-enhanced'
import { userOpened, userClosed, userUpdated, changeUser, userImageLoaded } from '@Pimcore/modules/user/user-slice'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useTranslation } from 'react-i18next'
import type { UseTrackableChangesDraftReturn } from '@Pimcore/modules/user/hooks/use-user-trackable-changes'

interface AddItemArgs {
  parentId: number
  name: string
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
  updateUserById: (props: { id: number, user: User2 | User }) => Promise<{ data: UserUpdateByIdApiResponse, error: any }>
  moveUserById: (props: { id: number, parentId: number }) => Promise<{ data: UserUpdateByIdApiResponse, error: any }>
  getAvailablePermissions: (props) => Promise<{ data: UserGetAvailablePermissionsApiResponse, error: any }>
  addNewFolder: (props: AddItemArgs) => Promise<{ data: UserFolderCreateApiResponse, error: any }>
  fetchUserList: () => Promise<UserGetCollectionApiResponse>
  searchUserByText: (query: string) => Promise<PimcoreStudioApiUserSearchApiResponse>
  resetUserKeyBindings: (id: number) => Promise<UserDefaultKeyBindingsApiResponse>
  uploadUserAvatar: (props: { id: number, file: File }) => Promise<{ data: UserUploadImageApiResponse, error: any }>
  fetchUserImageById: (props: { id: number }) => Promise<{ data: UserGetImageApiResponse | undefined, error?: any }>
  activeId: number
  getAllIds: number[]
  availablePermissions: any[]
  getDefaultKeyBindings: () => Promise<UserDefaultKeyBindingsApiResponse>
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

  function openUser (id: number): void {
    dispatch(userOpened(id))
  }

  function closeUser (id: number): void {
    dispatch(userClosed(id))
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
    const { data }: any = await dispatch(api.endpoints.userGetTree.initiate({ parentId }))

    return data
  }

  async function addNewUser (props: AddItemArgs): Promise<{ data: UserCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userCreate.initiate({ body: { parentId, name } }))

    handleNotification(t('user-management.add-user.success'), error)
    return data
  }

  async function addNewFolder (props: AddItemArgs): Promise<{ data: UserFolderCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userFolderCreate.initiate({ body: { parentId, name } }))

    handleNotification(t('user-management.add-folder.success'), error)

    return data
  }

  async function removeUser (props: UserDeleteByIdApiArg): Promise<{ data: UserDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.userDeleteById.initiate({ id }))

    handleNotification(t('user-management.remove-user.success'), error)
    return data
  }

  async function removeFolder (props: UserFolderDeleteByIdApiArg): Promise<{ data: UserFolderDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.userFolderDeleteById.initiate({ id }))

    handleNotification(t('user-management.remove-folder.success'), error)
    return data
  }

  async function cloneUser (props: { id: number, name: string }): Promise<{ data: UserCloneByIdApiResponse, error: Error }> {
    const { id, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userCloneById.initiate({ id, body: { name } }))

    dispatch(userOpened(data.id as number))
    handleNotification(t('user-management.clone-user.success'), error)
    return data
  }

  async function updateUserById (props: { id: number, user: User2 | User }): Promise<{ data: UserUpdateByIdApiResponse, error: Error }> {
    const { id, user } = props

    const { data, error }: any = await dispatch(api.endpoints.userUpdateById.initiate({
      id,
      updateUser: {
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
        documentWorkspaces: user.documentWorkspaces
      }
    }))

    handleNotification(t('user-management.save-user.success'), error)
    dispatch(userUpdated(data))
    return data
  }

  async function moveUserById (props: { id: number, parentId: number }): Promise<{ data: UserUpdateByIdApiResponse, error: Error }> {
    const { id, parentId } = props

    const user = await fetchUserById({ id })
    const { data, error }: any = await dispatch(api.endpoints.userUpdateById.initiate({ id, updateUser: { ...user, parentId } }))

    handleNotification(t('user-management.save-user.success'), error)
    return data
  }

  async function getAvailablePermissions (props): Promise<{ data: UserGetAvailablePermissionsApiResponse, error: Error }> {
    const { data }: any = await dispatch(api.endpoints.userGetAvailablePermissions.initiate())
    return data
  }

  async function uploadUserAvatar (props: { id: number, file: File }): Promise<{ data: UserUploadImageApiResponse, error: Error }> {
    const { data, error }: any = await dispatch(api.endpoints.userUploadImage.initiate({ id: props.id, body: { userImage: props.file } }))

    handleNotification(t('user-management.upload-image.success'), error)
    return data
  }

  async function fetchUserImageById (props): Promise<{ data: UserGetImageApiResponse | undefined, error?: Error }> {
    const { id } = props
    let data

    await fetch(`/pimcore-studio/api/user/image/${id}`)
      .then(async (response) => await response.blob())
      .then((imageBlob) => {
        data = URL.createObjectURL(imageBlob)
        dispatch(userImageLoaded({ id, image: data }))
      }).catch((error) => {
        console.log('error', error)
      })

    return { data }
  }

  const activeId = useAppSelector(state => state.user.activeId)
  const getAllIds = useAppSelector(state => state.user.ids)
  const availablePermissions = useAppSelector(state => state.user.availablePermissions)

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
    getAvailablePermissions,
    fetchUserList,
    searchUserByText,
    resetUserKeyBindings,
    getDefaultKeyBindings,
    uploadUserAvatar,
    fetchUserImageById,
    activeId,
    getAllIds,
    availablePermissions
  }
}
