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
import { useTranslation } from 'react-i18next'
import { useCommitKeyedListDefault } from '@Pimcore/components/form/controls/keyed-list/hooks/use-commit-keyed-list-default'

export const DynamicTypePipelineGridTransformersChangeCaseComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const transformerConfig = config?.transformers?.caseChange
  const { t } = useTranslation()

  if (transformerConfig === undefined) {
    throw new Error('Transformer configuration for case change is missing')
  }

  const modeOptions = transformerConfig.configOptions.mode.options

  // an untouched pre-selected mode must still be part of the saved config (see the hook's docs)
  useCommitKeyedListDefault('mode', modeOptions[0]?.value)

  return (
    <Form.Item
      label={ t('mode') }
      name={ 'mode' }
    >
      <Select
        options={ modeOptions }
      />
    </Form.Item>
  )
}
