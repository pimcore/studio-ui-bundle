/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { usePipelineConfig } from '@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config'
import { Select } from '@Pimcore/components/select/select'
import { TextArea } from '@Pimcore/components/textarea/textarea'

export const DynamicTypePipelineGridTransformersPhpCodeComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const transformerConfig = config?.transformers?.phpCode

  const { t } = useTranslation()

  if (transformerConfig === undefined) {
    throw new Error('Transformer configuration for php code is missing')
  }

  const phpCodeKeyOptions = transformerConfig.configOptions.phpCodeKey.options

  return (
    <>
      <Form.Item
        initialValue={ phpCodeKeyOptions[0]?.value }
        label={ t('grid.advanced-column.advancedColumns.phpCodeKey') }
        name={ 'phpCodeKey' }
      >
        <Select options={ phpCodeKeyOptions } />
      </Form.Item>
      <Form.Item
        label={ t('grid.advanced-column.advancedColumns.arguments') }
        name={ 'arguments' }
      >
        <TextArea />
      </Form.Item>
    </>
  )
}
