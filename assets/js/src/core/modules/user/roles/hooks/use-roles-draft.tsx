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
  itemFetched,
  removeItem,
  changeItem,
  itemReloaded
} from '@Pimcore/modules/user/roles/roles-slice'
import {
  api, type RoleGetByIdApiResponse
} from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { useEffect, useState } from 'react'

interface IUserRoleDraft {
  isLoading: boolean
  isError: boolean
  item: undefined | ReturnType<typeof selectRoleById>

  removeItemFromState: () => void
  changeItemInState: (changedValues: any) => void
  reloadItem: () => void
}

export const useRoleDraft = (id: number): IUserRoleDraft => {
  const dispatch = useAppDispatch()
  const item = useAppSelector(state => selectRoleById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  async function fetchItem (): Promise<RoleGetByIdApiResponse> {
    const { data } = await dispatch(api.endpoints.roleGetById.initiate({ id }))

    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as RoleGetByIdApiResponse
  }

  function reloadItem (): void {
    dispatch(itemReloaded(item.id))
    getItem()
  }

  useEffect(() => {
    if (item === undefined && id !== undefined) {
      getItem()
    } else {
      setIsLoading(false)
    }
  }, [item])

  function getItem (): void {
    setIsLoading(true)
    fetchItem().then((data) => {
      dispatch(itemFetched(data))
    }).catch(() => {
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function removeItemFromState (): void {
    if (item === undefined) return

    dispatch(removeItem(item.id))
  }

  function changeItemInState (changes: any): void {
    console.log('changeItemInState', changes)
    if (item === undefined) return
    dispatch(changeItem({ id: item.id, changes }))
  }

  return {
    isLoading,
    isError,
    item,
    removeItemFromState,
    changeItemInState,
    reloadItem
  }
}
