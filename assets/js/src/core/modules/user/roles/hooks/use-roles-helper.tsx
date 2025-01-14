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
import { itemOpened, itemClosed } from '@Pimcore/modules/user/roles/roles-slice'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useTranslation } from 'react-i18next'
import { api } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import type {
  Error,
  RoleCloneByIdApiResponse,
  RoleCreateApiResponse, RoleDeleteByIdApiArg,
  RoleDeleteByIdApiResponse, RoleFolderCreateApiResponse, RoleFolderDeleteByIdApiArg,
  RoleGetTreeApiArg,
  RoleGetTreeApiResponse,
  RoleUpdateByIdApiResponse,
  DetailedUserRole,
  RoleFolderDeleteByIdApiResponse,
  RoleGetByIdApiResponse
} from '@Pimcore/modules/user/roles/roles-api-slice.gen'

interface IAddItemArgs {
  parentId: number
  name: string
}

interface IUseRoleReturn {
  openItem: (id: number) => void
  closeItem: (id: number) => void
  getItemTree: (props: RoleGetTreeApiArg) => Promise<RoleGetTreeApiResponse>
  addNewItem: (props: IAddItemArgs) => Promise<{ data: RoleCreateApiResponse, error: any }>
  removeItem: (props: RoleDeleteByIdApiArg) => Promise<{ data: RoleDeleteByIdApiResponse, error: any }>
  removeFolder: (props: RoleFolderDeleteByIdApiArg) => Promise<{ data: RoleFolderDeleteByIdApiResponse, error: any }>
  cloneItem: (props: { id: number, name: string }) => Promise<{ data: RoleCloneByIdApiResponse, error: any }>
  addNewFolder: (props: IAddItemArgs) => Promise<{ data: RoleFolderCreateApiResponse, error: any }>
  updateItemById: (props: { id: number, item: DetailedUserRole }) => Promise<{ data: RoleUpdateByIdApiResponse, error: any }>
  moveItemById: (props: { id: number, parentId: number }) => Promise<{ data: RoleUpdateByIdApiResponse, error: any }>
  activeId: number
  getAllIds: number[]
}

export const useRoleHelper = (): IUseRoleReturn => {
  const { t } = useTranslation()
  const [notificationApi] = useNotification()
  const dispatch = useAppDispatch()

  function openItem (id: number): void {
    dispatch(itemOpened(id))
  }

  function closeItem (id: number): void {
    dispatch(itemClosed(id))
  }

  async function fetchItemById (props): Promise<RoleGetByIdApiResponse> {
    const { id } = props
    const { data }: any = await dispatch(api.endpoints.roleGetById.initiate({ id }))

    return data
  }

  async function getItemTree (props: RoleGetTreeApiArg): Promise<RoleGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.roleGetTree.initiate({ parentId }))

    return data
  }

  async function addNewItem (props: IAddItemArgs): Promise<{ data: RoleCreateApiResponse, error: Error }> {
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
        message: t('roles.add-item.success')
      })
    }

    return data
  }

  async function addNewFolder (props: IAddItemArgs): Promise<{ data: RoleFolderCreateApiResponse, error: Error }> {
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
        message: t('roles.add-folder.success')
      })
    }

    return data
  }

  async function removeItem (props: RoleDeleteByIdApiArg): Promise<{ data: RoleDeleteByIdApiResponse, error: Error }> {
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
        message: t('roles.remove-item.success')
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
        message: t('roles.remove-folder.success')
      })
    }

    return data
  }

  async function cloneItem (props: { id: number, name: string }): Promise<{ data: RoleCloneByIdApiResponse, error: Error }> {
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
        message: t('roles.clone-item.success')
      })
    }

    return data
  }

  async function updateItemById (props: { id: number, item: DetailedUserRole }): Promise<{ data: RoleUpdateByIdApiResponse, error: Error }> {
    const { id, item } = props

    const { data, error }: any = await dispatch(api.endpoints.roleUpdateById.initiate({ id, updateRole: { ...item, parentId: item.parentId ?? 0 } }))

    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: 'Error',
        description: error.data.message
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: t('roles.save-item.success')
      })

      // dispatch(userUpdated(data))
    }

    return data
  }

  async function moveItemById (props: { id: number, parentId: number }): Promise<{ data: RoleUpdateByIdApiResponse, error: Error }> {
    const { id, parentId } = props

    const item = await fetchItemById({ id })
    const { data, error }: any = await dispatch(api.endpoints.roleUpdateById.initiate({ id, updateRole: { ...item, parentId } }))

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

  const activeId = useAppSelector(state => state.role.activeId)
  const getAllIds = useAppSelector(state => state.role.ids)

  return {
    openItem,
    closeItem,
    getItemTree,
    addNewItem,
    addNewFolder,
    removeItem,
    cloneItem,
    removeFolder,
    updateItemById,
    moveItemById,
    activeId,
    getAllIds
  }
}
