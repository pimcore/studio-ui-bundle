/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { type JobProps } from '@Pimcore/modules/execution-engine/notification/job/job'
import { JobView } from '@Pimcore/modules/execution-engine/notification/job/job-view'
import { useServerSideEvent } from '@Pimcore/utils/hooks/use-server-side-event'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { JobStatus } from '../../abstact-job'
import { type RestoreJob } from './factory'
import { refreshTreeByElementType } from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@Pimcore/app/store'
import { useRecycleBin } from '@Pimcore/modules/recycle-bin/hooks/use-recycle-bin'

export interface RestoreJobProps extends JobProps {
  config: RestoreJob['config']
}

export const NotificationJobContainer = (props: RestoreJobProps): React.JSX.Element => {
  const { id, topics, status, action } = props
  const { open: openSEEvent, close: closeSEEvent } = useServerSideEvent({ topics, messageHandler, openHandler })
  const [progress, setProgress] = useState<number>(0)
  const { updateJob, removeJob } = useJobs()
  const jobId = useRef<number>()
  const { t } = useTranslation()
  const { refreshRecycleBin } = useRecycleBin()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (JobStatus.QUEUED === status) {
      updateJob(id, {
        status: JobStatus.RUNNING
      })

      openSEEvent()
    }
  }, [props.status])

  return (
    <JobView
      failureButtonActions={[
        {
          label: t('jobs.job.button-hide'),
          handler: () => { removeJob(id) }
        }
      ]}

      finishedWithErrorsButtonActions={[
        {
          label: t('jobs.job.button-hide'),
          handler: () => {
            removeJob(id)
          }
        }
      ]}

      successButtonActions={[
        {
          label: t('jobs.job.button-hide'),
          handler: () => {
            removeJob(id)
          }
        }
      ]}

      {...props}
      progress={progress}
    />
  )

  function openHandler(): void {
    action().then(actionJobId => {
      jobId.current = actionJobId
    }).catch(console.error)
  }

  function messageHandler(event: MessageEvent): void {
    const data: any = JSON.parse(event.data as string)

    if (data.jobRunId !== jobId.current) {
      return
    }

    if (data.progress !== undefined) {
      setProgress(data.progress as number)
    }

    if (data.status !== undefined) {
      if (data.status === 'finished' || data.status === 'finished_with_errors' || data.status === 'failed') {
        dispatch(refreshTreeByElementType({ elementTypes: props.config.elementTypes }))
        refreshRecycleBin()
      }

      if (data.status === 'finished') {
        updateJob(id, {
          status: JobStatus.SUCCESS
        })

        closeSEEvent()
      }

      if (data.status === 'finished_with_errors') {
        updateJob(id, {
          status: JobStatus.FINISHED_WITH_ERRORS
        })

        closeSEEvent()
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
