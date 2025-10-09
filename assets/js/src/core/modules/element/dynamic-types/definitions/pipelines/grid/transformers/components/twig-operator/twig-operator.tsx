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
import { getLanguageExtensions } from '@Pimcore/components/text-editor/detect-language'
import { CodeEditor } from '@Pimcore/components/code-editor'

export const DynamicTypePipelineGridTransformersTwigOperatorComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const transformerConfig = config?.transformers?.twigOperator

  const { t } = useTranslation()

  if (transformerConfig === undefined) {
    throw new Error('Transformer configuration for twigOperator is missing')
  }

  return (
    <Form.Item
      initialValue={ '{{ value }}' }
      label={ t('grid.advanced-column.twigTemplate') }
      name={ 'template' }
    >
      <CodeEditor
        basicSetup={ {
          lineNumbers: true,
          syntaxHighlighting: true,
          searchKeymap: true
        } }
        extensions={ getLanguageExtensions('html') }
        minHeight='200px'
      />
    </Form.Item>
  )
}
