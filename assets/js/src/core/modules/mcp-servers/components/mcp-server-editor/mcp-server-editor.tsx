/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
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
import { Button } from '@Pimcore/components/button/button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { copyToClipboardWithFeedback } from '@Pimcore/utils/clipboard'
import { type McpServer, type McpServerAccessGrant, type McpTool } from '../../mcp-servers-api-slice.gen'
import { deriveScopes, slugify } from '../../utils'
import { ToolsField } from './tools-field'
import { SharingFields } from './sharing-fields'
import { useStyles } from './mcp-server-editor.styles'

export interface McpServerEditorBody {
  name: string
  urlSlug: string
  description?: string
  tools?: string[]
  enabled?: boolean
  shareGlobal?: boolean
  sharedUsers?: McpServerAccessGrant[]
  sharedRoles?: McpServerAccessGrant[]
}

interface McpServerFormValues {
  name: string
  urlSlug: string
  description?: string
  enabled: boolean
}

interface McpServerEditorProps {
  server: McpServer | null
  tools: McpTool[]
  saving: boolean
  onSave: (body: McpServerEditorBody) => void
  onDelete: (server: McpServer) => void
}

const SLUG_PATTERN = /^[a-z0-9-]+$/

export const McpServerEditor = ({
  server,
  tools,
  saving,
  onSave,
  onDelete
}: McpServerEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { success, error } = useMessage()
  const [form] = Form.useForm<McpServerFormValues>()

  const isCreate = isNil(server)
  // Editing needs BOTH: the requesting user's write permission AND a writeable storage target.
  const canWrite = isCreate ? true : server.currentUserPermissions.write
  const storageWriteable = isCreate ? true : server.writeable
  const editable = canWrite && storageWriteable

  const [selectedTools, setSelectedTools] = useState<string[]>(server?.tools ?? [])
  const [shareGlobal, setShareGlobal] = useState<boolean>(server?.shareGlobal ?? true)
  const [sharedUsers, setSharedUsers] = useState<McpServerAccessGrant[]>(server?.sharedUsers ?? [])
  const [sharedRoles, setSharedRoles] = useState<McpServerAccessGrant[]>(server?.sharedRoles ?? [])
  const slugEdited = useRef<boolean>(!isCreate)

  // Live name — drives the slug default in create mode only.
  const nameValue = Form.useWatch('name', form)

  useEffect(() => {
    if (isCreate && !slugEdited.current) {
      form.setFieldValue('urlSlug', slugify(nameValue ?? ''))
    }
  }, [nameValue, isCreate, form])

  const derivedScopes = deriveScopes(selectedTools, tools)

  const handleSave = (): void => {
    form
      .validateFields()
      .then((values) => {
        onSave({
          name: values.name,
          urlSlug: values.urlSlug,
          description: values.description,
          tools: selectedTools,
          enabled: values.enabled,
          shareGlobal,
          sharedUsers,
          sharedRoles
        })
      })
      .catch(() => {
        // Validation errors are surfaced inline by the form; nothing else to do.
      })
  }

  const copyUrl = (url: string): void => {
    void copyToClipboardWithFeedback(
      url,
      () => { void success(t('clipboard.copy.success')) },
      () => { void error(t('clipboard.copy.error')) }
    )
  }

  return (
    <Flex
      className={ styles.mask }
      gap="small"
      vertical
    >
      <Flex
        align="center"
        justify="space-between"
      >
        <Title level={ 4 }>
          {isCreate ? t('mcp-servers.editor.create-title') : t('mcp-servers.editor.edit-title')}
        </Title>
        {editable && (
          <Flex gap="small">
            {!isCreate && (
              <Button
                onClick={ () => { onDelete(server) } }
              >
                {t('delete')}
              </Button>
            )}
            <Button
              loading={ saving }
              onClick={ handleSave }
              type="primary"
            >
              {t('button.save')}
            </Button>
          </Flex>
        )}
      </Flex>

      {!storageWriteable && (
        <Text type="warning">{t('mcp-servers.read-only-notice')}</Text>
      )}

      <Form
        disabled={ !editable }
        form={ form }
        initialValues={ {
          name: server?.name ?? '',
          urlSlug: server?.urlSlug ?? '',
          description: server?.description ?? '',
          enabled: server?.enabled ?? true
        } }
        layout="vertical"
      >
        <Title level={ 5 }>{t('mcp-servers.editor.identity')}</Title>

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
            onChange={ () => { slugEdited.current = true } }
          />
        </Form.Item>

        <Form.Item
          label={ t('mcp-servers.editor.description') }
          name="description"
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label={ t('mcp-servers.editor.enabled') }
          name="enabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Title level={ 5 }>{t('mcp-servers.editor.tools')}</Title>
        <Form.Item label={ t('mcp-servers.editor.tools') }>
          <ToolsField
            disabled={ !editable }
            onChange={ setSelectedTools }
            tools={ tools }
            value={ selectedTools }
          />
        </Form.Item>
      </Form>

      <SharingFields
        disabled={ !editable }
        onShareGlobalChange={ setShareGlobal }
        onSharedRolesChange={ setSharedRoles }
        onSharedUsersChange={ setSharedUsers }
        shareGlobal={ shareGlobal }
        sharedRoles={ sharedRoles }
        sharedUsers={ sharedUsers }
      />

      <Title level={ 5 }>{t('mcp-servers.editor.scopes')}</Title>
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

      {!isCreate && (
        <>
          <Title level={ 5 }>{t('mcp-servers.editor.url')}</Title>
          <Flex
            align="center"
            className={ styles.urlRow }
            gap="small"
            justify="space-between"
          >
            <Text className={ styles.urlText }>{server.url}</Text>
            <IconButton
              icon={ { value: 'copy' } }
              onClick={ () => { copyUrl(server.url) } }
              type="link"
            />
          </Flex>
          <Text className={ styles.hint }>{t('mcp-servers.editor.connect-hint')}</Text>
        </>
      )}
    </Flex>
  )
}
