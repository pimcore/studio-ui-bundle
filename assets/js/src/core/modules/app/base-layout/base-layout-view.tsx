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
import { LeftSidebarView } from './left-sidebar-view'
import { WidgetManagerContainer } from '@Pimcore/modules/widget-manager/widget-manager-container'
import { RightSidebarView } from './right-sidebar-view'
import { useStlyes } from './base-layout-view.styles'
import { Notification as ExecutionEngineNotification } from '@Pimcore/modules/execution-engine/notification/notification'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@Pimcore/app/store'
import { setBackgroundAnimationEnabled } from '../ui-slice'

export const BaseLayoutView = (): React.JSX.Element => {
  const { styles } = useStlyes()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(setBackgroundAnimationEnabled(false))

    return () => {
      dispatch(setBackgroundAnimationEnabled(true))
    }
  }, [])

  return (
    <motion.div
      className={ ['base-layout', styles.baseLayout].join(' ') }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LeftSidebarView />

      <WidgetManagerContainer />
      <ExecutionEngineNotification />

      <RightSidebarView />
    </motion.div>
  )
}
