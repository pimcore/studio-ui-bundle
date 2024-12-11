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

import React from 'react'
import { Job } from '../job/job'
import { AnimatePresence, motion } from 'framer-motion'
import { useStyles } from './job-list.styles'
import { useTranslation } from 'react-i18next'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { Collapse } from '@Pimcore/components/collapse/collapse'

export const JobList = (): React.JSX.Element => {
  const { jobs } = useJobs()
  const { styles } = useStyles()
  const { t } = useTranslation()

  const collapseDisabled: { disabled: boolean } = { disabled: true }

  const item = {
    key: '1',
    label: <span>{t('jobs.notification.jobs', { count: jobs.length })}</span>,
    children:
  <AnimatePresence>
    {jobs.map((job) => (
      <motion.div
        animate={ { opacity: 1, height: 'auto' } }
        exit={ { opacity: 0, height: 1 } }
        initial={ { opacity: 0, height: 1 } }
        key={ `${job.id}` }
      >
        <Job
          { ...job }
          key={ job.id }
        />
      </motion.div>
    ))}
  </AnimatePresence>,
    ...(jobs.length === 0 && collapseDisabled)
  }

  return (
    <Collapse
      bordered={ false }
      className={ styles.jobList }
      defaultActiveKeys={ [item.key] }
      hasContentSeparator={ false }
      items={ [item] }
    />
  )
}
