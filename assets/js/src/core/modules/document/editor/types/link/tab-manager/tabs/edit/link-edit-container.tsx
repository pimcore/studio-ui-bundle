/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { ManyToOneRelation, type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { getDocumentSidebarManager } from '../../../../../sidebar/sidebar-manager-helper'
import { useDocumentEditorSidebarEntries } from '../../../../../shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Content } from '@sdk/components'
import { isNil } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

interface LinkEditFormData {
  linkTarget: ManyToOneRelationValueType
}

export const LinkEditContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<LinkEditFormData>()

  const { id } = useContext(DocumentContext)
  const { document, updateSettingsData } = useDocumentDraft(id)

  const sidebarManager = getDocumentSidebarManager(document?.type)
  const sidebarButtons = sidebarManager.getButtons()
  const sidebarEntries = useDocumentEditorSidebarEntries()

  const initialValues: LinkEditFormData = React.useMemo(() => {
    const settingsData = document?.settingsData ?? {}

    if (settingsData.linkType === 'direct' && isNonEmptyString(settingsData.direct)) {
      return {
        linkTarget: {
          textInput: true,
          fullPath: settingsData.direct
        }
      }
    } else if (Boolean(settingsData.internal) && !isNil(settingsData.internalType)) {
      return {
        linkTarget: {
          id: settingsData.internal,
          type: settingsData.internalType,
          fullPath: settingsData.rawHref ?? '',
          textInput: false
        }
      }
    }

    return {
      linkTarget: null
    }
  }, [document?.settingsData])

  const handleLinkTargetChange = (value: ManyToOneRelationValueType): void => {
    const settingsDataUpdate: Record<string, any> = {}

    if (value === null) {
      settingsDataUpdate.linkType = 'direct'
      settingsDataUpdate.internal = null
      settingsDataUpdate.internalType = null
      settingsDataUpdate.direct = null
      settingsDataUpdate.href = null
      settingsDataUpdate.rawHref = null
      settingsDataUpdate.path = null
    } else if (value.textInput === true) {
      settingsDataUpdate.linkType = 'direct'
      settingsDataUpdate.direct = value.fullPath
      settingsDataUpdate.rawHref = value.fullPath
      settingsDataUpdate.href = value.fullPath
      settingsDataUpdate.path = value.fullPath
    } else {
      settingsDataUpdate.linkType = 'internal'
      settingsDataUpdate.internal = value.id
      settingsDataUpdate.internalType = value.type
      settingsDataUpdate.rawHref = value.fullPath ?? ''
      settingsDataUpdate.path = value.fullPath ?? ''
    }

    updateSettingsData(settingsDataUpdate)
  }

  return (
    <ContentLayout renderSidebar={
      <Sidebar
        buttons={ sidebarButtons }
        entries={ sidebarEntries }
        sizing="medium"
        translateTooltips
      />
    }
    >
      <Content padded>
        <Form
          form={ form }
          initialValues={ initialValues }
          layout="vertical"
        >
          <Form.Item
            label={ t('document.link.target') }
            name="linkTarget"
          >
            <ManyToOneRelation
              allowPathTextInput
              allowToClearRelation
              assetsAllowed
              dataObjectsAllowed
              documentsAllowed
              onChange={ handleLinkTargetChange }
              showOpenForTextInput
            />
          </Form.Item>
        </Form>
      </Content>
    </ContentLayout>
  )
}
