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
import { useStyle } from './dependencies-container.styles'
import {
  RequiresPanel
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/requires-panel/requires-panel'
import {
  RequiredByPanel
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/required-by-panel/required-by-panel'

export const DependenciesTabContainer = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.tab }>
      <RequiresPanel />
      <RequiredByPanel />
    </div>
  )
}
