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

export const DynamicTypePipelineGridTransformersChangeCaseComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const transformerConfig = config?.transformers?.caseChange

  if (transformerConfig === undefined) {
    throw new Error('Transformer configuration for case change is missing')
  }

  const modeOptions = transformerConfig.configOptions.mode.options

  return (
    <Form.Item
      initialValue={ modeOptions[0].value }
      label={ 'Mode' }
      name={ 'mode' }
    >
      <Select
        options={ modeOptions }
      />
    </Form.Item>
  )
}
