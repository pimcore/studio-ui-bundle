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
import { Form, FormKit, Input, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useClassSelectOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-select-options'

export const FieldDefinitionReverseObjectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const classOptions = useClassSelectOptions()

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <Form.Item
        label={ t('width') }
        name="width"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('owner-class') }
        name="ownerClassName"
      >
        <Select
          options={ classOptions }
          showSearch
        />
      </Form.Item>

      <Form.Item
        label={ t('owner-field-name') }
        name="ownerFieldName"
      >
        <Input />
      </Form.Item>
    </FormKit.Panel>
  )
}
