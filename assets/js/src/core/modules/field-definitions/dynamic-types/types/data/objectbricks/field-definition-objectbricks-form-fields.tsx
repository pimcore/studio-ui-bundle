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
import { useClassObjectBrickCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { Form, InputNumber, Select, Switch } from '@sdk/components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionObjectbricksFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  const { data: bricksData, isFetching } = useClassObjectBrickCollectionQuery()

  const brickOptions = useMemo(() => {
    if (bricksData?.items === undefined) {
      return []
    }

    return bricksData.items.map((item) => ({
      label: item.title ?? item.key,
      value: item.key
    }))
  }, [bricksData])

  return (
    <>
      {!isCustomLayout && (
        <Form.Item
          label={ t('maximum-items') }
          name="maxItems"
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>
      )}

      <Form.Item name="border">
        <Switch
          labelRight={ t('border') }
        />
      </Form.Item>

      {isCustomLayout && (
        <Form.Item
          label={ t('allowed-types') }
          name="allowedTypes"
        >
          <Select
            loadingSkeleton={ isFetching }
            mode="multiple"
            options={ brickOptions }
            showSearch
          />
        </Form.Item>
      )}
    </>
  )
}
