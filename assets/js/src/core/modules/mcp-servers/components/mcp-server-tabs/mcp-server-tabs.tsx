/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { Empty } from '@Pimcore/components/empty/empty'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { PortalSlot } from '@Pimcore/components/portal/portal-slot'
import { type McpServer, type McpTool } from '../../mcp-servers-api-slice.gen'
import { type McpServerTabManager, NEW_SERVER_KEY } from '../../hooks/use-mcp-server-tab-manager'
import { McpServerEditor, type McpServerEditorBody } from '../mcp-server-editor/mcp-server-editor'
import { useStyles } from './mcp-server-tabs.styles'

/** Id of the per-tab portal slot the active editor renders its Save button into. */
export const saveSlotId = (tabId: string): string => `mcp-server-save-${tabId}`

interface McpServerTabsProps {
  tabManager: McpServerTabManager
  servers: McpServer[]
  tools: McpTool[]
  saving: boolean
  onSave: (tabId: string, body: McpServerEditorBody) => void
}

export const McpServerTabs = ({
  tabManager,
  servers,
  tools,
  saving,
  onSave
}: McpServerTabsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { tabs, activeTabKey, closeTab, setActiveTab, markDirty } = tabManager

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key)
  }, [setActiveTab])

  const tabItems = useMemo(() => {
    return tabs.map((tab) => {
      const isCreate = tab.id === NEW_SERVER_KEY
      const server = isCreate ? null : servers.find((entry) => entry.id === tab.id) ?? null

      return {
        key: tab.id,
        label: `${tab.name}${tab.isDirty ? ' *' : ''}`,
        children: (
          <McpServerEditor
            isActive={ tab.id === activeTabKey }
            isCreate={ isCreate }
            key={ tab.id }
            onDirtyChange={ (dirty) => { markDirty(tab.id, dirty) } }
            onSave={ (body) => { onSave(tab.id, body) } }
            portalSlotName={ saveSlotId(tab.id) }
            saving={ saving }
            server={ server }
            tools={ tools }
          />
        )
      }
    })
  }, [tabs, activeTabKey, servers, tools, saving, onSave, markDirty])

  if (tabs.length === 0) {
    return (
      <div className={ styles.emptyState }>
        <Empty description={ t('mcp-servers.tabs.empty') } />
      </div>
    )
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify="flex-end">
          {!isNil(activeTabKey) && <PortalSlot id={ saveSlotId(activeTabKey) } />}
        </Toolbar>
      }
    >
      <Tabs
        activeKey={ isNil(activeTabKey) ? undefined : activeTabKey }
        hasStickyHeader
        items={ tabItems }
        onChange={ handleTabChange }
        onClose={ closeTab }
        rootClassName={ styles.tabsContainer }
      />
    </ContentLayout>
  )
}
