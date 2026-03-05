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
import { useClassificationStoreOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-classification-store-options'
import { Form, InputNumber, Select, Switch, TextArea } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionClassificationstoreFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const { options: storeOptions, isLoading } = useClassificationStoreOptions()

  return (
    <>
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
          <Form.Item name="localized">
            <Switch labelRight={ t('localized') } />
          </Form.Item>

          <Form.Item
            label={ t('allowed-group-ids') }
            name="allowedGroupIds"
          >
            <TextArea rows={ 4 } />
          </Form.Item>

          <Form.Item
            label={ t('maximum-items') }
            name="maxItems"
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item
            label={ t('store') }
            name="storeId"
          >
            <Select
              loadingSkeleton={ isLoading }
              options={ storeOptions }
              showSearch
            />
          </Form.Item>

          <Form.Item name="hideEmptyData">
            <Switch labelRight={ t('hide-empty-data') } />
          </Form.Item>

          <Form.Item name="disallowAddRemove">
            <Switch labelRight={ t('disallow-add-remove') } />
          </Form.Item>
        </>
      )}
    </>
  )
}
