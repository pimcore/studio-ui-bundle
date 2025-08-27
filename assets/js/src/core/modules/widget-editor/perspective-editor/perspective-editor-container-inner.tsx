/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { ContentLayout } from '@sdk/components'
import React from 'react'
import { WidgetDetailContainer } from './components/perspective-detail/perspective-detail-container'
import { TreeContainer } from './components/tree/tree-container'

export const PerspectiveEditorContainerInner = (): React.JSX.Element => {
  const sidebar = {
    id: 'widget-editor.perspective-editor.sidebar',
    minSize: 170,
    children: [
      <TreeContainer
        key="widget-editor.perspective-editor.sidebar"
      />
    ]
  }

  const main = {
    id: 'widget-editor.perspective-editor.main',
    minSize: 600,
    children: [
      <WidgetDetailContainer key={ 'widget-editor.perspective-editor.main.detailTab' } />
    ]
  }

  return (
    <ContentLayout>
      <ConfigLayout
        leftItem={ sidebar }
        rightItem={ main }
      />
    </ContentLayout>
  )
}
