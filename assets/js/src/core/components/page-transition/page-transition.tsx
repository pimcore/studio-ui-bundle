import React from 'react'
import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const PageTransition = ({ children, className, style }: PageTransitionProps): React.JSX.Element => {
  return (
    <motion.div
      className={className}
      style={style}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
