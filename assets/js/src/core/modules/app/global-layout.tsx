import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { createStyles } from 'antd-style'
import { routes } from '@Pimcore/app/router/router'

const useStyles = createStyles(({ css }) => ({
  layout: css`
    position: absolute;
    inset: 0;
    overflow: hidden;
  `
}))

export const GlobalLayout = (): React.JSX.Element => {
  const location = useLocation()
  const { styles } = useStyles()

  return (
    <div className={styles.layout}>
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  )
}
