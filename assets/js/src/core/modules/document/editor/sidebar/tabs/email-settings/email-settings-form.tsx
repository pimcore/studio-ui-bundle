/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Text } from '@Pimcore/components/text/text'
import { SidebarHeadline } from '@Pimcore/components/sidebar-headline/sidebar-headline'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useSave } from '@Pimcore/modules/document/actions/save/use-save'

interface EmailSettingsFormProps {
  documentId: number
  initialValues: {
    subject: string
    from: string
    replyTo: string
    to: string
    cc: string
    bcc: string
  }
  hasSavePermission?: boolean
}

interface SettingsData {
  subject?: string
  from?: string
  replyTo?: string
  to?: string
  cc?: string
  bcc?: string
}

export const EmailSettingsForm = ({
  documentId,
  initialValues,
  hasSavePermission = true
}: EmailSettingsFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateSettingsData } = useDocumentDraft(documentId)
  const { debouncedAutoSave } = useSave()
  const [form] = Form.useForm()

  const canEdit = hasSavePermission

  const handleFormChange = useCallback((changedValues: Partial<SettingsData>) => {
    if (!canEdit) return

    updateSettingsData(changedValues)
    debouncedAutoSave()
  }, [updateSettingsData, debouncedAutoSave, canEdit])

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        onValuesChange: handleFormChange
      } }
    >
      <Form.Item
        label={ t('email-settings.subject') }
        name="subject"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        extra={ t('email-settings.from-syntax-hint') }
        label={ t('email-settings.from') }
        name="from"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('email-settings.reply-to') }
        name="replyTo"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <SidebarHeadline
        marginBottom="none"
        withBorder
      >
        {t('email-settings.recipients')}
      </SidebarHeadline>

      <Form.Item
        label={ t('email-settings.to') }
        name="to"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('email-settings.cc') }
        name="cc"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Form.Item
        label={ t('email-settings.bcc') }
        name="bcc"
      >
        <Input disabled={ !canEdit } />
      </Form.Item>

      <Text type="secondary">
        {t('email-settings.multiple-recipients-hint')}
      </Text>
    </FormKit>
  )
}
