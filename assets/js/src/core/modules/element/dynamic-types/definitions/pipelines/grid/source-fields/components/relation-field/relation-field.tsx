/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import { usePipelineConfig } from '@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config'
import { type SelectProps } from '@Pimcore/components/select/select'
import { usePrevious } from '@Pimcore/utils/hooks/use-previous'
import { Select } from 'antd'
import React, { useEffect } from 'react'

export const DynamicTypePipelineGridSourceFieldsRelationFieldComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const sourceFieldConfig = config?.relationField
  const { name } = useItem()
  const { operations } = useKeyedList()
  const currentRelation = Form.useWatch([...name, 'relation']);
  const prevRelation = usePrevious(currentRelation);

  useEffect(() => {
    if (prevRelation !== currentRelation && prevRelation !== undefined) {
      operations.update([...name, 'field'], null, false)
    }
  }, [currentRelation, name, operations, prevRelation])

  if (sourceFieldConfig === undefined) {
    throw new Error('Source field configuration is missing')
  }

  const sourceFieldOptions = sourceFieldConfig.map(configOption => ({
    label: configOption.name,
    value: configOption.key
  }))

  const relationFieldOptions: SelectProps['options'] = []
  sourceFieldConfig.forEach(configOption => {
    const options: SelectProps['options'] = []

    if (configOption.key === currentRelation) {
      configOption.fields.forEach(field => {
        options.push({
          label: field.name,
          value: field.key
        })
      })
    }

    if (options.length > 0) {
      relationFieldOptions.push(...options)
    }
  })

  return (
    <Flex
      className="w-full"
      gap="small"
    >
      <Form.Item
        className="w-full"
        label={ 'Relation' }
        name={ 'relation' }
      >
        <Select options={ sourceFieldOptions } />
      </Form.Item>

      <Form.Item
        className="w-full"
        label={ 'Field' }
        name={ 'field' }
      >
        <Select
          disabled={ relationFieldOptions.length === 0 }
          options={ relationFieldOptions }
        />
      </Form.Item>
    </Flex>
  )
}
