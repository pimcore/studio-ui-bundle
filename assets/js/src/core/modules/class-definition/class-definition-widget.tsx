/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ClassDefinitionTabs } from '@Pimcore/modules/class-definition/components/tabs/class-definition-tabs'
import { ClassDefinitionSidebar } from '@Pimcore/modules/class-definition/components/sidebar/class-definition-sidebar'
import { ConfigLayout } from '@sdk/components'
import React from 'react'
import { ClassDefinitionsTabsProvider } from '@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider'

export const ClassDefinitionWidget = (): React.JSX.Element => {
  return (
    <ClassDefinitionsTabsProvider>
      <ConfigLayout
        leftItem={ {
          minSize: 250,
          maxSize: 350,
          size: 250,
          children: <ClassDefinitionSidebar />
        } }
        resizeAble
        rightItem={ {
          children: <ClassDefinitionTabs />
        } }
      />
    </ClassDefinitionsTabsProvider>
  )
}
