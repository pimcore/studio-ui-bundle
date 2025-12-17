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
import { Form, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil, isNull } from 'lodash'
import { ManyToOneRelation, type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { getDocumentSidebarManager } from '../../../../../sidebar/sidebar-manager-helper'
import { useDocumentEditorSidebarEntries } from '../../../../../shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Content } from '@sdk/components'

interface HardlinkEditFormData {
  sourceDocument: ManyToOneRelationValueType
  propertiesFromSource: boolean
  childrenFromSource: boolean
}

export const HardlinkEditContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<HardlinkEditFormData>()

  const { id } = useContext(DocumentContext)
  const { document, updateSettingsData } = useDocumentDraft(id)

  // Check if user has save or publish permissions (need at least one to edit)
  const canEdit = checkElementPermission(document?.permissions, 'save') ||
                  checkElementPermission(document?.permissions, 'publish')

  const sidebarManager = getDocumentSidebarManager(document?.type)
  const sidebarButtons = sidebarManager.getButtons()
  const sidebarEntries = useDocumentEditorSidebarEntries()

  const initialValues: HardlinkEditFormData = React.useMemo(() => {
    const settingsData = document?.settingsData ?? {}

    let sourceDocument: ManyToOneRelationValueType = null

    if (!isNil(settingsData.sourceId)) {
      sourceDocument = {
        type: 'document',
        id: settingsData.sourceId,
        fullPath: settingsData.sourcePath ?? '',
        textInput: false
      }
    }

    return {
      sourceDocument,
      propertiesFromSource: Boolean(settingsData.propertiesFromSource),
      childrenFromSource: Boolean(settingsData.childrenFromSource)
    }
  }, [document?.settingsData])

  const handleSourceDocumentChange = (value: ManyToOneRelationValueType): void => {
    if (!canEdit) return

    const settingsDataUpdate: Record<string, any> = {}

    if (isNull(value)) {
      settingsDataUpdate.sourceId = null
      settingsDataUpdate.sourcePath = null
    } else if (value.textInput !== true) {
      settingsDataUpdate.sourceId = value.id
      settingsDataUpdate.sourcePath = value.fullPath ?? ''
    }

    updateSettingsData(settingsDataUpdate)
  }

  const handlePropertiesFromSourceChange = (checked: boolean): void => {
    if (!canEdit) return
    updateSettingsData({ propertiesFromSource: checked })
  }

  const handleChildrenFromSourceChange = (checked: boolean): void => {
    if (!canEdit) return
    updateSettingsData({ childrenFromSource: checked })
  }

  return (
    <ContentLayout renderSidebar={
      sidebarEntries.length > 0
        ? (
          <Sidebar
            buttons={ sidebarButtons }
            entries={ sidebarEntries }
            sizing="medium"
            translateTooltips
          />
          )
        : undefined
    }
    >
      <Content padded>
        <Form
          form={ form }
          initialValues={ initialValues }
          layout="vertical"
        >
          <Form.Item
            label={ t('document.hardlink.source') }
            name="sourceDocument"
          >
            <ManyToOneRelation
              allowToClearRelation
              disabled={ !canEdit }
              documentsAllowed
              onChange={ handleSourceDocumentChange }
              showOpenForTextInput
            />
          </Form.Item>

          <Form.Item
            label={ t('document.hardlink.properties-from-source') }
            name="propertiesFromSource"
            valuePropName="checked"
          >
            <Switch
              disabled={ !canEdit }
              onChange={ handlePropertiesFromSourceChange }
            />
          </Form.Item>

          <Form.Item
            label={ t('document.hardlink.children-from-source') }
            name="childrenFromSource"
            valuePropName="checked"
          >
            <Switch
              disabled={ !canEdit }
              onChange={ handleChildrenFromSourceChange }
            />
          </Form.Item>
        </Form>
      </Content>
    </ContentLayout>
  )
}
