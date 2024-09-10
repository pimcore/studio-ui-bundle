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

import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import React from 'react'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import { TabsContainer } from '../../shared-tab-manager/tabs-container'
import { type ArchiveTabManager } from './tab-manager/archive-tab-manager'
import { Toolbar } from '../../toolbar/toolbar'

const ArchiveContainer = (): React.JSX.Element => {
  const archiveTabManager = useInjection<ArchiveTabManager>(serviceIds['Asset/Editor/ArchiveTabManager'])
  return (
    <TabsToolbarView
      renderTabbar={
        <TabsContainer tabManager={ archiveTabManager } />
      }

      renderToolbar={
        <Toolbar />
      }
    />
  )
}

export { ArchiveContainer }
