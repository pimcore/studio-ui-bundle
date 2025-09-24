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
import { SidebarTitle } from '@Pimcore/components/sidebar/title'
import { Content } from '@sdk/components'
import { Box } from '@Pimcore/components/box/box'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { isUndefined } from 'lodash'
import { EmailSettingsForm } from './email-settings-form'

export const EmailSettingsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)

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
    <Content loading={ !isDataReady }>
      <SidebarTitle withBorder>
        {t('email-settings.sidebar-title')}
      </SidebarTitle>

      <Box padding={ { x: 'extra-small', bottom: 'small' } }>
        {isDataReady && (
          <EmailSettingsForm
            documentId={ id }
            initialValues={ initialValues }
          />
        )}
      </Box>
    </Content>
  )
}
