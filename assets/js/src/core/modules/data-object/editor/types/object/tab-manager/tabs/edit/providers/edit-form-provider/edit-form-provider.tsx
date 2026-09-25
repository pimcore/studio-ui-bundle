/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import _, { debounce, isEmpty, isUndefined } from 'lodash'
import { SaveTaskType, useSave } from '@Pimcore/modules/data-object/actions/save/use-save'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { Form, type formInstanceType } from '@sdk/components'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { mergeFormChanges } from './utils/merge-form-changes'
import { clearFormField } from './utils/clear-form-field'
import { type NamePath } from 'antd/es/form/interface'

interface EditFormContextProps {
  form: formInstanceType
  setFieldTypeMap: (fieldTypeMap: Map<string, string>) => void
  updateModifiedDataObjectAttributes: (changedValues: Record<string, any>) => void
  clearDataObjectAttribute: (name: NamePath, emptyValue?: unknown) => void
  /**
   * Clears the modified-attributes map after a save of it went through.
   * @param savedSnapshot The exact object that was saved (as `getModifiedDataObjectAttributes()`
   *   returned it at save time). When given, the clear is skipped if the map has since moved on to
   *   a different object - edits merged in after the snapshot was taken, e.g. while the save sat
   *   queued behind another one - so those edits are not silently discarded and reach the next auto
   *   save instead. Omit it only to force an unconditional clear.
   */
  resetModifiedDataObjectAttributes: (savedSnapshot?: Record<string, any>) => void
  updateDraft: () => Promise<void>
  getModifiedDataObjectAttributes: () => Record<string, any>
  getChangedFieldName: (changedValues: Record<string, unknown>, parentKey?: string) => string | null
  disabled: boolean
}

const EditFormContext = createContext<EditFormContextProps | undefined>(undefined)

export const useEditFormContext = (): EditFormContextProps => {
  const context = useContext(EditFormContext)
  if (context === undefined) {
    throw new Error('useEditFormContext must be used within a FormProvider')
  }
  return context
}

/**
 * For components that are also rendered outside the object editor, e.g. field labels
 * in grid cells or in the version comparison.
 */
export const useEditFormContextOptional = (): EditFormContextProps | undefined => {
  return useContext(EditFormContext)
}

export const EditFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = Form.useForm()
  const modifiedDataObjectAttributesRef = useRef<Record<string, any>>({})
  const modifiedRef = useRef<boolean>(false)
  const fieldTypeMapRef = useRef<Map<string, string>>(new Map())
  const { id } = useElementContext()
  const { dataObject, markObjectDataAsModified } = useDataObjectDraft(id)
  const { save, isError } = useSave()

  const messageApi = useMessage()
  const { t } = useTranslation()

  useEffect(() => {
    if (isError) {
      messageApi.error(t('auto-save-failed'))
    }
  }, [isError])

  const setFieldTypeMap = (fieldTypeMap: Map<string, string>): void => {
    fieldTypeMapRef.current = fieldTypeMap
  }

  const updateModifiedDataObjectAttributes = (changedValues: Record<string, any>): void => {
    const objectDataRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
    modifiedDataObjectAttributesRef.current = mergeFormChanges(modifiedDataObjectAttributesRef.current, changedValues, objectDataRegistry, fieldTypeMapRef.current)
  }

  const clearDataObjectAttribute = (name: NamePath, emptyValue: unknown = null): void => {
    modifiedDataObjectAttributesRef.current = clearFormField(modifiedDataObjectAttributesRef.current, name, emptyValue)
  }

  const resetModifiedDataObjectAttributes = (savedSnapshot?: Record<string, any>): void => {
    // updateModifiedDataObjectAttributes/clearDataObjectAttribute always replace the ref with a new
    // object rather than mutating it, so an unchanged reference means nothing was merged in since
    // the snapshot was read - a changed one means an edit arrived while the save was in flight or
    // queued, and clearing here would silently drop it before any later auto save can collect it.
    if (isUndefined(savedSnapshot) || modifiedDataObjectAttributesRef.current === savedSnapshot) {
      modifiedDataObjectAttributesRef.current = {}
    }
  }

  const getModifiedDataObjectAttributes = (): Record<string, any> => {
    return modifiedDataObjectAttributesRef.current
  }

  const disabled = !checkElementPermission(dataObject?.permissions, 'publish') && !checkElementPermission(dataObject?.permissions, 'save')

  const getChangedFieldName = (
    changedValues: Record<string, unknown>,
    parentKey: string = ''
  ): string | null => {
    const keys = Object.keys(changedValues)
    if (keys.length === 0) {
      return null
    }
    const key = keys[0]

    const fullKey = parentKey !== '' ? `${parentKey}.${key}` : key
    const value = changedValues[key]

    if (!form.isFieldTouched(fullKey.split('.'))) {
      return parentKey
    }

    if (_.isPlainObject(value)) {
      return getChangedFieldName(value as Record<string, unknown>, fullKey)
    }

    return fullKey
  }

  const executeUpdateDraft = debounce(async () => {
    const modifiedAttributes = getModifiedDataObjectAttributes()

    if (!isEmpty(modifiedAttributes)) {
      if (!modifiedRef.current) {
        markObjectDataAsModified()
      }

      await save(modifiedAttributes, SaveTaskType.AutoSave)
    }
  }, 800)

  const updateDraft = async (): Promise<void> => {
    await executeUpdateDraft()
  }

  const value = useMemo(() => ({
    form,
    setFieldTypeMap,
    updateModifiedDataObjectAttributes,
    clearDataObjectAttribute,
    resetModifiedDataObjectAttributes,
    updateDraft,
    getModifiedDataObjectAttributes,
    getChangedFieldName,
    disabled
  }), [form, disabled])

  return (
    <EditFormContext.Provider value={ value }>
      {children}
    </EditFormContext.Provider>
  )
}
