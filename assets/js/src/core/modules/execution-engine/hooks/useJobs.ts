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
import { jobDeleted, jobReceived, jobUpdated, selectAll } from '../execution-engine-slice'
import { type AbstractJob, JobStatus } from '../jobs/abstact-job'
import { type MessageBusJob } from '../message-handlers/message-bus-job/message-bus-job-handler-types'

interface UseJobsReturn {
  jobs: AbstractJob[]
  /**
   * The jobs the notification list should show: everything except jobs that asked
   * to stay quiet unless they failed.
   */
  visibleJobs: AbstractJob[]
  updateJob: (jobId: number, update: Partial<AbstractJob>) => void
  removeJob: (jobId: number) => void
  addJob: (job: AbstractJob) => void
}

export const useJobs = (): UseJobsReturn => {
  const dispatch = useAppDispatch()
  const rawJobs = useAppSelector(selectAll)
  const jobs = [...rawJobs].sort((a, b) => {
    const aId = a.jobRunId ?? a.id
    const bId = b.jobRunId ?? b.id
    return aId - bId
  })

  const visibleJobs = jobs.filter(job => {
    if (!('notifyOnErrorOnly' in job) || (job as MessageBusJob).notifyOnErrorOnly !== true) {
      return true
    }

    return job.status === JobStatus.FAILED || job.status === JobStatus.FINISHED_WITH_ERRORS
  })

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
    visibleJobs,
    updateJob,
    removeJob,
    addJob
  }
}
