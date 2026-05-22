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
import { Form, Input, InputNumber, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionCalculatedValueFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>
      {!isCustomLayout && (
        <Form.Item
          label={ t('type') }
          name="elementType"
        >
          <Select
            options={ [
              { label: t('data-type.input'), value: 'input' },
              { label: t('data-type.textarea'), value: 'textarea' },
              { label: t('data-type.html'), value: 'html' },
              { label: t('data-type.number'), value: 'numeric' },
              { label: t('data-type.date'), value: 'date' },
              { label: t('data-type.boolean'), value: 'boolean' }
            ] }
          />
        </Form.Item>
      )}

      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
      <>
        <Form.Item
          label={ t('column-length') }
          name="columnLength"
          rules={ [{ min: 0, type: 'number' }] }
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item
          label={ t('calculator-type') }
          name="calculatorType"
          tooltip={ t('calculator-type-tooltip') }
        >
          <Select
            options={ [
              { label: t('class'), value: 'class' },
              { label: t('expression'), value: 'expression' }
            ] }
          />
        </Form.Item>

        <Form.Conditional condition={ (values) => values.calculatorType !== 'expression' }>
          <Form.Item
            label={ t('calculator-class') }
            name="calculatorClass"
          >
            <Input />
          </Form.Item>
        </Form.Conditional>

        <Form.Conditional condition={ (values) => values.calculatorType === 'expression' }>
          <Form.Item
            label={ t('calculator-expression') }
            name="calculatorExpression"
          >
            <Input />
          </Form.Item>
        </Form.Conditional>
      </>
      )}
    </>
  )
}
