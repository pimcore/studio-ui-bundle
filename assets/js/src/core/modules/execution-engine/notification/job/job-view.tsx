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

import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { JobStatus } from '../../jobs/abstact-job'
import { type JobProps } from './job'
import React from 'react'
import { Button, Flex } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { AnimatePresence, motion } from 'framer-motion'
import { useStyles } from './job-view.styles'
import { useTranslation } from 'react-i18next'

interface ButtonAction {
  label: string
  handler: () => void | Promise<void>
}

export interface JobViewProps extends JobProps {
  successButtonActions?: ButtonAction[]
  failureButtonActions?: ButtonAction[]
  finishedWithErrorsButtonActions?: ButtonAction[]
  progress: number
}

export const JobView = (props: JobViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  return (
    <div>
      <AnimatePresence>
        <motion.div
          animate={ { opacity: 1, height: 'auto' } }
          exit={ { opacity: 0, height: 1 } }
          initial={ { opacity: 0, height: 1 } }
          key={ props.status }
        >
          { props.status === JobStatus.RUNNING && (
            <Progressbar
              description={ t('jobs.job.in-progress', { title: props.title }) }
              percent={ props.progress }
              progressStatus={ t('jobs.job.progress', { progress: props.progress }) }

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
                { props.successButtonActions?.map((action, index) => (
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
                { props.finishedWithErrorsButtonActions?.map((action, index) => (
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
                { props.failureButtonActions?.map((action, index) => (
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
