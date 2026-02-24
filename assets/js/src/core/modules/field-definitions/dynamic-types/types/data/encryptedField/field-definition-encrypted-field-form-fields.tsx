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
import React from 'react'
import { useTranslation } from 'react-i18next'
import { container, serviceIds } from '@sdk/app'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { kebabCase } from 'lodash'

export const FieldDefinitionEncryptedFieldFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const options = fieldDefinitionRegistry
    .getTypesByTags(['encryptedFieldSupport'], props.context)
    .map(type => ({
      label: t('field-definition.' + kebabCase(type.id)),
      value: type.id
    }))

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

      {/* Render the selected field type's specific settings (without panel) */}
      <Form.Item
        noStyle
        shouldUpdate
      >
        {({ getFieldValue }) => {
          const selectedType = getFieldValue('delegateDatatype') as string | undefined
          if (selectedType === undefined || selectedType === '') return null

          if (!fieldDefinitionRegistry.hasDynamicType(selectedType)) return null
          const dynType = fieldDefinitionRegistry.getDynamicType(selectedType)

          // Show only the specific form fields of the selected type (no panel)
          return dynType.getSpecificFormFields(props.context)
        }}
      </Form.Item>
    </>
  )
}
