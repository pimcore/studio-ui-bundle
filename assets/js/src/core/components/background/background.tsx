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
import { useStyle } from './background.styles'
import { motion } from 'framer-motion'

interface BackgroundProps {
  loading?: boolean
}

const Background = ({ loading = false }: BackgroundProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <motion.div
      className={ styles.background }
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 1 : 0.1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className='background-figure background-figure--bottom-left'
        animate={loading ? {
          rotate: [28.303, 45, 28.303],
          x: ['0%', '-10%', '0%'],
          y: ['0%', '15%', '0%'],
          scale: [1, 1.3, 1]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className='background-figure background-figure--bottom-right'
        animate={loading ? {
          rotate: [65.637, 85, 65.637],
          x: ['0%', '-15%', '0%'],
          y: ['0%', '-10%', '0%'],
          scale: [1, 0.8, 1]
        } : {}}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className='background-figure background-figure--top-left'
        animate={loading ? {
          rotate: [65.637, 45, 65.637],
          x: ['0%', '10%', '0%'],
          y: ['0%', '10%', '0%'],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  )
}

export { Background }
