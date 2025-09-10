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
  selectUserById,
  userFetched,
  userRemoved,
  changeUser
} from '@Pimcore/modules/user/user-management-slice'
import {
  api,
  type UserGetByIdApiResponse
} from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useEffect, useState } from 'react'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseUserReturnDraft {
  isLoading: boolean
  isError: boolean
  user: undefined | ReturnType<typeof selectUserById>

  removeUserFromState: () => void
  changeUserInState: (changedValues: any) => void
  updateUserKeyBinding: (name: string, code: object) => void
  reloadUser: () => void
}

export const useUserManagementDraft = (id: number): UseUserReturnDraft => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => selectUserById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  async function fetchUser (): Promise<UserGetByIdApiResponse> {
    const { data, isError: isUserGetByIdError, error } = await dispatch(api.endpoints.userGetById.initiate({ id }))

    if (isUserGetByIdError) {
      trackError(new ApiError(error))
    }
    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as UserGetByIdApiResponse
  }

  function reloadUser (): void {
    getUser()
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
      dispatch(userFetched({
        ...data,
        modified: false,
        changes: {},
        modifiedCells: {}
      }))
    }).catch(() => {
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
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

  function updateUserKeyBinding (name: string, code: { key: number, ctrl: boolean, alt: boolean, shift: boolean }): void {
    const updatedKeyBindings = [...user.keyBindings]
    const existingKeyBindingIndex = updatedKeyBindings.findIndex((keyBinding: any) => keyBinding.action === name)

    if (existingKeyBindingIndex !== -1) {
      updatedKeyBindings[existingKeyBindingIndex] = { action: name, ...code }
    } else {
      updatedKeyBindings.push({ action: name, ...code })
    }

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
