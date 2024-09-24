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
import {
  RequiresPanel
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/components/requires-panel/requires-panel'
import {
  RequiredByPanel
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/components/required-by-panel/required-by-panel'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'

export const DependenciesTabContainer = (): React.JSX.Element => {
  return (
    <SplitLayout
      leftItem={ { minSize: 450, size: 50, children: <RequiresPanel /> } }
      resizeAble
      rightItem={ { minSize: 450, size: 50, children: <RequiredByPanel /> } }
      withDivider
    />
  )
}
