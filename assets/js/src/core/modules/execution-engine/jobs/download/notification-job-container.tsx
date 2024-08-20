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

import React, { useEffect, useState } from 'react'
import { JobStatus } from '../../jobs/abstact-job'
import { useServerSideEvent } from '@Pimcore/utils/hooks/use-server-side-event'
import { useJobs } from '../../hooks/useJobs'
import { JobView } from '../../notification/job/job-view'
import { type JobProps } from '../../notification/job/job'
import { type DownloadJob } from './factory'

export interface DownloadJobProps extends JobProps {
  config: DownloadJob['config']
}

export const NotificationJobContainer = (props: DownloadJobProps): React.JSX.Element => {
  const { id, topics, status } = props
  const { open: openSEEvent, close: closeSEEvent } = useServerSideEvent({ topics, messageHandler })
  const [progress, setProgress] = useState<number>(0)
  const { updateJob, removeJob } = useJobs()

  useEffect(() => {
    if (status === JobStatus.RUNNING) {
      openSEEvent()
    }
  }, [])

  return (
    <JobView
      buttonHandler={ buttonHandler }
      buttonLabel='download'
      { ...props }
      progress={ progress }
    />
  )

  function buttonHandler (): void {
    const downloadUrl = props.config.downloadUrl

    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = ''
    a.click()

    removeJob(id)
  };

  function messageHandler (event: MessageEvent): void {
    const data: any = JSON.parse(event.data as string)

    if (data.jobRunId !== id) {
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
      }
    }
  }
}
