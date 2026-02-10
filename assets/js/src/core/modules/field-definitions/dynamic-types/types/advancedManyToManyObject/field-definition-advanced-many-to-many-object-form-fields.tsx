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
import { useClassSelectOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-select-options'
import { FieldDefinitionAllowedColumnsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-allowed-columns-grid/field-definition-allowed-columns-grid'

export const FieldDefinitionAdvancedManyToManyObjectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
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
        label={ t('allowed-classes') }
        name="classes"
      >
        <Select
          mode="multiple"
          options={ classOptions }
          showSearch
        />
      </Form.Item>

      <Form.Item name="remoteOwner">
        <Switch labelRight={ t('remote-owner') } />
      </Form.Item>

      <Form.Item
        label={ t('allowed-column-names') }
        name="allowedColumns"
      >
        <FieldDefinitionAllowedColumnsGrid />
      </Form.Item>

      <Form.Item name="enableBatchEdit">
        <Switch labelRight={ t('enable-batch-edit') } />
      </Form.Item>

      <Form.Item name="allowMultipleAssignments">
        <Switch labelRight={ t('allow-multiple-assignments') } />
      </Form.Item>

      <Form.Item name="allowToClearRelation">
        <Switch labelRight={ t('allow-to-clear-relation') } />
      </Form.Item>

    </FormKit.Panel>
  )
}
