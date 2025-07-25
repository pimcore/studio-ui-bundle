/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { usePipelineConfig } from '@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config'
import { Select } from '@Pimcore/components/select/select'
import React from 'react'

export const DynamicTypePipelineGridSourceFieldsSimpleFieldComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()

  const sourceFieldConfig = config?.simpleField
  if (sourceFieldConfig === undefined) {
    throw new Error('Source field configuration is missing')
  }

  const sourceFieldOptions = sourceFieldConfig.map(configOption => ({
    label: configOption.name,
    value: configOption.key
  }))

  return (
    <Form.Item
      label={ 'Field' }
      name={ 'field' }
    >
      <Select options={ sourceFieldOptions } />
    </Form.Item>
  )
}
