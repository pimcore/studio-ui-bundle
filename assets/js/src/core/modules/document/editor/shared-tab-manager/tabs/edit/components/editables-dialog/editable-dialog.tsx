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
import { WindowModal, Card } from '@sdk/components'
import { type DialogConfig, type DialogConfigItem, type DialogConfigItems, type SerializedDialogConfigItems } from './types'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { type DynamicTypeEditableDialogLayoutRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/editable-dialog-layout/dynamic-type-editable-dialog-layout-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useDocumentEditor } from '../../hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { isArray, isNil, isPlainObject } from 'lodash'
import { TemplateAwareEditable } from './template-aware-editable'
import { useTranslation } from 'react-i18next'

export interface EditableDialogProps {
  config: DialogConfig
  visible: boolean
  onClose: () => void
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const EditableDialog = ({ config, visible, onClose, editableDefinitions }: EditableDialogProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const editableDialogLayoutRegistry = useInjection<DynamicTypeEditableDialogLayoutRegistry>(serviceIds['DynamicTypes/EditableDialogLayoutRegistry'])
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

  const renderDialogContent = (configItem: DialogConfigItem | DialogConfigItem[]): React.JSX.Element => {
    if (isArray(configItem)) {
      return (
        <>
          {configItem.map((item, index) => (
            <React.Fragment key={ item.name ?? index }>
              {renderDialogContent(item)}
            </React.Fragment>
          ))}
        </>
      )
    }

    if (!isNil(configItem.type) && editableDialogLayoutRegistry.hasDynamicType(configItem.type)) {
      return editableDialogLayoutRegistry.getComponent(configItem.type, {
        configItem,
        onRenderNestedContent: renderDialogContent
      })
    }

    if (!isNil(configItem.name) && !isNil(configItem.type)) {
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
              <TemplateAwareEditable editableDefinition={ editableDefinition } />
            </Card>
          )
        }
      }
    }

    return <></>
  }

  const isDialogConfigItem = (value: unknown): value is DialogConfigItem => {
    return isPlainObject(value) && typeof (value as { type?: unknown }).type === 'string'
  }

  const isSerializedDialogConfigItems = (value: DialogConfigItems): value is SerializedDialogConfigItems => {
    return isPlainObject(value) && !isDialogConfigItem(value)
  }

  // Handles PHP-serialized flat dialog config: {"0": {...}, "items": [...]}.
  const normaliseFlatItems = (items: DialogConfigItems): DialogConfigItem[] => {
    if (isDialogConfigItem(items)) {
      return [items]
    }

    if (!isSerializedDialogConfigItems(items)) {
      return []
    }

    if (isArray(items.items)) {
      return items.items.filter(isDialogConfigItem)
    }

    const serializedItems: Record<string, unknown> = items

    return Object.keys(serializedItems)
      .filter(key => /^\d+$/.test(key))
      .sort((leftKey, rightKey) => Number(leftKey) - Number(rightKey))
      .map(key => serializedItems[key])
      .filter(isDialogConfigItem)
  }

  return (
    <WindowModal
      cancelButtonProps={ { style: { display: 'none' } } }
      destroyOnClose
      getContainer={ () => document.body }
      okText={ t('save') }
      onCancel={ onClose }
      onOk={ onClose }
      open={ visible }
      size="L"
      title={ t('area-settings') }
      zIndex={ 10001 }
    >
      {!isNil(config.items) && renderDialogContent(normaliseFlatItems(config.items))}
    </WindowModal>
  )
}
