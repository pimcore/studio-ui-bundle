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
import { JobView, type ButtonAction } from '@Pimcore/modules/execution-engine/notification/job/job-view'
import { type JobProps } from '@Pimcore/modules/execution-engine/notification/job/job'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type BaseJobConfig } from '../../message-handlers/default-job-handler'

export interface MessageBusJobProps extends JobProps {
  config: BaseJobConfig
}

export const NotificationJobContainer = (props: MessageBusJobProps): React.JSX.Element => {
  const { removeJob } = useJobs()
  const { t } = useTranslation()

  const hideButtonAction: ButtonAction = {
    label: t('jobs.job.button-hide'),
    handler: () => { removeJob(props.id) }
  }

  const successButtonActions: ButtonAction[] = [hideButtonAction]
  const finishedWithErrorsButtonActions: ButtonAction[] = [hideButtonAction]
  const failureButtonActions: ButtonAction[] = [hideButtonAction]

  if (!isUndefined(props.onRetry)) {
    failureButtonActions.unshift({
      label: t('jobs.job.button-retry'),
      handler: () => {
        void props.onRetry?.()
        removeJob(props.id)
      }
    })
  }

  return (
    <JobView
      failureButtonActions={ failureButtonActions }

      finishedWithErrorsButtonActions={ finishedWithErrorsButtonActions }

      successButtonActions={ successButtonActions }

      { ...props }
      progress={ props.config.progress ?? 0 }
    />
  )
}
