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
import { type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { Box } from '@Pimcore/components/box/box'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { isNil, isUndefined } from 'lodash'
import { usePropertiesInitialization } from '@Pimcore/modules/element/hooks/use-properties-initialization'
import { checkDocumentPermission } from '../../visibility/document-permission-helper'
import { ContentSettingsForm } from './content-settings-form'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export interface ContentSettingsSidebarProps {
  allowedContentMainDocumentTypes?: string[]
  enableTitleDescription?: boolean
  enablePrettyUrl?: boolean
}

export const ContentSettingsSidebar = ({
  ...props
}: ContentSettingsSidebarProps = {}): React.JSX.Element => {
  const { t } = useTranslation()
  const context = useContext(DocumentContext)
  const { id } = context
  const { document } = useDocumentDraft(id)

  const hasPropertiesPermission = checkDocumentPermission(context, 'properties')
  const hasSavePermission = checkDocumentPermission(context, 'save') || checkDocumentPermission(context, 'publish')

  const { data: propertiesData, isLoading: isLoadingProperties } = usePropertiesInitialization({
    skip: !hasPropertiesPermission
  })

  const languageProperty = propertiesData?.items?.find(prop => prop.key === 'language')
  const currentLanguage = languageProperty?.data ?? ''

  // Get initial values from document draft settingsData and properties
  const initialValues = useMemo(() => {
    interface SettingsData {
      title?: string
      description?: string
      prettyUrl?: string
      contentMainDocumentId?: number
      contentMainDocumentPath?: string
    }
    const settingsData: SettingsData = document?.settingsData ?? {}
    return {
      title: settingsData?.title ?? '',
      description: settingsData?.description ?? '',
      language: currentLanguage,
      prettyUrl: settingsData?.prettyUrl ?? '',
      contentMainDocument: !isNil(settingsData?.contentMainDocumentId)
        ? {
          id: settingsData.contentMainDocumentId,
          type: elementTypes.document,
          fullPath: settingsData.contentMainDocumentPath ?? ''
        } satisfies ManyToOneRelationValueType
        : null
    }
  }, [document?.settingsData, currentLanguage])

  const isDataReady = hasPropertiesPermission ? (!isLoadingProperties && !isUndefined(propertiesData)) : true

  return (
    <Content loading={ !isDataReady }>
      <SidebarTitle withBorder>
        {t('content-settings')}
      </SidebarTitle>

      <Box padding={ { x: 'extra-small', bottom: 'small' } }>
        <ContentSettingsForm
          { ...props }
          documentId={ id }
          hasPropertiesPermission={ hasPropertiesPermission }
          hasSavePermission={ hasSavePermission }
          initialValues={ initialValues }
        />
      </Box>
    </Content>
  )
}
