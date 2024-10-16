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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { TabsContainer } from '../../../../element/editor/shared-tab-manager/tabs-container'
import { type UnknownTabManager } from './tab-manager/unknown-tab-manager'
import { Toolbar } from '../../toolbar/toolbar'

const UnknownContainer = (): React.JSX.Element => {
  const unknownTabManager = useInjection<UnknownTabManager>(serviceIds['Asset/Editor/UnknownTabManager'])

  return (
    <TabsToolbarView
      renderTabbar={
        <TabsContainer tabManager={ unknownTabManager } />
      }

      renderToolbar={
        <Toolbar />
      }
    />
  )
}

export { UnknownContainer }
