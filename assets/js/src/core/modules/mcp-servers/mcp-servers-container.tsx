/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useMcpGetServersQuery,
  useMcpGetToolsQuery,
  useMcpCreateServerMutation,
  useMcpUpdateServerMutation,
  useMcpDeleteServerMutation,
  type McpServer
} from './mcp-servers-api-slice.gen'
import { McpServersRail } from './components/mcp-servers-rail/mcp-servers-rail'
import { McpServerTabs } from './components/mcp-server-tabs/mcp-server-tabs'
import { type McpServerEditorBody } from './components/mcp-server-editor/mcp-server-editor'
import { useMcpServerTabManager, NEW_SERVER_KEY } from './hooks/use-mcp-server-tab-manager'
import { useStyles } from './mcp-servers-container.styles'

export const McpServersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { modal } = useStudioModal()
  const { success } = useMessage()

  const tabManager = useMcpServerTabManager()

  const {
    data: serversData,
    isLoading: serversLoading,
    isFetching: serversFetching,
    error: serversError,
    refetch: refetchServers
  } = useMcpGetServersQuery()
  const { data: toolsData, error: toolsError } = useMcpGetToolsQuery()

  const [createServer, { isLoading: creating, error: createError }] = useMcpCreateServerMutation()
  const [updateServer, { isLoading: updating, error: updateError }] = useMcpUpdateServerMutation()
  const [deleteServer, { error: deleteError }] = useMcpDeleteServerMutation()

  const servers = serversData?.items ?? []
  const tools = toolsData?.items ?? []

  useEffect(() => {
    const error = serversError ?? toolsError ?? createError ?? updateError ?? deleteError
    if (error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [serversError, toolsError, createError, updateError, deleteError])

  const handleSelect = (server: McpServer): void => {
    tabManager.openTab({ id: server.id, name: server.name, writeable: server.writeable })
  }

  const handleNew = (): void => {
    tabManager.openTab({ id: NEW_SERVER_KEY, name: t('mcp-servers.tabs.new-server'), writeable: true })
  }

  const handleSave = (tabId: string, body: McpServerEditorBody): void => {
    const request = tabId === NEW_SERVER_KEY
      ? createServer({ body })
      : updateServer({ id: tabId, body })

    void request.then((result) => {
      if (!('error' in result)) {
        void success(t('mcp-servers.save-success'))
        tabManager.markDirty(tabId, false)
        if (tabId === NEW_SERVER_KEY) {
          tabManager.closeTab(NEW_SERVER_KEY)
          tabManager.openTab({
            id: result.data.id,
            name: result.data.name,
            writeable: result.data.writeable
          })
        }
        // A rename shows up on the tab label via the refreshed server list
        // (see McpServerTabs) — no in-place tab patching needed.
      }
    })
  }

  const handleDelete = (server: McpServer): void => {
    modal.confirm({
      title: t('mcp-servers.delete.title'),
      content: t('mcp-servers.delete.confirm', { name: server.name }),
      okText: t('delete'),
      cancelText: t('button.cancel'),
      onOk: async () => {
        const result = await deleteServer({ id: server.id })
        if (!('error' in result)) {
          tabManager.closeTab(server.id)
        }
      }
    })
  }

  return (
    <div className={ styles.container }>
      <ConfigLayout
        leftItem={ {
          size: 25,
          minSize: 200,
          children: (
            <McpServersRail
              activeId={ tabManager.activeTabKey }
              isFetching={ serversFetching }
              isLoading={ serversLoading }
              onDelete={ handleDelete }
              onNew={ handleNew }
              onRefresh={ refetchServers }
              onSelect={ handleSelect }
              servers={ servers }
            />
          )
        } }
        resizeAble
        rightItem={ {
          size: 75,
          children: (
            <McpServerTabs
              onSave={ handleSave }
              saving={ creating || updating }
              servers={ servers }
              tabManager={ tabManager }
              tools={ tools }
            />
          )
        } }
        withDivider
      />
    </div>
  )
}
