/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { JobView } from '@Pimcore/modules/execution-engine/notification/job/job-view'
import { type JobProps } from '@Pimcore/modules/execution-engine/notification/job/job'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useTranslation } from 'react-i18next'
import { type DocumentCloneBackgroundJob } from './factory'

export interface DocumentCloneBackgroundJobProps extends JobProps {
  config: DocumentCloneBackgroundJob['config']
}

export const NotificationJobContainer = (props: DocumentCloneBackgroundJobProps): React.JSX.Element => {
  const { removeJob } = useJobs()
  const { t } = useTranslation()

  return (
    <JobView
      failureButtonActions={ [
        {
          label: t('jobs.job.button-hide'),
          handler: () => { removeJob(props.id) }
        }
      ] }

      finishedWithErrorsButtonActions={ [
        {
          label: t('jobs.job.button-hide'),
          handler: () => {
            removeJob(props.id)
          }
        }
      ] }

      successButtonActions={ [
        {
          label: t('jobs.job.button-hide'),
          handler: () => {
            removeJob(props.id)
          }
        }
      ] }

      { ...props }
      progress={ props.config.progress }
    />
  )
}
