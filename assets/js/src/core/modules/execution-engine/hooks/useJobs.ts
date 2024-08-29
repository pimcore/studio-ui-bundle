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
import { jobDeleted, jobReceived, jobUpdated, selectAll } from '../execution-engine-slice'
import { type AbstractJob } from '../jobs/abstact-job'

interface UseJobsReturn {
  jobs: AbstractJob[]
  updateJob: (jobId: number, update: Partial<AbstractJob>) => void
  removeJob: (jobId: number) => void
  addJob: (job: AbstractJob) => void
}

export const useJobs = (): UseJobsReturn => {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(selectAll)

  function updateJob (jobId: number, update: Partial<AbstractJob>): void {
    dispatch(jobUpdated({ id: jobId, changes: { ...update } }))
  }

  function removeJob (jobId: number): void {
    dispatch(jobDeleted(jobId))
  };

  function addJob (job: AbstractJob): void {
    dispatch(jobReceived(job))
  }

  return {
    jobs,
    updateJob,
    removeJob,
    addJob
  }
}
