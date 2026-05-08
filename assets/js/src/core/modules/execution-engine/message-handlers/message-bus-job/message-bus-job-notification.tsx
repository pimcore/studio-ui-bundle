/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { JobView, type ButtonAction } from '@Pimcore/modules/execution-engine/notification/job/job-view'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useTranslation } from 'react-i18next'
import { isUndefined, isEmpty } from 'lodash'
import { type MessageBusJob } from './message-bus-job-handler'
import { JobErrorModal } from './job-error-modal'
import { useExecutionEngineAbortJobRunByIdMutation, useExecutionEngineHideJobRunsMutation } from '@Pimcore/modules/execution-engine/execution-engine-api-slice-enhanced'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

export interface JobButtonCustomizationContext {
  jobRunId: number
  addSuccessButton: (action: ButtonAction, position?: 'start' | 'end') => void
  addFinishedWithErrorsButton: (action: ButtonAction, position?: 'start' | 'end') => void
  addFailureButton: (action: ButtonAction, position?: 'start' | 'end') => void
  showWarning: (titleKey: string, content: string) => void
}

export interface MessageBusJobProps extends MessageBusJob {
}

export const MessageBusJobNotification = (props: MessageBusJobProps): React.JSX.Element => {
  const { removeJob } = useJobs()
  const { t } = useTranslation()
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isHiding, setIsHiding] = useState(false)
  const [abortJobRun] = useExecutionEngineAbortJobRunByIdMutation()
  const [hideJobRuns] = useExecutionEngineHideJobRunsMutation()
  const { warn } = useAlertModal()

  const handleAbort = async (): Promise<void> => {
    const { error } = await abortJobRun({ jobRunId: Number(props.jobRunId) })

    if (!isUndefined(error)) {
      trackError(new ApiError(error))
      return
    }

    const messageBus = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
    messageBus.unregisterHandler(props.jobRunId)

    removeJob(props.id)
  }

  const hideButtonAction: ButtonAction = {
    label: t('jobs.job.button-hide'),
    loading: isHiding,
    handler: async () => {
      setIsHiding(true)
      const idsToHide = [props.jobRunId, ...(props.ancestorJobRunIds ?? [])]
      try {
        await hideJobRuns({ body: { jobRunIds: idsToHide } })
      } finally {
        removeJob(props.id)
      }
    }
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
      jobRunId: props.jobRunId,
      addSuccessButton: (action, position) => { addButton(successButtonActions, action, position) },
      addFinishedWithErrorsButton: (action, position) => { addButton(finishedWithErrorsButtonActions, action, position) },
      addFailureButton: (action, position) => { addButton(failureButtonActions, action, position) },
      showWarning: (titleKey, content) => { warn({ title: titleKey, content }) }
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

  if (!isUndefined(props.messages) && !isEmpty(props.messages)) {
    const showErrorsAction: ButtonAction = {
      label: t('jobs.job.button-show-errors'),
      handler: () => {
        setShowErrorModal(true)
      }
    }

    addButton(finishedWithErrorsButtonActions, showErrorsAction, 'start')
    addButton(failureButtonActions, showErrorsAction, 'start')
  }

  return (
    <>
      <JobView
        failureButtonActions={ failureButtonActions }

        finishedWithErrorsButtonActions={ finishedWithErrorsButtonActions }

        onAbort={ handleAbort }

        successButtonActions={ successButtonActions }

        { ...props }
        progress={ props.progress ?? 0 }
      />
      <JobErrorModal
        messages={ props.messages ?? [] }
        onClose={ () => { setShowErrorModal(false) } }
        open={ showErrorModal }
      />
    </>
  )
}
