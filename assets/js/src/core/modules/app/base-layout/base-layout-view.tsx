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

export const BaseLayoutView = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div
      className={ ['base-layout', styles.baseLayout].join(' ') }
    >
      <LeftSidebarView />

      <WidgetManagerContainer />
      <ExecutionEngineNotification />

      <RightSidebarView />
    </div>
  )
}
