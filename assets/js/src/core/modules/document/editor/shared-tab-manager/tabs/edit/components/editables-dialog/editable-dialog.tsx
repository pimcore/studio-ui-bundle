/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef } from 'react'
import { WindowModal, Card } from '@sdk/components'
import { type DialogConfig, type DialogConfigItem, type DialogConfigItems, type SerializedDialogConfigItems } from './types'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { type DynamicTypeEditableDialogLayoutRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/editable-dialog-layout/dynamic-type-editable-dialog-layout-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useDocumentEditor } from '../../hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { isArray, isEmpty, isNil, isPlainObject } from 'lodash'
import { TemplateAwareEditable } from './template-aware-editable'
import { useTranslation } from 'react-i18next'
import { useStyles } from './editable-dialog.styles'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { useEditableDialogSnapshot } from './hooks/use-editable-dialog-snapshot'
import { RenderEditableOptionsContext, type RenderEditableOptions } from '../editables-renderer/render-editable-options-context'

export interface EditableDialogProps {
  config: DialogConfig
  visible: boolean
  /** Called when the dialog is confirmed via the save button and values were changed. */
  onClose: () => void
  /** Called when the dialog closes without changes to save: dismissed (cancel button, close icon, Esc) with its changes discarded, or saved unchanged. */
  onCancel: () => void
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const EditableDialog = ({ config, visible, onClose, onCancel, editableDefinitions }: EditableDialogProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const editableDialogLayoutRegistry = useInjection<DynamicTypeEditableDialogLayoutRegistry>(serviceIds['DynamicTypes/EditableDialogLayoutRegistry'])
  const { getValue } = useDocumentEditor()
  const { modal } = useStudioModal()
  const { t } = useTranslation()
  const { styles } = useStyles()

  // Only the editables rendered by this dialog are snapshotted: the window modal has no mask, so the
  // page behind it stays editable and those edits must not be rolled back by a cancelled dialog.
  const { getChangedKeys, restore, commit } = useEditableDialogSnapshot(editableDefinitions.map(editable => editable.name))
  const confirmPending = useRef(false)

  // Changes made in the dialog stay in the editable store until Save: nothing is autosaved or marked
  // modified while the dialog is open, and reload-on-change editables (which would save and reload
  // the document and thereby destroy this dialog) hold their reload back until Save as well.
  const reloadDeferred = useRef(false)
  const renderOptions = useMemo<RenderEditableOptions>(() => ({
    deferReloadOnChange: true,
    deferPersistence: true,
    onReloadDeferred: () => { reloadDeferred.current = true }
  }), [])

  // Without any changes there is nothing to save, so the dialog just closes without a reload.
  const handleSave = (): void => {
    if (getChangedKeys().length === 0) {
      onCancel()
      return
    }

    // A dialog configured with reloadOnClose reloads through its owner anyway.
    commit({ reload: reloadDeferred.current && config.reloadOnClose !== true })
    onClose()
  }

  const handleCancel = (): void => {
    if (getChangedKeys().length === 0) {
      onCancel()
      return
    }

    // Esc and the close icon can fire again while the confirmation is still open.
    if (confirmPending.current) {
      return
    }

    confirmPending.current = true

    void modal.confirm({
      title: t('unsaved-changes.title'),
      content: t('unsaved-changes.close-message'),
      okText: t('discard-changes'),
      cancelText: t('cancel'),
      onOk: () => {
        confirmPending.current = false
        restore()
        onCancel()
      },
      onCancel: () => {
        confirmPending.current = false
      }
    })
  }

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
              {!isEmpty(configItem.description) && (
                <div className={ styles.description }>{configItem.description}</div>
              )}
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
      cancelText={ t('cancel') }
      destroyOnClose
      getContainer={ () => document.body }
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ handleSave }
      open={ visible }
      size="L"
      title={ t('area-settings') }
      zIndex={ 10001 }
    >
      <RenderEditableOptionsContext.Provider value={ renderOptions }>
        {!isNil(config.items) && renderDialogContent(normaliseFlatItems(config.items))}
      </RenderEditableOptionsContext.Provider>
    </WindowModal>
  )
}
