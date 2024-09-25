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

import React, { useEffect, useRef, useState } from 'react'
import { JobStatus } from '../../jobs/abstact-job'
import { useServerSideEvent } from '@Pimcore/utils/hooks/use-server-side-event'
import { useJobs } from '../../hooks/useJobs'
import { JobView } from '../../notification/job/job-view'
import { type JobProps } from '../../notification/job/job'
import { type ZipUploadJob } from './factory'
import { useTranslation } from 'react-i18next'

export interface ZipUploadJobProps extends JobProps {
  config: ZipUploadJob['config']
}

export const NotificationJobContainer = (props: ZipUploadJobProps): React.JSX.Element => {
  const { id, topics, status, action } = props
  const { open: openSEEvent, close: closeSEEvent } = useServerSideEvent({ topics, messageHandler, openHandler })
  const [progress, setProgress] = useState<number>(0)
  const { updateJob, removeJob } = useJobs()
  const jobId = useRef<number>()
  const { t } = useTranslation()

  useEffect(() => {
    if (JobStatus.QUEUED === status) {
      updateJob(id, {
        status: JobStatus.RUNNING
      })

      openSEEvent()
    }

    if (JobStatus.SUCCESS === status) {
      // TODO: reload folder (parentFolder)
    }
  }, [props.status])

  return (
    <JobView
      failureButtonActions={ [
        {
          label: t('jobs.job.button-hide'),
          handler: () => { removeJob(id) }
        }
      ] }

      successButtonActions={ [
        {
          label: t('jobs.job.button-hide'),
          handler: () => { removeJob(id) }
        }
      ] }

      { ...props }
      progress={ progress }
    />
  )

  function openHandler (): void {
    console.log('openHandler')
    action().then(actionJobId => {
      console.log('actionJobId', actionJobId)

      jobId.current = actionJobId + 1
    }).catch(console.error)
  }

  function messageHandler (event: MessageEvent): void {
    const data: any = JSON.parse(event.data as string)
    console.log('messageHandler', data)

    if (data.jobRunId !== jobId.current) {
      return
    }

    if (data.progress !== undefined) {
      setProgress(data.progress as number)
    }

    if (data.status !== undefined) {
      if (data.status === 'finished') {
        updateJob(id, {
          status: JobStatus.SUCCESS
        })

        closeSEEvent()

        // TODO: clear folder cache
      }

      if (data.status === 'failed') {
        updateJob(id, {
          status: JobStatus.FAILED
        })

        closeSEEvent()
      }
    }
  }
}
