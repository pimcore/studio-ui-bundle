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
import { Form, FormKit, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionCheckboxFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <Form.Item
        label={ t('default-value') }
        name="defaultValue"
      >
        <Switch />
      </Form.Item>
    </FormKit.Panel>
  )
}
