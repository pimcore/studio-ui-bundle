/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef } from 'react'
import { Job } from '../job/job'
import { AnimatePresence, motion } from 'framer-motion'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useStyles } from './job-list.styles'

export const JobList = (): React.JSX.Element => {
  const { jobs } = useJobs()
  const { styles } = useStyles()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevLengthRef = useRef(0)

  useEffect(() => {
    const wasAdded = jobs.length > prevLengthRef.current
    prevLengthRef.current = jobs.length

    if (!wasAdded) return

    // Chase framer-motion height animations with RAF until they settle (~600ms)
    const end = Date.now() + 600
    const scroll = (): void => {
      if (containerRef.current != null) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
      if (Date.now() < end) {
        requestAnimationFrame(scroll)
      }
    }
    requestAnimationFrame(scroll)
  }, [jobs.length])

  return (
    <div
      className={ styles.container }
      ref={ containerRef }
    >
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
    </div>
  )
}
