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
import { FieldDefinitionStructuredTableColsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-structured-table-cols-grid/field-definition-structured-table-cols-grid'
import { FieldDefinitionStructuredTableRowsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-structured-table-rows-grid/field-definition-structured-table-rows-grid'
import { Form, Input, InputNumber } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionStructuredTableFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
        tooltip={ t('height-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('label-width') }
        name="labelWidth"
      >
        <InputNumber
          min={ 0 }
          precision={ 0 }
        />
      </Form.Item>

      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('label-first-cell') }
            name="labelFirstCell"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={ t('rows') }
            name="rows"
          >
            <FieldDefinitionStructuredTableRowsGrid />
          </Form.Item>

          <Form.Item
            label={ t('cols') }
            name="cols"
          >
            <FieldDefinitionStructuredTableColsGrid />
          </Form.Item>
        </>
      )}
    </>
  )
}
