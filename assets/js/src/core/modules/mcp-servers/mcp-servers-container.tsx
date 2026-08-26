/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { Empty } from '@Pimcore/components/empty/empty'
import { Content } from '@Pimcore/components/content/content'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
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
import { McpServerEditor, type McpServerEditorBody } from './components/mcp-server-editor/mcp-server-editor'
import { useStyles } from './mcp-servers-container.styles'

export const McpServersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { modal } = useStudioModal()

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [createMode, setCreateMode] = useState<boolean>(false)

  const { data: serversData, isLoading: serversLoading, error: serversError } = useMcpGetServersQuery()
  const { data: toolsData, error: toolsError } = useMcpGetToolsQuery()

  const [createServer, { isLoading: creating, error: createError }] = useMcpCreateServerMutation()
  const [updateServer, { isLoading: updating, error: updateError }] = useMcpUpdateServerMutation()
  const [deleteServer, { error: deleteError }] = useMcpDeleteServerMutation()

  const servers = serversData?.items ?? []
  const tools = toolsData?.items ?? []

  const selectedServer = isNil(selectedId)
    ? null
    : servers.find((server) => server.id === selectedId) ?? null

  useEffect(() => {
    const error = serversError ?? toolsError ?? createError ?? updateError ?? deleteError
    if (!isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [serversError, toolsError, createError, updateError, deleteError])

  const handleSelect = (server: McpServer): void => {
    setCreateMode(false)
    setSelectedId(server.id)
  }

  const handleNew = (): void => {
    setCreateMode(true)
    setSelectedId(null)
  }

  const handleSave = (body: McpServerEditorBody): void => {
    const request = createMode
      ? createServer({ body })
      : !isNil(selectedServer)
          ? updateServer({ id: selectedServer.id, body })
          : null

    if (isNil(request)) {
      return
    }

    void request.then((result) => {
      if (!('error' in result)) {
        if (createMode) {
          setCreateMode(false)
          setSelectedId(result.data.id)
        }
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
          setSelectedId(null)
        }
      }
    })
  }

  const renderRight = (): React.JSX.Element => {
    if (serversLoading) {
      return (
        <Content
          loading
          padded
        />
      )
    }

    if (!createMode && isNil(selectedServer)) {
      return <Empty description={ t('mcp-servers.placeholder') } />
    }

    return (
      <McpServerEditor
        key={ createMode ? 'new' : selectedId ?? 'new' }
        onDelete={ handleDelete }
        onSave={ handleSave }
        saving={ creating || updating }
        server={ createMode ? null : selectedServer }
        tools={ tools }
      />
    )
  }

  return (
    <div className={ styles.container }>
      <ConfigLayout
        leftItem={ {
          size: 25,
          minSize: 200,
          children: (
            <McpServersRail
              createMode={ createMode }
              isLoading={ serversLoading }
              onNew={ handleNew }
              onSelect={ handleSelect }
              selectedId={ selectedId }
              servers={ servers }
            />
          )
        } }
        resizeAble
        rightItem={ {
          size: 75,
          children: renderRight()
        } }
        withDivider
      />
    </div>
  )
}
