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

export const JobList = (): React.JSX.Element => {
  const { jobs } = useJobs()

  return (
    <>
      <div>Actions</div>
      <AnimatePresence>
        {jobs.map((job) => (
          <motion.div
            animate={ { opacity: 1, height: 'auto' } }
            exit={ { opacity: 0, height: 1 } }
            initial={ { opacity: 0, height: 1 } }
            key={ `${job.id},${job.status}` }
          >
            <Job
              { ...job }
              key={ job.id }
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
