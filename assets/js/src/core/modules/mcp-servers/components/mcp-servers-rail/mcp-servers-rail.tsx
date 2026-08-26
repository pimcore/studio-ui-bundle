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
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '../../../auth/enums/user-permission'
import { type McpServer } from '../../mcp-servers-api-slice.gen'
import { useStyles } from './mcp-servers-rail.styles'

interface McpServersRailProps {
  servers: McpServer[]
  isLoading: boolean
  selectedId: string | null
  createMode: boolean
  onSelect: (server: McpServer) => void
  onNew: () => void
}

export const McpServersRail = ({
  servers,
  isLoading,
  selectedId,
  createMode,
  onSelect,
  onNew
}: McpServersRailProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles, cx } = useStyles()

  const canCreate = isAllowed(UserPermission.McpServers)

  return (
    <Flex
      className={ styles.rail }
      gap="small"
      vertical
    >
      {canCreate && (
        <IconTextButton
          icon={ { value: 'new' } }
          onClick={ onNew }
          type="primary"
        >
          {t('mcp-servers.rail.new-server')}
        </IconTextButton>
      )}

      {!isLoading && servers.length === 0 && (
        <Content none />
      )}

      <Flex
        gap="mini"
        vertical
      >
        {servers.map((server) => {
          const isSelected = !createMode && !isNil(selectedId) && selectedId === server.id
          return (
            <button
              className={ cx(styles.item, isSelected && styles.itemSelected) }
              key={ server.id }
              onClick={ () => { onSelect(server) } }
              type="button"
            >
              <Text className={ !server.enabled ? styles.itemDisabled : undefined }>
                {server.name}
              </Text>
            </button>
          )
        })}
      </Flex>
    </Flex>
  )
}
