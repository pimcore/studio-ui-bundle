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
import { Form, Switch } from '@sdk/components'
import React from 'react'
import { t } from 'i18next'
import { Select } from 'antd'

export const FieldDefinitionTabpanelFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <>
      <Form.Item name="border">
        <Switch labelRight={ t('border') } />
      </Form.Item>

      <Form.Item
        label={ t('tab-position') }
        name="tabPosition"
      >
        <Select
          options={ [
            { label: t('top'), value: 'top' },
            { label: t('left'), value: 'left' },
            { label: t('right'), value: 'right' },
            { label: t('bottom'), value: 'bottom' }
          ] }
        />
      </Form.Item>
    </>
  )
}
