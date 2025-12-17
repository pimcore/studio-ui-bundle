/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Tabs } from '@Pimcore/components/tabs/tabs'
import React from 'react'
import { useWidgetEditorContext } from '../../context/hooks/use-widget-editor-context'
import { WidgetDetailTab } from './tabs/widget-detail-tab/widget-detail-tab'

export const WidgetDetailContainer = (): React.JSX.Element => {
  const { widgets, activeTabId, setActiveTabId, closeWidget } = useWidgetEditorContext()

  return (
    <Tabs
      activeKey={ activeTabId }
      fullHeight
      items={ widgets.map((widget) => ({
        key: widget.id,
        label: widget.name,
        closable: true,
        children: <WidgetDetailTab id={ widget.id } />
      })) }
      onChange={ (key) => {
        setActiveTabId(key)
      } }
      onClose={ (key) => {
        closeWidget(key as string)
      } }
    />
  )
}
