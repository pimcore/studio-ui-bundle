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
import { Form, FormKit, Input, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import {
  useClassRelationFieldsOptions,
  useClassVisibleFieldsOptions
} from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-relation-fields-options'
import { relationSelectFormItemTransformation } from '@Pimcore/modules/field-definitions/dynamic-types/utils/relations-helper'

export const FieldDefinitionReverseObjectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const classOptions = useClassDefinitionOptions()
  const ownerClassName = Form.useWatch<string | undefined>('ownerClassName')
  const ownerFieldName = Form.useWatch<string | undefined>('ownerFieldName')

  const ownerFieldNameOptions = useClassRelationFieldsOptions(ownerClassName)
  const visibleFieldsOptions = useClassVisibleFieldsOptions(ownerClassName, ownerFieldName)

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <>
        <Form.Item name="allowToCreateNewObject">
          <Switch labelRight={ t('allow-to-create-new-object') } />
        </Form.Item>

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
          label={ t('path-formatter-service') }
          name="pathFormatterClass"
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
          <Select
            options={ ownerFieldNameOptions }
            showSearch
          />
        </Form.Item>
        <Form.Item
          { ...relationSelectFormItemTransformation('visibleFields') }
          getValueFromEvent={ (value: string[]) => value.join(',') }
          getValueProps={ (value: string | string[]) => ({
            value: typeof value === 'string' ? value.split(',').filter(Boolean) : value
          }) }
          label={ t('visible-fields') }
          name="visibleFields"
        >
          <Select
            mode="multiple"
            options={ visibleFieldsOptions }
            showSearch
          />
        </Form.Item>

        <Form.Item
          name="optimizedAdminLoading"
          tooltip={ t('enable-async-load-in-admin-tooltip') }
        >
          <Switch labelRight={ t('enable-async-load-in-admin') } />
        </Form.Item>
      </>
    </FormKit.Panel>
  )
}
