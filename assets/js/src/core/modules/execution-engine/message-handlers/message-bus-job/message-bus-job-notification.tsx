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
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type MessageBusJob } from './message-bus-job-handler'

export interface JobButtonCustomizationContext {
  addSuccessButton: (action: ButtonAction, position?: 'start' | 'end') => void
  addFinishedWithErrorsButton: (action: ButtonAction, position?: 'start' | 'end') => void
  addFailureButton: (action: ButtonAction, position?: 'start' | 'end') => void
}

export interface MessageBusJobProps extends MessageBusJob {}

export const MessageBusJobNotification = (props: MessageBusJobProps): React.JSX.Element => {
  const { removeJob } = useJobs()
  const { t } = useTranslation()

  const hideButtonAction: ButtonAction = {
    label: t('jobs.job.button-hide'),
    handler: () => { removeJob(props.id) }
  }

  const successButtonActions: ButtonAction[] = [hideButtonAction]
  const finishedWithErrorsButtonActions: ButtonAction[] = [hideButtonAction]
  const failureButtonActions: ButtonAction[] = [hideButtonAction]

  const addButton = (list: ButtonAction[], action: ButtonAction, position: 'start' | 'end' = 'start'): void => {
    if (position === 'start') {
      list.unshift(action)
    } else {
      list.push(action)
    }
  }

  if (!isUndefined(props.onCustomizeButtons)) {
    const context: JobButtonCustomizationContext = {
      addSuccessButton: (action, position) => { addButton(successButtonActions, action, position) },
      addFinishedWithErrorsButton: (action, position) => { addButton(finishedWithErrorsButtonActions, action, position) },
      addFailureButton: (action, position) => { addButton(failureButtonActions, action, position) }
    }
    props.onCustomizeButtons(context)
  }

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
      progress={ props.progress ?? 0 }
    />
  )
}
