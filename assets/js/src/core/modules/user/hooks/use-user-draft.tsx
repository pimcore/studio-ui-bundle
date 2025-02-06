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
  selectUserById,
  userFetched,
  userRemoved,
  changeUser,
  userAvailablePermissionsFetched
} from '@Pimcore/modules/user/user-slice'
import {
  api, type UserGetAvailablePermissionsApiResponse,
  type UserGetByIdApiResponse
} from '@Pimcore/modules/user/user-api-slice.gen'
import { useEffect, useState } from 'react'

interface UseUserReturnDraft {
  isLoading: boolean
  isError: boolean
  user: undefined | ReturnType<typeof selectUserById>

  removeUserFromState: () => void
  changeUserInState: (changedValues: any) => void
  updateUserKeyBinding: (name: string, code: object) => void
  reloadUser: () => void
}

export const useUserDraft = (id: number): UseUserReturnDraft => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => selectUserById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  async function fetchUser (): Promise<UserGetByIdApiResponse> {
    const { data } = await dispatch(api.endpoints.userGetById.initiate({ id }))

    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as UserGetByIdApiResponse
  }

  function reloadUser (): void {
    removeUserFromState()
    getUser()
  }

  async function fetchUserAvailablePermissions (): Promise<UserGetAvailablePermissionsApiResponse> {
    const { data } = await dispatch(api.endpoints.userGetAvailablePermissions.initiate())

    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as UserGetAvailablePermissionsApiResponse
  }

  useEffect(() => {
    if (user === undefined && id !== undefined) {
      getUser()
    } else {
      setIsLoading(false)
    }
  }, [user])

  function getUser (): void {
    setIsLoading(true)
    fetchUser().then((data) => {
      dispatch(userFetched(data))
    }).catch(() => {
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })

    fetchUserAvailablePermissions().then((data) => {
      dispatch(userAvailablePermissionsFetched(data))
    }).catch((e) => {
      console.error(e)
    })
  }

  function removeUserFromState (): void {
    if (user === undefined) return

    dispatch(userRemoved(user.id))
  }

  function changeUserInState (changes: any): void {
    if (user === undefined) return
    dispatch(changeUser({ id: user.id, changes }))
  }

  function updateUserKeyBinding (name: string, code: object): void {
    const updatedKeyBindings = user.keyBindings.map((keyBinding: any) => {
      if (keyBinding.action === name) {
        keyBinding = code
        return keyBinding
      }
      return keyBinding
    })
    dispatch(changeUser({ id: user.id, changes: { keyBindings: updatedKeyBindings } }))
  }

  return {
    isLoading,
    isError,
    user,
    removeUserFromState,
    changeUserInState,
    reloadUser,
    updateUserKeyBinding
  }
}
