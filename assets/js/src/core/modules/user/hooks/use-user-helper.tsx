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
  type PimcoreStudioApiUserSearchApiResponse, type UserDefaultKeyBindingsApiResponse, type UserUploadImageApiResponse
} from '@Pimcore/modules/user/user-api-slice.gen'
import { userOpened, userClosed, userUpdated, changeUser } from '@Pimcore/modules/user/user-slice'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useTranslation } from 'react-i18next'
import type {
  UseTrackableChangesDraftReturn
} from '@Pimcore/modules/user/hooks/use-user-trackable-changes'

interface UseUserReturn extends
  UseTrackableChangesDraftReturn {
  openUser: (id) => void
  closeUser: (id) => void
  getUserTree: (props) => Promise<UserGetTreeApiResponse>
  addNewUser: ({ parentId, name }) => Promise<{ data: UserCreateApiResponse, error: any }>
  removeUser: (props) => Promise<{ data: UserDeleteByIdApiResponse, error: any }>
  removeFolder: (props) => Promise<{ data: UserFolderDeleteByIdApiResponse, error: any }>
  cloneUser: (props) => Promise<{ data: UserCloneByIdApiResponse, error: any }>
  updateUserById: (props) => Promise<{ data: UserUpdateByIdApiResponse, error: any }>
  moveUserById: (props) => Promise<{ data: UserUpdateByIdApiResponse, error: any }>
  getAvailablePermissions: (props) => Promise<{ data: UserGetAvailablePermissionsApiResponse, error: any }>
  addNewFolder: ({ parentId, name }) => Promise<{ data: UserFolderCreateApiResponse, error: any }>
  fetchUserList: () => Promise<UserGetCollectionApiResponse>
  searchUserByText: (query) => Promise<PimcoreStudioApiUserSearchApiResponse>
  resetUserKeyBindings: (id) => Promise<UserDefaultKeyBindingsApiResponse>
  uploadUserAvatar: (props) => Promise<{ data: UserUploadImageApiResponse, error: any }>
  activeId: number
  getAllIds: number[]
  availablePermissions: any[]
}

export const useUserHelper = (): UseUserReturn => {
  const { t } = useTranslation()
  const [notificationApi] = useNotification()
  const dispatch = useAppDispatch()

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
  async function searchUserByText (query): Promise<PimcoreStudioApiUserSearchApiResponse> {
    const { data }: any = await dispatch(api.endpoints.pimcoreStudioApiUserSearch.initiate({ searchQuery: query }))

    return data
  }

  async function resetUserKeyBindings (id): Promise<UserDefaultKeyBindingsApiResponse> {
    const { data }: any = await dispatch(api.endpoints.userDefaultKeyBindings.initiate())

    dispatch(changeUser({ id, changes: { keyBindings: data.items } }))

    return data
  }

  async function getUserTree (props): Promise<UserGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.userGetTree.initiate({ parentId }))

    return data
  }

  async function addNewUser ({ parentId, name }): Promise<{ data: UserCreateApiResponse, error: Error }> {
    const { data, error }: any = await dispatch(api.endpoints.userCreate.initiate({ body: { parentId, name } }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.add-user.success')
      })
    }

    return data
  }

  async function addNewFolder ({ parentId, name }): Promise<{ data: UserFolderCreateApiResponse, error: Error }> {
    const { data, error }: any = await dispatch(api.endpoints.userFolderCreate.initiate({ body: { parentId, name } }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.add-folder.success')
      })
    }

    return data
  }

  async function removeUser (props): Promise<{ data: UserDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.userDeleteById.initiate({ id }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.remove-user.success')
      })
    }

    return data
  }

  async function removeFolder (props): Promise<{ data: UserFolderDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.userFolderDeleteById.initiate({ id }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.remove-folder.success')
      })
    }

    return data
  }

  async function cloneUser (props): Promise<{ data: UserCloneByIdApiResponse, error: Error }> {
    const { id, name } = props
    const { data, error }: any = await dispatch(api.endpoints.userCloneById.initiate({ id, body: { name } }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.clone-user.success')
      })
    }

    return data
  }

  async function updateUserById (props): Promise<{ data: UserUpdateByIdApiResponse, error: Error }> {
    const { id, user } = props

    const { data, error }: any = await dispatch(api.endpoints.userUpdateById.initiate({ id, updateUser: { ...user } }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.save-user.success')
      })

      dispatch(userUpdated(data))
    }

    return data
  }

  async function moveUserById (props): Promise<{ data: UserUpdateByIdApiResponse, error: Error }> {
    const { id, parentId } = props

    const user = await fetchUserById({ id })
    const { data, error }: any = await dispatch(api.endpoints.userUpdateById.initiate({ id, updateUser: { ...user, parentId: parentId as number } }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.save-user.success')
      })
    }

    return data
  }

  async function getAvailablePermissions (props): Promise<{ data: UserGetAvailablePermissionsApiResponse, error: Error }> {
    const { data }: any = await dispatch(api.endpoints.userGetAvailablePermissions.initiate())
    return data
  }

  async function uploadUserAvatar (props): Promise<{ data: UserUploadImageApiResponse, error: Error }> {
    const formData = new FormData()
    formData.append('userImage', props.file as File)

    const { data, error }: any = await dispatch(api.endpoints.userUploadImage.initiate({ id: props.id, body: formData }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('user-management.upload-avatar.success')
      })
    }
    return data
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
    uploadUserAvatar,
    activeId,
    getAllIds,
    availablePermissions
  }
}
