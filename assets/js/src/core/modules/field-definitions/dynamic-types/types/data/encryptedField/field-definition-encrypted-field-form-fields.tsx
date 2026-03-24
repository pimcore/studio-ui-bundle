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
import { isEmpty, kebabCase, mapValues, omitBy, pickBy } from 'lodash'

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

  const isDelegateKey = (key: string): boolean => {
    return !BASE_FIELD_KEYS.has(key) && key !== 'delegateDatatype'
  }

  const snapshotDelegateValues = (values: Record<string, unknown>): Record<string, unknown> => {
    return pickBy(values, (_v, key) => isDelegateKey(key))
  }

  const getDelegateDefaults = (type: string): Record<string, unknown> => {
    const dynType = fieldDefinitionRegistry.getDynamicType(type)
    return dynType.getDefaultData(props.context)
  }

  const applyIfNotEmpty = (values: Record<string, unknown>): void => {
    if (!isEmpty(values)) {
      form.setFieldsValue(values, { triggerChange: true })
    }
  }

  const handleInitialType = (type: string, currentValues: Record<string, unknown>): void => {
    delegateHistoryRef.current[type] = snapshotDelegateValues(currentValues)

    const defaults = getDelegateDefaults(type)
    const missing = pickBy(defaults, (value, key) => !BASE_FIELD_KEYS.has(key) && currentValues[key] === undefined)
    applyIfNotEmpty(missing)
  }

  const handleTypeSwitch = (prevType: string, nextType: string, currentValues: Record<string, unknown>): void => {
    delegateHistoryRef.current[prevType] = snapshotDelegateValues(currentValues)

    const cleared = mapValues(pickBy(currentValues, (_v, key) => isDelegateKey(key)), () => undefined)
    const history = delegateHistoryRef.current[nextType]
    const restored = history ?? omitBy(getDelegateDefaults(nextType), (_v, key) => BASE_FIELD_KEYS.has(key))

    applyIfNotEmpty({ ...cleared, ...restored })
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
      handleInitialType(selectedType, currentValues)
    } else {
      handleTypeSwitch(prevDelegateType, selectedType, currentValues)
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
        fieldDefinitionRegistry.getDynamicType(selectedType).getSpecificFormFields({ ...props.context, isEncryptedField: true })
      )}
    </>
  )
}
