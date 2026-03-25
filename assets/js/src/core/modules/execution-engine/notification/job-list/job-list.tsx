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
import { Job } from '../job/job'
import { AnimatePresence, motion } from 'framer-motion'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'

export const JobList = (): React.JSX.Element => {
  const { jobs } = useJobs()

  return (
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
