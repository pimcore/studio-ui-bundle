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
