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
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Switch } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { Title } from '@Pimcore/components/title/title'
import { Tag } from '@Pimcore/components/tag/tag'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type McpServer, type McpTool } from '../../mcp-servers-api-slice.gen'
import { ToolsField } from './tools-field'
import { useStyles } from './mcp-server-editor.styles'

const SLUG_PATTERN = /^[a-z0-9-]+$/

interface GeneralFieldsProps {
  server: McpServer | null
  isCreate: boolean
  editable: boolean
  tools: McpTool[]
  selectedTools: string[]
  onToolsChange: (value: string[]) => void
  derivedScopes: string[]
  onSlugEdited: () => void
  onCopyUrl: (url: string) => void
}

export const GeneralFields = ({
  server,
  isCreate,
  editable,
  tools,
  selectedTools,
  onToolsChange,
  derivedScopes,
  onSlugEdited,
  onCopyUrl
}: GeneralFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        name="enabled"
        valuePropName="checked"
      >
        <Switch labelRight={ <Text>{t('mcp-servers.editor.enabled')}</Text> } />
      </Form.Item>

      <Form.Item
        label={ t('mcp-servers.editor.name') }
        name="name"
        rules={ [{ required: true, message: t('mcp-servers.editor.name-required') }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('mcp-servers.editor.url-slug') }
        name="urlSlug"
        rules={ [
          { required: true, message: t('mcp-servers.editor.url-slug-required') },
          { pattern: SLUG_PATTERN, message: t('mcp-servers.editor.url-slug-pattern') }
        ] }
      >
        <Input
          disabled={ !isCreate }
          onChange={ onSlugEdited }
        />
      </Form.Item>

      {!isCreate && !isNil(server) && (
        <Form.Item
          extra={ t('mcp-servers.editor.connect-hint') }
          label={ t('mcp-servers.editor.url') }
        >
          <Flex
            align="center"
            className={ styles.urlRow }
            gap="small"
            justify="space-between"
          >
            <Text className={ styles.urlText }>{server.url}</Text>
            <IconButton
              icon={ { value: 'copy' } }
              onClick={ () => { onCopyUrl(server.url) } }
              type="link"
            />
          </Flex>
        </Form.Item>
      )}

      <Form.Item
        label={ t('mcp-servers.editor.description') }
        name="description"
      >
        <TextArea />
      </Form.Item>

      <Title level={ 5 }>{t('mcp-servers.editor.tools')}</Title>
      <ToolsField
        disabled={ !editable }
        onChange={ onToolsChange }
        tools={ tools }
        value={ selectedTools }
      />

      <Text>{t('mcp-servers.editor.scopes')}</Text>
      <Flex
        gap="mini"
        wrap
      >
        {derivedScopes.length === 0
          ? <Text type="secondary">{t('mcp-servers.editor.scopes-empty')}</Text>
          : derivedScopes.map((scope) => (
            <Tag key={ scope }>{scope}</Tag>
            ))}
      </Flex>
    </Flex>
  )
}
