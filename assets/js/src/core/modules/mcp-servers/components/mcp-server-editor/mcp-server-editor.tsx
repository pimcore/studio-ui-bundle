/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { Form } from '@Pimcore/components/form/form'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Portal } from '@Pimcore/components/portal/portal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { copyToClipboardWithFeedback } from '@Pimcore/utils/clipboard'
import { type McpServer, type McpServerAccessGrant, type McpTool } from '../../mcp-servers-api-slice.gen'
import { deriveScopes, slugify } from '../../utils'
import { useMcpServerDirty, type McpServerSnapshot } from '../../hooks/use-mcp-server-dirty'
import { GeneralFields } from './general-fields'
import { SharingFields } from './sharing-fields'

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
  isCreate: boolean
  isActive: boolean
  /** Id of the tabs-level portal slot the Save button renders into. */
  portalSlotName: string
  tools: McpTool[]
  saving: boolean
  onSave: (body: McpServerEditorBody) => void
  onDirtyChange: (dirty: boolean) => void
}

export const McpServerEditor = ({
  server,
  isCreate,
  isActive,
  portalSlotName,
  tools,
  saving,
  onSave,
  onDirtyChange
}: McpServerEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { success, error } = useMessage()
  const [form] = Form.useForm<McpServerFormValues>()

  // Editing needs BOTH: the requesting user's edit permission AND a writeable storage target.
  const canWrite = isCreate ? true : server?.currentUserPermissions.canEdit ?? false
  const storageWriteable = isCreate ? true : server?.writeable ?? false
  const editable = canWrite && storageWriteable

  const [selectedTools, setSelectedTools] = useState<string[]>(server?.tools ?? [])
  const [shareGlobal, setShareGlobal] = useState<boolean>(server?.shareGlobal ?? true)
  const [sharedUsers, setSharedUsers] = useState<McpServerAccessGrant[]>(server?.sharedUsers ?? [])
  const [sharedRoles, setSharedRoles] = useState<McpServerAccessGrant[]>(server?.sharedRoles ?? [])
  const slugEdited = useRef<boolean>(!isCreate)

  // Defer the Save portal until after mount so the tabs-level slot exists in the DOM.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Live form values — drive both the slug default (create mode) and dirty tracking.
  const nameValue = Form.useWatch('name', form)
  const urlSlugValue = Form.useWatch('urlSlug', form)
  const descriptionValue = Form.useWatch('description', form)
  const enabledValue = Form.useWatch('enabled', form)

  useEffect(() => {
    if (isCreate && !slugEdited.current) {
      form.setFieldValue('urlSlug', slugify(nameValue ?? ''))
    }
  }, [nameValue, isCreate, form])

  // Push a persisted snapshot back into the fields. Called when the server the
  // editor is bound to changes (initial load, or the refetch a save triggers), so
  // the live fields and the dirty baseline are always seeded from the same object.
  const applyServerSnapshot = useCallback((snapshot: McpServerSnapshot): void => {
    form.setFieldsValue({
      name: snapshot.name,
      urlSlug: snapshot.urlSlug,
      description: snapshot.description,
      enabled: snapshot.enabled
    })
    setSelectedTools(snapshot.tools)
    setShareGlobal(snapshot.shareGlobal)
    setSharedUsers(snapshot.sharedUsers)
    setSharedRoles(snapshot.sharedRoles)
  }, [form])

  useMcpServerDirty({
    server,
    name: nameValue ?? '',
    urlSlug: urlSlugValue ?? '',
    description: descriptionValue ?? '',
    enabled: enabledValue ?? true,
    tools: selectedTools,
    shareGlobal,
    sharedUsers,
    sharedRoles,
    onDirtyChange,
    onResync: applyServerSnapshot
  })

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

  // A non-create tab whose server has not yet arrived (e.g. right after a create
  // refetch) — show a loader rather than an empty editor.
  if (!isCreate && isNil(server)) {
    return (
      <Content
        loading
        padded
      />
    )
  }

  const tabItems = [
    {
      key: 'general',
      label: t('mcp-servers.editor.general'),
      children: (
        <GeneralFields
          derivedScopes={ derivedScopes }
          editable={ editable }
          isCreate={ isCreate }
          onCopyUrl={ copyUrl }
          onSlugEdited={ () => { slugEdited.current = true } }
          onToolsChange={ setSelectedTools }
          selectedTools={ selectedTools }
          server={ server }
          tools={ tools }
        />
      )
    },
    {
      key: 'permissions',
      label: t('mcp-servers.editor.permissions'),
      children: (
        <SharingFields
          disabled={ !editable }
          onShareGlobalChange={ setShareGlobal }
          onSharedRolesChange={ setSharedRoles }
          onSharedUsersChange={ setSharedUsers }
          ownerName={ server?.owner ?? null }
          shareGlobal={ shareGlobal }
          sharedRoles={ sharedRoles }
          sharedUsers={ sharedUsers }
        />
      )
    }
  ]

  return (
    <Content
      padded
      padding={ { top: 'small', right: 'small', bottom: 'small', left: 'small' } }
    >
      {/* Save lives in the tabs-level bottom toolbar; only the active editor fills the slot. */}
      {isActive && mounted && editable && (
        <Portal targetId={ portalSlotName }>
          <Button
            loading={ saving }
            onClick={ handleSave }
            type="primary"
          >
            {t('save')}
          </Button>
        </Portal>
      )}

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
        <Tabs items={ tabItems } />
      </Form>
    </Content>
  )
}
