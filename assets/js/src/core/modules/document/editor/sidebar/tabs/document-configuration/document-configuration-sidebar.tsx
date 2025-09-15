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
import { useDocumentAvailableControllersListQuery, useDocumentAvailableTemplatesListQuery, useDocumentDocTypeListQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { isUndefined } from 'lodash'
import { DocumentConfigurationForm } from './document-configuration-form'

export const DocumentConfigurationSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)

  // Load API data with refetch on mount
  const { data: controllersData, isLoading: isLoadingControllers } = useDocumentAvailableControllersListQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const { data: templatesData, isLoading: isLoadingTemplates } = useDocumentAvailableTemplatesListQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const { data: predefinedDocTypesData, isLoading: isLoadingDocTypes } = useDocumentDocTypeListQuery({
    type: document?.type ?? 'page'
  }, {
    refetchOnMountOrArgChange: true
  })

  const initialValues = useMemo(() => {
    interface SettingsData {
      controller?: string
      template?: string
      staticGeneratorEnabled?: boolean
      staticGeneratorLifetime?: number
    }
    const settingsData: SettingsData = document?.settingsData ?? {}
    return {
      predefinedDocumentType: '',
      controller: settingsData?.controller ?? '',
      template: settingsData?.template ?? '',
      staticGeneratorEnabled: settingsData?.staticGeneratorEnabled ?? false,
      staticGeneratorLifetime: settingsData?.staticGeneratorLifetime ?? null
    }
  }, [document?.settingsData])

  const isDataReady = !isUndefined(document) && !isLoadingControllers && !isLoadingTemplates && !isLoadingDocTypes

  const apiData = {
    controllers: controllersData?.items ?? [],
    templates: templatesData?.items ?? [],
    predefinedDocTypes: predefinedDocTypesData?.items ?? []
  }

  return (
    <Content loading={ !isDataReady }>
      <SidebarTitle withBorder>
        {t('document-configuration.sidebar-title')}
      </SidebarTitle>

      <Box padding={ { x: 'extra-small', bottom: 'small' } }>
        {isDataReady && (
          <DocumentConfigurationForm
            documentId={ id }
            documentType={ document?.type }
            initialValues={ initialValues }
            apiData={ apiData }
          />
        )}
      </Box>
    </Content>
  )
}
