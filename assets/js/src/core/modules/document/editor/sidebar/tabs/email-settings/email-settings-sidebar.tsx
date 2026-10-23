/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from '@Pimcore/components/title/title'
import { Content } from '@sdk/components'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { isUndefined } from 'lodash'
import { EmailSettingsForm } from './email-settings-form'
import { checkDocumentPermission } from '../../visibility/document-permission-helper'

export const EmailSettingsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const context = useContext(DocumentContext)
  const { id } = context
  const { document } = useDocumentDraft(id)

  const hasSavePermission = checkDocumentPermission(context, 'save') || checkDocumentPermission(context, 'publish')

  // Get initial values from document draft settingsData
  const initialValues = useMemo(() => {
    interface SettingsData {
      subject?: string
      from?: string
      replyTo?: string
      to?: string
      cc?: string
      bcc?: string
    }
    const settingsData: SettingsData = document?.settingsData ?? {}
    return {
      subject: settingsData?.subject ?? '',
      from: settingsData?.from ?? '',
      replyTo: settingsData?.replyTo ?? '',
      to: settingsData?.to ?? '',
      cc: settingsData?.cc ?? '',
      bcc: settingsData?.bcc ?? ''
    }
  }, [document?.settingsData])

  const isDataReady = !isUndefined(document)

  return (
    <Content
      loading={ !isDataReady }
      padded
      padding={ { top: 'extra-small', x: 'small', bottom: 'small' } }
    >
      <Title>{t('email-settings.sidebar-title')}</Title>

      {isDataReady && (
        <EmailSettingsForm
          documentId={ id }
          hasSavePermission={ hasSavePermission }
          initialValues={ initialValues }
        />
      )}
    </Content>
  )
}
