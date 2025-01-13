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
import { userOpened, userClosed } from '@Pimcore/modules/user/user-slice'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useTranslation } from 'react-i18next'
import { api } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import type {
  Error,
  RoleCloneByIdApiResponse,
  RoleCreateApiResponse, RoleDeleteByIdApiArg,
  RoleDeleteByIdApiResponse, RoleFolderCreateApiResponse, RoleFolderDeleteByIdApiArg,
  RoleGetTreeApiArg,
  RoleGetTreeApiResponse
} from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { type RoleFolderDeleteByIdApiResponse } from '@Pimcore/modules/roles/role-api-slice.gen'

interface IAddItemArgs {
  parentId: number
  name: string
}

interface IUseRoleReturn {
  openRole: (id: number) => void
  closeRole: (id: number) => void
  getRoleTree: (props: RoleGetTreeApiArg) => Promise<RoleGetTreeApiResponse>
  addNewRole: (props: IAddItemArgs) => Promise<{ data: RoleCreateApiResponse, error: any }>
  removeRole: (props: RoleDeleteByIdApiArg) => Promise<{ data: RoleDeleteByIdApiResponse, error: any }>
  removeFolder: (props: RoleFolderDeleteByIdApiArg) => Promise<{ data: RoleFolderDeleteByIdApiResponse, error: any }>
  cloneRole: (props: { id: number, name: string }) => Promise<{ data: RoleCloneByIdApiResponse, error: any }>
  addNewFolder: (props: IAddItemArgs) => Promise<{ data: RoleFolderCreateApiResponse, error: any }>
  activeId: number
  getAllIds: number[]
}

export const useRoleHelper = (): IUseRoleReturn => {
  const { t } = useTranslation()
  const [notificationApi] = useNotification()
  const dispatch = useAppDispatch()

  function openRole (id: number): void {
    dispatch(userOpened(id))
  }

  function closeRole (id: number): void {
    dispatch(userClosed(id))
  }

  async function getRoleTree (props: RoleGetTreeApiArg): Promise<RoleGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.roleGetTree.initiate({ parentId }))

    return data
  }

  async function addNewRole (props: IAddItemArgs): Promise<{ data: RoleCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.roleCreate.initiate({ body: { parentId, name } }))

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

  async function addNewFolder (props: AddItemArgs): Promise<{ data: RoleFolderCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.roleFolderCreate.initiate({ body: { parentId, name } }))

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

  async function removeRole (props: RoleDeleteByIdApiArg): Promise<{ data: RoleDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.roleDeleteById.initiate({ id }))

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

  async function removeFolder (props: RoleFolderDeleteByIdApiArg): Promise<{ data: RoleFolderDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.roleFolderDeleteById.initiate({ id }))

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

  async function cloneRole (props: { id: number, name: string }): Promise<{ data: RoleCloneByIdApiResponse, error: Error }> {
    const { id, name } = props
    const { data, error }: any = await dispatch(api.endpoints.roleCloneById.initiate({ id, body: { name } }))

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

  const activeId = useAppSelector(state => state.user.activeId)
  const getAllIds = useAppSelector(state => state.user.ids)

  return {
    openRole,
    closeRole,
    getRoleTree,
    addNewRole,
    addNewFolder,
    removeRole,
    cloneRole,
    removeFolder,
    activeId,
    getAllIds
  }
}
