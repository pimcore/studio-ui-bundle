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
import React, { useCallback, useMemo } from 'react'
import { useActiveTabContext, useWidgetEditorActions, useWidgetEditorData } from '../../context/hooks/use-widget-editor-context'
import { WidgetDetailTab } from './tabs/widget-detail-tab/widget-detail-tab'

export const WidgetDetailContainer = (): React.JSX.Element => {
  const { widgets } = useWidgetEditorData()
  const { closeWidget } = useWidgetEditorActions()
  const { activeTabId, setActiveTabId } = useActiveTabContext()

  const items = useMemo(() => {
    return widgets.map((widget) => ({
      key: widget.id,
      label: widget.name,
      closable: true,
      children: <WidgetDetailTab widget={ widget } />
    }))
  }, [widgets])

  const handleChange = useCallback((key: string) => {
    setActiveTabId(key)
  }, [setActiveTabId])

  const handleClose = useCallback((key: string) => {
    closeWidget(key)
  }, [closeWidget])

  return (
    <Tabs
      activeKey={ activeTabId }
      fullHeight
      items={ items }
      onChange={ handleChange }
      onClose={ handleClose }
    />
  )
}
