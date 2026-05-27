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
import { checkDocumentPermission } from '../../visibility/document-permission-helper'

export const DocumentConfigurationSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const context = useContext(DocumentContext)
  const { id } = context
  const { document } = useDocumentDraft(id)

  const hasSavePermission = checkDocumentPermission(context, 'save') || checkDocumentPermission(context, 'publish')

  // Load API data with refetch on mount. Use isFetching so the skeleton stays
  // visible during the on-mount refetch, not just during the very first fetch.
  const { data: controllersData, isFetching: isLoadingControllers } = useDocumentAvailableControllersListQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const { data: templatesData, isFetching: isLoadingTemplates } = useDocumentAvailableTemplatesListQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const { data: predefinedDocTypesData, isFetching: isLoadingDocTypes } = useDocumentDocTypeListQuery({
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

  const apiData = {
    controllers: controllersData?.items ?? [],
    templates: templatesData?.items ?? [],
    predefinedDocTypes: predefinedDocTypesData?.items ?? []
  }

  return (
    <Content>
      <SidebarTitle withBorder>
        {t('document-configuration.sidebar-title')}
      </SidebarTitle>

      <Box padding={ { x: 'extra-small', bottom: 'small' } }>
        {!isUndefined(document) && (
          <DocumentConfigurationForm
            apiData={ apiData }
            documentId={ id }
            documentType={ document?.type }
            hasSavePermission={ hasSavePermission }
            initialValues={ initialValues }
            isLoadingControllers={ isLoadingControllers }
            isLoadingDocTypes={ isLoadingDocTypes }
            isLoadingTemplates={ isLoadingTemplates }
          />
        )}
      </Box>
    </Content>
  )
}
