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
import React, { useMemo } from 'react'
import { TreeContainer } from './components/tree/tree-container'
import { WidgetDetailContainer } from './components/widget-detail/widget-detail-container'

export const WidgetEditorContainerInner = (): React.JSX.Element => {
  const sidebar = useMemo(() => ({
    id: 'widget-editor.widget-editor.sidebar',
    minSize: 170,
    children: [
      <TreeContainer
        key="widget-editor.widget-editor.sidebar"
      />
    ]
  }), [])

  const main = useMemo(() => ({
    id: 'widget-editor.widget-editor.main',
    minSize: 600,
    children: [
      <WidgetDetailContainer key={ 'widget-editor.widget-editor.main.detailTab' } />
    ]
  }), [])

  return (
    <ConfigLayout
      leftItem={ sidebar }
      rightItem={ main }
    />
  )
}
