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
import { Popconfirm } from '@Pimcore/components/modal/popconfirm/popconfirm'

export interface ButtonAction {
  label: string
  loading?: boolean
  handler: () => void | Promise<void>
}

export interface JobViewProps extends JobProps {
  successButtonActions?: ButtonAction[]
  failureButtonActions?: ButtonAction[]
  finishedWithErrorsButtonActions?: ButtonAction[]
  onAbort?: () => void | Promise<void>
  progress: number
  indeterminate?: boolean
  currentStep?: number
  totalSteps?: number
  stepDescriptionKey?: string
}

export const JobView = (props: JobViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const successButtonActions = props.successButtonActions ?? []
  const failureButtonActions = props.failureButtonActions ?? []
  const finishedWithErrorsButtonActions = props.finishedWithErrorsButtonActions ?? []

  const progress = Math.min(props.progress, 100)

  const getStepHint = (): React.ReactNode => {
    if (isUndefined(props.currentStep)) {
      return null
    }

    if (!isUndefined(props.totalSteps) && props.totalSteps > 1) {
      return <strong>{ t('jobs.job.step_hint', { step: props.currentStep, total: props.totalSteps }) }: </strong>
    }

    if (props.currentStep > 1) {
      return <strong>{ t('jobs.job.step_hint_single', { step: props.currentStep }) }: </strong>
    }

    return null
  }

  const stepHint = getStepHint()

  const renderAbortButton = (): React.ReactNode => {
    if (isUndefined(props.onAbort)) {
      return null
    }

    return (
      <Popconfirm
        onConfirm={ () => { void props.onAbort?.() } }
        title={ t('jobs.job.abort-confirm') }
        zIndex={ 10000 }
      >
        <Button
          className={ styles.buttonStyle }
          type='link'
        >{t('jobs.job.button-abort')}</Button>
      </Popconfirm>
    )
  }

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
              { renderAbortButton() }
            </Flex>
          ) }

          { props.status === JobStatus.RUNNING && props.indeterminate === true && (
            <Flex
              align='center'
              justify='space-between'
            >
              <Flex
                align='center'
                gap={ 'small' }
              >
                <Spin type="classic" />
                <span>
                  {stepHint}
                  { !isUndefined(props.stepDescriptionKey) ? t(props.stepDescriptionKey) : t('jobs.job.in-progress', { title: props.title }) }
                </span>
              </Flex>
              { renderAbortButton() }
            </Flex>
          ) }

          { props.status === JobStatus.RUNNING && props.indeterminate !== true && (
            <Progressbar
              description={ <>{stepHint}{t('jobs.job.in-progress', { title: props.title })}</> }
              descriptionAction={ renderAbortButton() }
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
                    loading={ action.loading === true }
                    onClick={ () => { void action.handler() } }
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
                    loading={ action.loading === true }
                    onClick={ () => { void action.handler() } }
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
                    loading={ action.loading === true }
                    onClick={ () => { void action.handler() } }
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
