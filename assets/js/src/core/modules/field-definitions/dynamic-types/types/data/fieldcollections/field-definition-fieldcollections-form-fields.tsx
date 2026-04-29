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
import { useFieldCollectionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-field-collection-options'
import { Form, InputNumber, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionFieldcollectionsFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const { options: fieldCollectionOptions, isLoading } = useFieldCollectionOptions()

  return (
    <>
      {!isCustomLayout && (
        <Form.Item
          label={ t('allowed-types') }
          name="allowedTypes"
        >
          <Select
            loadingSkeleton={ isLoading }
            mode="multiple"
            options={ fieldCollectionOptions }
            showSearch
          />
        </Form.Item>
      )}

      <Form.Item name="lazyLoading">
        <Switch
          labelRight={ t('lazy-loading') }
          tooltip={ t('enable-async-load-in-admin-tooltip') }
        />
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

      <Form.Item name="disallowAddRemove">
        <Switch labelRight={ t('disallow-add-remove') } />
      </Form.Item>

      <Form.Item name="disallowReorder">
        <Switch labelRight={ t('disallow-reorder') } />
      </Form.Item>
    </>
  )
}
