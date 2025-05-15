/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Logo } from '@Pimcore/components/logo/logo'
import React from 'react'
import { useStlyes } from './right-sidebar-view.styles'

export const RightSidebarView = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={ styles.rightSidebar }>
      <Logo />
    </div>
  )
}
