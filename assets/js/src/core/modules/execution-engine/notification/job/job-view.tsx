/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { Spin } from '@Pimcore/components/spin/spin'
import { JobStatus } from '../../jobs/abstact-job'
import { type JobProps } from './job'
import React from 'react'
import { Button, Flex } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { AnimatePresence, motion } from 'framer-motion'
import { useStyles } from './job-view.styles'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'

export interface ButtonAction {
  label: string
  handler: () => void | Promise<void>
}

export interface JobViewCustomizationContext {
  addSuccessButton: (action: ButtonAction, position?: 'start' | 'end') => void
  addFinishedWithErrorsButton: (action: ButtonAction, position?: 'start' | 'end') => void
  addFailureButton: (action: ButtonAction, position?: 'start' | 'end') => void
}

export interface JobViewProps extends JobProps {
  successButtonActions?: ButtonAction[]
  failureButtonActions?: ButtonAction[]
  finishedWithErrorsButtonActions?: ButtonAction[]
  progress: number
  step?: number
  totalSteps?: number
}

const addButton = (list: ButtonAction[], action: ButtonAction, position: 'start' | 'end' = 'start'): void => {
  if (position === 'start') {
    list.unshift(action)
  } else {
    list.push(action)
  }
}

export const JobView = (props: JobViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const successButtonActions = [...(props.successButtonActions ?? [])]
  const failureButtonActions = [...(props.failureButtonActions ?? [])]
  const finishedWithErrorsButtonActions = [...(props.finishedWithErrorsButtonActions ?? [])]

  if (!isUndefined(props.onCustomizeJobView)) {
    const context: JobViewCustomizationContext = {
      addSuccessButton: (action, position) => { addButton(successButtonActions, action, position) },
      addFinishedWithErrorsButton: (action, position) => { addButton(finishedWithErrorsButtonActions, action, position) },
      addFailureButton: (action, position) => { addButton(failureButtonActions, action, position) }
    }
    props.onCustomizeJobView(context)
  }

  const progress = Math.min(props.progress, 100)

  const StepHint = !isUndefined(props.step) && !isUndefined(props.totalSteps)
    ? <strong>{ t('jobs.job.step_hint', { step: props.step, total: props.totalSteps }) }: </strong>
    : undefined

  return (
    <div>
      <AnimatePresence>
        <motion.div
          animate={ { opacity: 1, height: 'auto' } }
          exit={ { opacity: 0, height: 1 } }
          initial={ { opacity: 0, height: 1 } }
          key={ props.status }
        >

          { props.status === JobStatus.QUEUED && (
            <Flex
              align='center'
              justify='space-between'
            >
              <Flex
                align='center'
                gap={ 'small' }
              >
                <Spin type="classic" /><span>{ t('jobs.job.queued', { title: props.title }) }</span>
              </Flex>
            </Flex>
          ) }

          { props.status === JobStatus.RUNNING && (
            <Progressbar
              description={ <>{StepHint}{t('jobs.job.in-progress', { title: props.title })}</> }
              percent={ progress }
              progressStatus={ t('jobs.job.progress', { progress }) }
            />
          ) }

          { props.status === JobStatus.SUCCESS && (
            <Flex
              align='center'
              justify='space-between'
            >
              <Flex
                align='center'
                gap={ 'small' }
              >
                <Icon value='check-circle' /><span>{ t('jobs.job.finished', { title: props.title }) }</span>
              </Flex>
              <Flex gap={ 'small' }>
                {/* todo check button type */}
                { successButtonActions.map((action, index) => (
                  <Button
                    className={ styles.buttonStyle }
                    key={ index }
                    onClick={ action.handler }
                    type='link'
                  >{action.label}</Button>
                )) }
              </Flex>
            </Flex>
          ) }

          { props.status === JobStatus.FINISHED_WITH_ERRORS && (
            <Flex
              align='center'
              justify='space-between'
            >
              <Flex
                align='center'
                gap={ 'small' }
              >
                <Icon value='warning-circle' /><span>{ t('jobs.job.finished-with-errors', { title: props.title }) }</span>
              </Flex>
              <Flex gap={ 'small' }>
                {/* todo check button type */}
                { finishedWithErrorsButtonActions.map((action, index) => (
                  <Button
                    className={ styles.buttonStyle }
                    key={ index }
                    onClick={ action.handler }
                    type='link'
                  >{action.label}</Button>
                )) }
              </Flex>
            </Flex>
          ) }

          { props.status === JobStatus.FAILED && (
            <Flex
              align='center'
              justify='space-between'
            >
              <Flex
                align='center'
                gap={ 'small' }
              >
                <Icon value='x-circle' /><span>{ t('jobs.job.failed', { title: props.title }) }</span>
              </Flex>
              <Flex gap={ 'small' }>
                { failureButtonActions.map((action, index) => (
                  <Button
                    className={ styles.buttonStyle }
                    key={ index }
                    onClick={ action.handler }
                    type='link'
                  >{action.label}</Button>
                )) }
              </Flex>
            </Flex>
          ) }
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
