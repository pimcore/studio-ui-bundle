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
import { MULTI_VALUE_OWN_KEYS } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-own-keys'
import { FieldDefinitionMultiValueVariants } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/field-definition-multi-value-variants'
import { MultiValueEngineContext } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-engine-context'
import {
  CLASSIFICATION_STORE_KEY_TYPE_TAG,
  CLASSIFICATION_STORE_WRAPPER_TYPES,
  isKeyTypeHeldByEngine
} from '@Pimcore/modules/field-definitions/dynamic-types/utils/classification-store-key-types'
import { Form, Input, InputNumber, Select, Switch } from '@sdk/components'
import React, { useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { container, serviceIds } from '@sdk/app'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { isEmpty, kebabCase, mapValues, omitBy, pickBy } from 'lodash'

export const FieldDefinitionMultiValueFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
  const engineCapabilities = useContext(MultiValueEngineContext)
  const prevDelegateTypeRef = useRef<string | undefined>(undefined)
  const form = Form.useFormInstance()

  const selectedType = Form.useWatch('delegateDatatype') as string | null | undefined
  const isRepeating = Form.useWatch('multiValue') as boolean | undefined
  const unqualifiedValue = Form.useWatch('unqualifiedValue') as boolean | null | undefined

  // Every type a key may be defined with, except the wrappers, which cannot nest.
  const options = fieldDefinitionRegistry
    .getTypesByTags([CLASSIFICATION_STORE_KEY_TYPE_TAG], props.context)
    .filter((type) => !CLASSIFICATION_STORE_WRAPPER_TYPES.includes(type.id))
    .map((type) => ({ id: type.id, label: t('field-definition.' + kebabCase(type.id)) }))
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(({ id, label }) => isKeyTypeHeldByEngine(id, engineCapabilities)
      ? { label, value: id }
      : { label: `${label} – ${t('classification-store.key-type-needs-document-engine')}`, disabled: true, value: id }
    )

  const isDelegateKey = (key: string): boolean => !MULTI_VALUE_OWN_KEYS.has(key)

  const delegateDefaults = (type: string): Record<string, unknown> => omitBy(
    fieldDefinitionRegistry.getDynamicType(type).getDefaultData(props.context),
    (_value, key) => !isDelegateKey(key)
  )

  useEffect(() => {
    if (selectedType === undefined || selectedType === null || selectedType === '') {
      prevDelegateTypeRef.current = undefined
      return
    }

    if (!fieldDefinitionRegistry.hasDynamicType(selectedType)) return
    if (prevDelegateTypeRef.current === selectedType) return

    const currentValues = form.getFieldsValue(true) as Record<string, unknown>
    const prevDelegateType = prevDelegateTypeRef.current
    const cleared = prevDelegateType === undefined
      ? {}
      : mapValues(pickBy(currentValues, (_value, key) => isDelegateKey(key)), () => undefined)
    const defaults = delegateDefaults(selectedType)
    const missing = prevDelegateType === undefined ? pickBy(defaults, (_value, key) => currentValues[key] === undefined) : defaults
    const values = { ...cleared, ...missing }

    if (!isEmpty(values)) {
      form.setFieldsValue(values, { triggerChange: true })
    }

    prevDelegateTypeRef.current = selectedType
  }, [selectedType])

  return (
    <>
      <Form.Item
        label={ t('classification-store.multi-value.delegate') }
        name='delegateDatatype'
        required
      >
        <Select
          allowClear={ false }
          options={ options }
        />
      </Form.Item>

      {selectedType !== undefined && selectedType !== null && selectedType !== '' && fieldDefinitionRegistry.hasDynamicType(selectedType) && (
        fieldDefinitionRegistry.getDynamicType(selectedType).getSpecificFormFields({ ...props.context, isEncryptedField: true })
      )}

      <Form.Item
        label={ t('classification-store.multi-value.variants') }
        name='variants'
      >
        <FieldDefinitionMultiValueVariants />
      </Form.Item>

      <Form.Item
        name='unqualifiedValue'
        valuePropName='checked'
      >
        <Switch
          labelRight={ t('classification-store.multi-value.default-variant-permitted') }
          onChange={ (checked: boolean) => { if (!checked) form.setFieldValue('unqualifiedValueLabel', null) } }
        />
      </Form.Item>

      {unqualifiedValue !== false && (
        <Form.Item
          label={ t('classification-store.multi-value.default-variant-label') }
          name='unqualifiedValueLabel'
          normalize={ (value: string) => value === '' ? null : value }
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        name='multiValue'
        valuePropName='checked'
      >
        <Switch
          labelRight={ t('classification-store.multi-value.repeating') }
          onChange={ (checked: boolean) => { if (!checked) form.setFieldValue('maximum', null) } }
        />
      </Form.Item>

      {isRepeating === true && (
        <Form.Item
          label={ t('classification-store.multi-value.maximum') }
          name='maximum'
          tooltip={ t('classification-store.multi-value.maximum-tooltip') }
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>
      )}
    </>
  )
}
