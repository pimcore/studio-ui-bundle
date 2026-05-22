/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import {
  type KeyBindingForAUser,
  type UserDefaultKeyBindingsApiResponse
} from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { isNil } from 'lodash'

interface UseMergedKeyBindingsReturn {
  mergedKeyBindings: KeyBindingForAUser[]
  isLoading: boolean
}

/**
 * Hook that merges user keybindings with default keybindings
 */
export const useMergedKeyBindings = (userKeyBindings?: KeyBindingForAUser[], userId?: number): UseMergedKeyBindingsReturn => {
  const [mergedKeyBindings, setMergedKeyBindings] = useState<KeyBindingForAUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { getDefaultKeyBindings } = useUserManagementHelper()
  const { isAuthenticated } = useIsAuthenticated()

  useEffect(() => {
    const loadAndMergeKeyBindings = async (): Promise<void> => {
      if (isNil(isAuthenticated) || !isAuthenticated) {
        return
      }

      try {
        setIsLoading(true)
        const defaultData: UserDefaultKeyBindingsApiResponse = await getDefaultKeyBindings()

        // Create a map of user's existing keybindings by action name
        const userKeyBindingsMap = new Map(
          (userKeyBindings ?? []).map(binding => [binding.action, binding])
        )

        const mergedKeyBindings: KeyBindingForAUser[] = defaultData.items.map((defaultBinding: KeyBindingForAUser): KeyBindingForAUser =>
          userKeyBindingsMap.get(defaultBinding.action) ?? defaultBinding
        )
        setMergedKeyBindings(mergedKeyBindings)
      } catch (error) {
        console.error('error loading default key bindings', error)
        // Fallback to user's keybindings only
        setMergedKeyBindings(userKeyBindings ?? [])
      } finally {
        setIsLoading(false)
      }
    }

    void loadAndMergeKeyBindings()
  }, [userKeyBindings, isAuthenticated, userId])

  return {
    mergedKeyBindings,
    isLoading
  }
}
