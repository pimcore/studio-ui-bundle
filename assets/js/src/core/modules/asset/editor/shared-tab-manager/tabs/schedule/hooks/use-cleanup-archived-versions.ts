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

import { useState } from 'react'
import {
  type CleanupVersionApiArg,
  useCleanupVersionMutation
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'

interface IUseCleanupArchivedVersionsResponse {
  isLoading: boolean
  cleanup: (props: CleanupVersionApiArg) => Promise<void>
}

export const useCleanupArchivedVersions = (): IUseCleanupArchivedVersionsResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cleanupVersion] = useCleanupVersionMutation()

  const cleanup = async ({ elementType, id }: CleanupVersionApiArg): Promise<void> => {
    setIsLoading(true)

    await cleanupVersion({ elementType, id })

    setIsLoading(false)
  }

  return { isLoading, cleanup }
}
