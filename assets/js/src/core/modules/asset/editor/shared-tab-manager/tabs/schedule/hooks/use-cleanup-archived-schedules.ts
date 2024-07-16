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
  type DeleteScheduleApiArg,
  useDeleteScheduleMutation
} from '@Pimcore/modules/element/editor/schedule-api-slice.gen'

interface IUseCleanupArchivedSchedulesResponse {
  isLoading: boolean
  cleanup: ({ ids }: { ids: Array<DeleteScheduleApiArg['id']> }) => Promise<void>
}

export const useCleanupArchivedSchedules = (): IUseCleanupArchivedSchedulesResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [deleteSchedule] = useDeleteScheduleMutation()

  const cleanup = async ({ ids }: { ids: Array<DeleteScheduleApiArg['id']> }): Promise<void> => {
    setIsLoading(true)

    for (const id of ids) {
      await deleteSchedule({ id })
    }

    setIsLoading(false)
  }

  return { isLoading, cleanup }
}
