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
import { type ObjectTabManager } from './tab-manager/object-tab-manager'
import { serviceIds } from '@Pimcore/app/config/services'
import { TabsContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs-container'
import { Toolbar } from '@Pimcore/modules/data-object/editor/toolbar/toolbar'

const ObjectContainer = (): React.JSX.Element => {
  const objectEditorTabManager = useInjection<ObjectTabManager>(serviceIds['DataObject/Editor/ObjectTabManager'])

  return (
    <TabsToolbarView
      renderTabbar={
        <TabsContainer tabManager={ objectEditorTabManager } />
      }

      renderToolbar={
        <Toolbar />
      }
    />
  )
}

export { ObjectContainer }
