/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Menu } from '@Pimcore/components/menu/menu'
import {
  ContextMenuWrapper,
  useCloseContextMenu
} from '@Pimcore/components/context-menu-wrapper/context-menu-wrapper'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '../../../auth/enums/user-permission'
import { type McpServer } from '../../mcp-servers-api-slice.gen'
import { useStyles } from './mcp-servers-rail.styles'

interface McpServersRailProps {
  servers: McpServer[]
  isLoading: boolean
  isFetching: boolean
  activeId: string | undefined
  onSelect: (server: McpServer) => void
  onNew: () => void
  onRefresh: () => void
  onDelete: (server: McpServer) => void
}

interface RailContextMenuProps {
  server: McpServer
  onDelete: (server: McpServer) => void
}

const RailContextMenu = ({ server, onDelete }: RailContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const closeMenu = useCloseContextMenu()

  return (
    <Menu
      items={ [
        {
          key: 'delete',
          label: t('delete'),
          icon: <Icon value="trash" />,
          onClick: () => {
            closeMenu?.()
            onDelete(server)
          }
        }
      ] }
    />
  )
}

export const McpServersRail = ({
  servers,
  isLoading,
  isFetching,
  activeId,
  onSelect,
  onNew,
  onRefresh,
  onDelete
}: McpServersRailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles, cx } = useStyles()

  const canCreate = isAllowed(UserPermission.McpServers)

  const renderRow = (server: McpServer): React.JSX.Element => {
    const isSelected = !isNil(activeId) && activeId === server.id
    const canDelete = server.currentUserPermissions.write && server.writeable

    const row = (
      <button
        className={ cx(styles.item, isSelected && styles.itemSelected) }
        onClick={ () => { onSelect(server) } }
        type="button"
      >
        <Text className={ !server.enabled ? styles.itemDisabled : undefined }>
          {server.name}
        </Text>
      </button>
    )

    if (!canDelete) {
      return row
    }

    return (
      <ContextMenuWrapper
        renderMenu={ () => (
          <RailContextMenu
            onDelete={ onDelete }
            server={ server }
          />
        ) }
      >
        {row}
      </ContextMenuWrapper>
    )
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify="space-between">
          <Tooltip title={ t('refresh') }>
            <IconButton
              disabled={ isFetching }
              icon={ { value: 'refresh' } }
              onClick={ onRefresh }
              type="link"
            />
          </Tooltip>
          {canCreate && (
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ onNew }
              type="link"
            >
              {t('new')}
            </IconTextButton>
          )}
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
        padded
      >
        {!isLoading && servers.length === 0
          ? <Content none />
          : (
            <Flex
              gap="mini"
              vertical
            >
              {servers.map((server) => (
                <React.Fragment key={ server.id }>
                  {renderRow(server)}
                </React.Fragment>
              ))}
            </Flex>
            )}
      </Content>
    </ContentLayout>
  )
}
