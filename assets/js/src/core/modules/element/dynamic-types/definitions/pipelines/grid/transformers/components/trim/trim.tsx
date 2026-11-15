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
import { useCommitKeyedListDefault } from '@Pimcore/components/form/controls/keyed-list/hooks/use-commit-keyed-list-default'

export const DynamicTypePipelineGridTransformersTrimComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const transformerConfig = config?.transformers?.trim
  const { t } = useTranslation()

  if (transformerConfig === undefined) {
    throw new Error('Transformer configuration for trim is missing')
  }

  const modeOptions = transformerConfig.configOptions.mode.options

  // an untouched pre-selected mode must still be part of the saved config (see the hook's docs)
  useCommitKeyedListDefault('mode', modeOptions[0]?.value)

  return (
    <Form.Item
      label={ t('grid.advanced-column.trim') }
      name={ 'mode' }
    >
      <Select
        options={ modeOptions }
      />
    </Form.Item>
  )
}
