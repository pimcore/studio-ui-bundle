/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useUserGetCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface UserCollectionContextValue {
  /** True once the collection request has completed (regardless of outcome). */
  isFetched: boolean
  /** Resolves a user id to its username, or undefined if the id is not in the loaded collection. */
  getUsernameById: (userId: number) => string | undefined
}

const defaultValue: UserCollectionContextValue = {
  isFetched: false,
  getUsernameById: () => undefined
}

const UserCollectionContext = createContext<UserCollectionContextValue>(defaultValue)

/**
 * Fetches the user collection once for the whole subtree so that per-row cells can resolve a
 * user id to a username without each issuing its own request or reporting the same API error
 * repeatedly.
 */
export const UserCollectionProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const { data, isError, error, isSuccess } = useUserGetCollectionQuery()

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  const value = useMemo<UserCollectionContextValue>(() => {
    const usernameById = new Map<number, string>()
    data?.items.forEach((user) => usernameById.set(user.id, user.username))

    return {
      isFetched: isSuccess || isError,
      getUsernameById: (userId: number) => usernameById.get(userId)
    }
  }, [data, isSuccess, isError])

  return (
    <UserCollectionContext.Provider value={ value }>
      { children }
    </UserCollectionContext.Provider>
  )
}

export const useUserCollection = (): UserCollectionContextValue => useContext(UserCollectionContext)
