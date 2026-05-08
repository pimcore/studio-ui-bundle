/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useJobs } from '../hooks/useJobs'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { JobList } from './job-list/job-list'
import { useTranslation } from 'react-i18next'
import { JobStatus } from '../jobs/abstact-job'
import { type MessageBusJob } from '../message-handlers/message-bus-job/message-bus-job-handler'
import { useExecutionEngineHideJobRunsMutation } from '@Pimcore/modules/execution-engine/execution-engine-api-slice-enhanced'
import { Button, Flex } from 'antd'

const FINISHED_STATUSES = new Set([JobStatus.SUCCESS, JobStatus.FINISHED_WITH_ERRORS, JobStatus.FAILED])

const JobListHeader = (): React.JSX.Element => {
  const { jobs, removeJob } = useJobs()
  const { t } = useTranslation()
  const [hideJobRuns] = useExecutionEngineHideJobRunsMutation()
  const [isHidingAll, setIsHidingAll] = useState(false)

  const finishedJobs = jobs.filter(job => FINISHED_STATUSES.has(job.status))

  const handleHideAllFinished = async (): Promise<void> => {
    setIsHidingAll(true)
    const jobRunIds: number[] = []
    for (const job of finishedJobs) {
      if ('jobRunId' in job) {
        const mbJob = job as MessageBusJob
        jobRunIds.push(mbJob.jobRunId, ...(mbJob.ancestorJobRunIds ?? []))
      }
    }
    try {
      if (jobRunIds.length > 0) {
        await hideJobRuns({ body: { jobRunIds } })
      }
    } finally {
      for (const job of finishedJobs) {
        removeJob(job.id)
      }
      setIsHidingAll(false)
    }
  }

  return (
    <Flex
      align="center"
      justify="space-between"
      style={ { width: '100%' } }
    >
      <span>{t('jobs.notification.title')}</span>
      {finishedJobs.length > 1 && (
        <Button
          loading={ isHidingAll }
          onClick={ () => { void handleHideAllFinished() } }
          size="small"
          style={ { height: 'auto', padding: 0 } }
          type="link"
        >
          {t('jobs.notification.hide-all-finished')}
        </Button>
      )}
    </Flex>
  )
}

export const Notification = (): React.JSX.Element => {
  const { jobs } = useJobs()
  const hasJobs = jobs.length > 0
  const [notificationApi] = useNotification()

  useEffect(() => {
    if (hasJobs) {
      notificationApi.open({
        key: 'jobs-notification',
        message: <JobListHeader />,
        description: <JobList />
      })
    }

    if (!hasJobs) {
      notificationApi.destroy('jobs-notification')
    }
  }, [jobs.length])

  return <></>
}
