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
import { Form, FormKit, Input, InputNumber, Switch, TextArea } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionTableFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <FormKit.Panel title={ t('specific-settings') }>
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

      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('rows') }
            name="rows"
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item name="rowsFixed">
            <Switch labelRight={ t('rows-fixed') } />
          </Form.Item>

          <Form.Item
            label={ t('cols') }
            name="cols"
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item name="colsFixed">
            <Switch labelRight={ t('cols-fixed') } />
          </Form.Item>

          <Form.Item
            label={ t('data') }
            name="data"
            tooltip={ t('table-data-tooltip') }
          >
            <TextArea rows={ 6 } />
          </Form.Item>
        </>
      )}
    </FormKit.Panel>
  )
}
