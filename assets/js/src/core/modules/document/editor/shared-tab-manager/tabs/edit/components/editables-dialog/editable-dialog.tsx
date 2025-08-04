/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { WindowModal, Tabs, Space, Card } from '@sdk/components'
import { type DialogConfig, type DialogConfigItem } from './types'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useDocumentEditor } from '../../hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { isNil, isArray } from 'lodash'
import { RenderEditable } from '../editables-renderer/render-editable'
import { useTranslation } from 'react-i18next'
import { TemplateAwareEditable } from './template-aware-editable'

export interface EditableDialogProps {
  config: DialogConfig
  visible: boolean
  onClose: () => void
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const EditableDialog = ({ config, visible, onClose, editableDefinitions }: EditableDialogProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const { getValue } = useDocumentEditor()
  const { t } = useTranslation()

  const findMatchingEditableDefinition = (dialogConfigItem: DialogConfigItem): AbstractDocumentEditableDefinition | null => {
    const matchingEditable = editableDefinitions.find(editable =>
      editable.realName === dialogConfigItem.name &&
      editable.inDialogBox === config.id
    )

    if (!isNil(matchingEditable)) {
      return matchingEditable
    }

    return null
  }

  const getEditableDefinitionAndValue = (dialogConfigItem: DialogConfigItem): { definition: AbstractDocumentEditableDefinition | null, value: any } => {
    const matchingEditable = findMatchingEditableDefinition(dialogConfigItem)

    if (!isNil(matchingEditable)) {
      const currentValue = getValue(matchingEditable.name)
      return {
        definition: matchingEditable,
        value: currentValue?.data ?? null
      }
    } else {
      return {
        definition: null,
        value: null
      }
    }
  }

  const renderDialogContent = (configItem: DialogConfigItem): React.JSX.Element => {
    if (configItem.type === 'tabpanel' && isArray(configItem.items)) {
      const tabItems = configItem.items.map((item, index) => ({
        key: `tab-${index}`,
        label: item.title ?? `Tab ${index + 1}`,
        children: renderDialogContent(item)
      }))

      return (
        <Tabs
          items={ tabItems }
          type="card"
        />
      )
    }

    if (configItem.type === 'panel' && isArray(configItem.items)) {
      return (
        <Space
          direction="vertical"
          size="medium"
          style={ { width: '100%' } }
        >
          {configItem.items.map((item, index) => (
            <div key={ `panel-item-${index}` }>
              {renderDialogContent(item)}
            </div>
          ))}
        </Space>
      )
    }

    if (!isNil(configItem.name) && !isNil(configItem.type) && configItem.type !== 'tabpanel' && configItem.type !== 'panel') {
      const editableType = documentEditableRegistry.hasDynamicType(configItem.type)
        ? documentEditableRegistry.getDynamicType(configItem.type)
        : undefined

      if (!isNil(editableType)) {
        const { definition: editableDefinition } = getEditableDefinitionAndValue(configItem)

        if (!isNil(editableDefinition)) {
          return (
            <Card
              key={ configItem.name }
              title={ configItem.label }
            >
              <TemplateAwareEditable editableDefinition={editableDefinition} />
            </Card>
          )
        }
      }
    }

    return <></>
  }

  return (
    <WindowModal
      destroyOnClose
      onCancel={ onClose }
      onOk={ onClose }
      okText={ t('save') }
      cancelButtonProps={ { style: { display: 'none' } } }
      open={ visible }
      size="L"
      style={ { minHeight: config.height ?? 400 } }
      title={ t('area-settings') }
    >
      {!isNil(config.items) && renderDialogContent(config.items)}
    </WindowModal>
  )
}
