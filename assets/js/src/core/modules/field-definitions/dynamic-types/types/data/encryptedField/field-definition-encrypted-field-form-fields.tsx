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
import { Form, Select } from '@sdk/components'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { container, serviceIds } from '@sdk/app'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { kebabCase } from 'lodash'

// Base keys that are not delegate-specific and must not be overwritten when the delegate type
// changes. Includes both 'fieldtype' (public property) and 'fieldType' (getter-based) since
// the backend inconsistently returns both.
const BASE_FIELD_KEYS = new Set(['fieldtype', 'fieldType', 'datatype', 'name', 'title', 'tooltip'])

export const FieldDefinitionEncryptedFieldFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
  const prevDelegateTypeRef = useRef<string | undefined>(undefined)
  // Use the custom form instance so setFieldsValue supports { triggerChange: true },
  // which fires onValuesChange and persists injected defaults into fieldDefinitions.
  const form = Form.useFormInstance()

  const selectedType = Form.useWatch('delegateDatatype') as string | undefined

  const options = fieldDefinitionRegistry
    .getTypesByTags(['encryptedFieldSupport'], props.context)
    .map(type => ({
      label: t('field-definition.' + kebabCase(type.id)),
      value: type.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  // When the delegate type changes, inject missing delegate-specific defaults.
  //
  // For a loaded field, keys are already hoisted from the delegate sub-object by
  // layout-helpers.tsx and present in initialValues, so getFieldsValue()[key] is
  // defined and we skip those — preserving the saved values.
  //
  // { triggerChange: true } causes onValuesChange to fire so the injected defaults
  // are persisted into fieldDefinitions and will be included when the layout is saved.
  useEffect(() => {
    if (selectedType === undefined || selectedType === '') {
      prevDelegateTypeRef.current = undefined
      return
    }

    if (!fieldDefinitionRegistry.hasDynamicType(selectedType)) return
    if (prevDelegateTypeRef.current === selectedType) return
    prevDelegateTypeRef.current = selectedType

    const dynType = fieldDefinitionRegistry.getDynamicType(selectedType)
    const defaultData = dynType.getDefaultData(props.context)
    const currentValues = form.getFieldsValue() as Record<string, unknown>

    const delegateDefaults: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(defaultData)) {
      if (!BASE_FIELD_KEYS.has(key) && currentValues[key] === undefined) {
        delegateDefaults[key] = value
      }
    }

    if (Object.keys(delegateDefaults).length > 0) {
      form.setFieldsValue(delegateDefaults, { triggerChange: true })
    }
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

      {/* Render the selected field type's specific settings */}
      {selectedType !== undefined && selectedType !== '' && fieldDefinitionRegistry.hasDynamicType(selectedType) && (
        fieldDefinitionRegistry.getDynamicType(selectedType).getSpecificFormFields(props.context)
      )}
    </>
  )
}
