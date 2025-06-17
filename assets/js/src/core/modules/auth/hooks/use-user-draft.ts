/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppSelector } from '@sdk/app'
import {
    resetChanges, setModifiedCells, selectCurrentUser,
} from '../user/user-slice'
import { useEffect, useState } from 'react'
import {
    useTrackableChangesDraft,
    type UseTrackableChangesDraftReturn
} from '@Pimcore/modules/auth/hooks/use-trackable-changes'
// import { useTabsDraft, type UseTabsDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import { type UserInformation } from '@Pimcore/modules/auth/user/user-api-slice-enhanced'

export interface UseUserDraftReturn extends UseTrackableChangesDraftReturn {
    isLoading: boolean,
    user: UserInformation
}

export const useUserDraft = (id: number): UseUserDraftReturn => {
    const user = useAppSelector(state => selectCurrentUser(state))
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (user === undefined) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [user])

    const trackableChangesActions = useTrackableChangesDraft(
        () => resetChanges(),
        (action) => setModifiedCells(action)
    );

    return {
        isLoading,
        user,
        ...trackableChangesActions
    }
}
