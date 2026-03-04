/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { BASE_FIELD_KEYS } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/encryptedField/dynamic-type-field-definition-encrypted-field'
import { Form, Select } from '@sdk/components'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { container, serviceIds } from '@sdk/app'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { kebabCase } from 'lodash'

export const FieldDefinitionEncryptedFieldFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
  const prevDelegateTypeRef = useRef<string | undefined>(undefined)
  const delegateHistoryRef = useRef<Record<string, Record<string, unknown>>>({})
  const form = Form.useFormInstance()

  const selectedType = Form.useWatch('delegateDatatype') as string | undefined

  const options = fieldDefinitionRegistry
    .getTypesByTags(['encryptedFieldSupport'], props.context)
    .map(type => ({
      label: t('field-definition.' + kebabCase(type.id)),
      value: type.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const snapshotDelegateValues = (values: Record<string, unknown>): Record<string, unknown> => {
    const snapshot: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(values)) {
      if (!BASE_FIELD_KEYS.has(key) && key !== 'delegateDatatype') {
        snapshot[key] = value
      }
    }
    return snapshot
  }

  useEffect(() => {
    if (selectedType === undefined || selectedType === '') {
      prevDelegateTypeRef.current = undefined
      return
    }

    if (!fieldDefinitionRegistry.hasDynamicType(selectedType)) return
    if (prevDelegateTypeRef.current === selectedType) return

    const prevDelegateType = prevDelegateTypeRef.current
    const currentValues = form.getFieldsValue(true) as Record<string, unknown>

    if (prevDelegateType === undefined) {
      delegateHistoryRef.current[selectedType] = snapshotDelegateValues(currentValues)

      const dynType = fieldDefinitionRegistry.getDynamicType(selectedType)
      const defaultData = dynType.getDefaultData(props.context)
      const delegateDefaults: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(defaultData)) {
        if (!BASE_FIELD_KEYS.has(key) && currentValues[key] === undefined) {
          delegateDefaults[key] = value
        }
      }
      if (Object.keys(delegateDefaults).length > 0) {
        form.setFieldsValue(delegateDefaults, { triggerChange: true })
      }
    } else {
      delegateHistoryRef.current[prevDelegateType] = snapshotDelegateValues(currentValues)

      const nextValues: Record<string, unknown> = {}
      for (const key of Object.keys(currentValues)) {
        if (!BASE_FIELD_KEYS.has(key) && key !== 'delegateDatatype') {
          nextValues[key] = undefined
        }
      }

      const history = delegateHistoryRef.current[selectedType]
      if (history !== undefined) {
        Object.assign(nextValues, history)
      } else {
        const dynType = fieldDefinitionRegistry.getDynamicType(selectedType)
        const defaultData = dynType.getDefaultData(props.context)
        for (const [key, value] of Object.entries(defaultData)) {
          if (!BASE_FIELD_KEYS.has(key)) {
            nextValues[key] = value
          }
        }
      }

      if (Object.keys(nextValues).length > 0) {
        form.setFieldsValue(nextValues, { triggerChange: true })
      }
    }

    prevDelegateTypeRef.current = selectedType
  }, [selectedType])

  return (
    <>
      <Form.Item
        label={ t('field') }
        name="delegateDatatype"
      >
        <Select
          allowClear={ false }
          options={ options }
        />
      </Form.Item>

      {selectedType !== undefined && selectedType !== '' && fieldDefinitionRegistry.hasDynamicType(selectedType) && (
        fieldDefinitionRegistry.getDynamicType(selectedType).getSpecificFormFields(props.context)
      )}
    </>
  )
}
