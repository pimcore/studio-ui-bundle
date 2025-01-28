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
import { roleOpened, roleClosed, roleUpdated } from '@Pimcore/modules/user/roles/roles-slice'
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

interface IAddRoleArgs {
  parentId: number
  name: string
}

interface IUseRoleReturn {
  openRole: (id: number) => void
  closeRole: (id: number) => void
  getRoleTree: (props: RoleGetTreeApiArg) => Promise<RoleGetTreeApiResponse>
  addNewRole: (props: IAddRoleArgs) => Promise<{ data: RoleCreateApiResponse, error: any }>
  removeRole: (props: RoleDeleteByIdApiArg) => Promise<{ data: RoleDeleteByIdApiResponse, error: any }>
  removeFolder: (props: RoleFolderDeleteByIdApiArg) => Promise<{ data: RoleFolderDeleteByIdApiResponse, error: any }>
  cloneRole: (props: { id: number, name: string }) => Promise<{ data: RoleCloneByIdApiResponse, error: any }>
  addNewFolder: (props: IAddRoleArgs) => Promise<{ data: RoleFolderCreateApiResponse, error: any }>
  updateRoleById: (props: { id: number, item: DetailedUserRole }) => Promise<{ data: RoleUpdateByIdApiResponse, error: any }>
  moveRoleById: (props: { id: number, parentId: number }) => Promise<{ data: RoleUpdateByIdApiResponse, error: any }>
  activeId: number
  getAllIds: number[]
}

export const useRoleHelper = (): IUseRoleReturn => {
  const { t } = useTranslation()
  const [notificationApi] = useNotification()
  const dispatch = useAppDispatch()

  const handleNotification = (successMessage, error): void => {
    if (error !== undefined) {
      notificationApi.open({
        type: 'error',
        message: error.data.message ?? t('error')
      })
    } else {
      notificationApi.open({
        type: 'success',
        message: successMessage
      })
    }
  }
  function openRole (id: number): void {
    dispatch(roleOpened(id))
  }

  function closeRole (id: number): void {
    dispatch(roleClosed(id))
  }

  async function fetchRoleById (props): Promise<RoleGetByIdApiResponse> {
    const { id } = props
    const { data }: any = await dispatch(api.endpoints.roleGetById.initiate({ id }))

    return data
  }

  async function getRoleTree (props: RoleGetTreeApiArg): Promise<RoleGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.roleGetTree.initiate({ parentId }))

    return data
  }

  async function addNewRole (props: IAddRoleArgs): Promise<{ data: RoleCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.roleCreate.initiate({ body: { parentId, name } }))

    handleNotification(t('roles.add-item.success'), error)
    return data
  }

  async function addNewFolder (props: IAddRoleArgs): Promise<{ data: RoleFolderCreateApiResponse, error: Error }> {
    const { parentId, name } = props
    const { data, error }: any = await dispatch(api.endpoints.roleFolderCreate.initiate({ body: { parentId, name } }))

    handleNotification(t('roles.add-folder.success'), error)

    return data
  }

  async function removeRole (props: RoleDeleteByIdApiArg): Promise<{ data: RoleDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.roleDeleteById.initiate({ id }))

    handleNotification(t('roles.remove-item.success'), error)

    return data
  }

  async function removeFolder (props: RoleFolderDeleteByIdApiArg): Promise<{ data: RoleFolderDeleteByIdApiResponse, error: Error }> {
    const { id } = props
    const { data, error }: any = await dispatch(api.endpoints.roleFolderDeleteById.initiate({ id }))

    handleNotification(t('roles.remove-folder.success'), error)

    return data
  }

  async function cloneRole (props: { id: number, name: string }): Promise<{ data: RoleCloneByIdApiResponse, error: Error }> {
    const { id, name } = props
    const { data, error }: any = await dispatch(api.endpoints.roleCloneById.initiate({ id, body: { name } }))

    handleNotification(t('roles.clone-item.success'), error)
    dispatch(roleOpened(data.id as number))
    return data
  }

  async function updateRoleById (props: { id: number, item: DetailedUserRole }): Promise<{ data: RoleUpdateByIdApiResponse, error: Error }> {
    const { id, item } = props

    const { data, error }: any = await dispatch(api.endpoints.roleUpdateById.initiate({
      id,
      updateRole: {
        name: item.name,
        classes: item.classes,
        parentId: item.parentId ?? 0,
        permissions: item.permissions,
        docTypes: item.docTypes,
        websiteTranslationLanguagesEdit: item.websiteTranslationLanguagesEdit,
        websiteTranslationLanguagesView: item.websiteTranslationLanguagesView,
        assetWorkspaces: item.assetWorkspaces,
        dataObjectWorkspaces: item.dataObjectWorkspaces,
        documentWorkspaces: item.documentWorkspaces
      }
    }))
    handleNotification(t('roles.save-item.success'), error)

    dispatch(roleUpdated(id))

    return data
  }

  async function moveRoleById (props: { id: number, parentId: number }): Promise<{ data: RoleUpdateByIdApiResponse, error: Error }> {
    const { id, parentId } = props

    const role = await fetchRoleById({ id })
    const { data, error }: any = await dispatch(api.endpoints.roleUpdateById.initiate({ id, updateRole: { ...role, parentId } }))

    handleNotification(t('roles.save-item.success'), error)
    return data
  }

  const activeId = useAppSelector(state => state.role.activeId)
  const getAllIds = useAppSelector(state => state.role.ids)

  return {
    openRole,
    closeRole,
    getRoleTree,
    addNewRole,
    addNewFolder,
    removeRole,
    cloneRole,
    removeFolder,
    updateRoleById,
    moveRoleById,
    activeId,
    getAllIds
  }
}
