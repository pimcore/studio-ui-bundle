/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { JobStatus } from '../../jobs/abstact-job'
import { useServerSideEvent } from '@Pimcore/utils/hooks/use-server-side-event'
import { useJobs } from '../../hooks/useJobs'
import { JobView } from '../../notification/job/job-view'
import { type JobProps } from '../../notification/job/job'
import { type ZipUploadJob } from './factory'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@sdk/app'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { isUndefined } from 'lodash'

export interface ZipUploadJobProps extends JobProps {
  config: ZipUploadJob['config']
}

export const NotificationJobContainer = (props: ZipUploadJobProps): React.JSX.Element => {
  const { id, topics, status, action } = props

  const [progress, setProgress] = useState<number>(0)
  const { updateJob, removeJob } = useJobs()
  const jobId = useRef<number>()
  const { t } = useTranslation()
  const [step, setStep] = useState<number | undefined>(undefined)
  const dispatch = useAppDispatch()

  const openHandler = (): void => {
    action().then(actionJobId => {
      jobId.current = actionJobId
    }).catch(
      () => { removeJob(id) }
    )
  }

  const handleMessageProgress = (data: any): void => {
    if (data.progress !== undefined) {
      setProgress(data.progress as number)
    }
  }

  const handleJobSuccess = (): void => {
    updateJob(id, {
      status: JobStatus.SUCCESS
    })
  }

  const handleJobFailed = (): void => {
    updateJob(id, {
      status: JobStatus.FAILED
    })
  }

  const handleMessageStatus = (data: any): void => {
    if (data.status !== undefined) {
      if (data.status === 'finished' && data.messages !== undefined) {
        const messages: { jobRunChildId?: number } = data.messages

        if (messages.jobRunChildId !== undefined) {
          jobId.current = messages.jobRunChildId
          setStep(2)
          setProgress(0)
        }

        if (messages.jobRunChildId === undefined) {
          handleJobSuccess()
          closeSEEvent()
        }
      }

      if (data.status === 'finished_with_errors') {
        handleJobSuccess()
        closeSEEvent()
      }

      if (data.status === 'failed') {
        handleJobFailed()
        closeSEEvent()
      }
    }
  }

  const messageHandler = (event: MessageEvent): void => {
    const data: any = JSON.parse(event.data as string)

    if (data.jobRunId !== jobId.current) {
      return
    }

    handleMessageProgress(data)
    handleMessageStatus(data)
  }

  const { open: openSEEvent, close: closeSEEvent } = useServerSideEvent({ topics, messageHandler, openHandler })

  useEffect(() => {
    if (JobStatus.QUEUED === status) {
      openSEEvent()
    }

    if (JobStatus.RUNNING === status) {
      setStep(1)
    }

    if (JobStatus.SUCCESS === status) {
      setStep(undefined)
      dispatch(refreshNodeChildren({ nodeId: props.config.parentFolder, elementType: 'asset' }))
    }
  }, [props.status])

  const title = isUndefined(step)
    ? props.title
    : t(`jobs.zip-upload-job.step${step}.title`)

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
          handler: () => {
            removeJob(id)
          }
        }
      ] }

      { ...props }
      progress={ progress }
      step={ step }
      title={ title }
      totalSteps={ 2 }
    />
  )
}
