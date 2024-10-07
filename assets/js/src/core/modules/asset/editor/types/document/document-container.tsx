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
import { TabsContainer } from '../../../../element/editor/shared-tab-manager/tabs-container'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DocumentTabManager } from './tab-manager/document-tab-manager'
import { serviceIds } from '@Pimcore/app/config/services'
import { Toolbar } from '../../toolbar/toolbar'

const DocumentContainer = (): React.JSX.Element => {
  const documentTabManager = useInjection<DocumentTabManager>(serviceIds['Asset/Editor/DocumentTabManager'])

  return (
    <TabsToolbarView
      renderTabbar={
        <TabsContainer tabManager={ documentTabManager } />
      }

      renderToolbar={
        <Toolbar />
      }
    />
  )
}

export { DocumentContainer }
