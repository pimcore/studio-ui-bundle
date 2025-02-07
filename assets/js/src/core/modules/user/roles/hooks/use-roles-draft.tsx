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
  selectRoleById,
  roleFetched,
  roleRemoved,
  changeRole
} from '@Pimcore/modules/user/roles/roles-slice'
import {
  api, type RoleGetByIdApiResponse
} from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { useEffect, useState } from 'react'

interface IUserRoleDraft {
  isLoading: boolean
  isError: boolean
  role: undefined | ReturnType<typeof selectRoleById>

  removeRoleFromState: () => void
  changeRoleInState: (changedValues: any) => void
  reloadRole: () => void
}

export const useRoleDraft = (id: number): IUserRoleDraft => {
  const dispatch = useAppDispatch()
  const role = useAppSelector(state => selectRoleById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  async function fetchRole (): Promise<RoleGetByIdApiResponse> {
    const { data } = await dispatch(api.endpoints.roleGetById.initiate({ id }))

    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as RoleGetByIdApiResponse
  }

  function reloadRole (): void {
    removeRoleFromState()
    getRole()
  }

  useEffect(() => {
    if (role === undefined && id !== undefined) {
      getRole()
    } else {
      setIsLoading(false)
    }
  }, [role])

  function getRole (): void {
    setIsLoading(true)
    fetchRole().then((data) => {
      dispatch(roleFetched(data))
    }).catch(() => {
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function removeRoleFromState (): void {
    if (role === undefined) return

    dispatch(roleRemoved(role.id))
  }

  function changeRoleInState (changes: any): void {
    if (role === undefined) return
    dispatch(changeRole({ id: role.id, changes }))
  }

  return {
    isLoading,
    isError,
    role,
    removeRoleFromState,
    changeRoleInState,
    reloadRole
  }
}
