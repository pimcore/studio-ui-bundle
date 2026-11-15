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

export const DynamicTypePipelineGridTransformersBlurComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const transformerConfig = config?.transformers?.blur
  const { t } = useTranslation()

  if (transformerConfig === undefined) {
    throw new Error('Transformer configuration for blur is missing')
  }

  const ruleOptions = transformerConfig.configOptions.rule.options

  // an untouched pre-selected rule must still be part of the saved config (see the hook's docs)
  useCommitKeyedListDefault('rule', ruleOptions[0]?.value)

  return (
    <Form.Item
      label={ t('grid.advanced-column.blurringRule') }
      name={ 'rule' }
    >
      <Select options={ ruleOptions } />
    </Form.Item>
  )
}
