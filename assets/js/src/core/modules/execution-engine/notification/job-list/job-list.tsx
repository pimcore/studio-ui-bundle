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
import { useJobs } from '../../hooks/useJobs'
import { Job } from '../job/job'
import { motion, AnimatePresence } from 'framer-motion'
import { Collapse } from 'antd'
import { useStyles } from './job-list.styles'
import { useTranslation } from 'react-i18next'

export const JobList = (): React.JSX.Element => {
  const { jobs } = useJobs()
  const { styles } = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Collapse
        bordered={ false }
        className={ styles.jobList }
        defaultActiveKey={ ['1'] }
        expandIconPosition='right'
        ghost
        items={ [
          {
            key: '1',
            label: t('jobs.notification.jobs', { count: jobs.length }),
            children: (
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
              </AnimatePresence>
            )
          }
        ] }
      />
    </>
  )
}
