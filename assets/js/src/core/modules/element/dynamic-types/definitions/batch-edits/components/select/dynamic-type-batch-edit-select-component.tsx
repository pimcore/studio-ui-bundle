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
import { Select } from '@Pimcore/components/select/select'
import { type AbstractBatchEditDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { Form } from '@Pimcore/components/form/form'
import { isArray } from 'lodash'
export interface DynamicTypeBatchEditSelectProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditSelectComponent = ({ batchEdit }: DynamicTypeBatchEditSelectProps): React.JSX.Element => {
  const { key, config } = batchEdit
  const currentConfig: any = config;
  const hasDefinitionOptions = 'definition' in currentConfig && isArray(currentConfig?.definition?.options)

  let options = currentConfig?.options?.map((option: string) => ({
    value: option,
    label: option
  }))

  if (hasDefinitionOptions) {
    options = currentConfig.definition.options.map((option: { key: string; value: string }) => ({
      value: option.value,
      label: option.key
    }))
  }

  return (
    <Form.Item name={ key }>
      <Select options={ options } />
    </Form.Item>
  )
}
