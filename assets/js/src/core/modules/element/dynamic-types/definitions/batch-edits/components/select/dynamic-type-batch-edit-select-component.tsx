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
export interface DynamicTypeBatchEditSelectProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditSelectComponent = ({ batchEdit }: DynamicTypeBatchEditSelectProps): React.JSX.Element => {
  const { key, config } = batchEdit

  const options = (config as any)?.options?.map((option: string) => ({
    value: option,
    label: option
  }))

  return (
    <Form.Item name={ key }>
      <Select options={ options } />
    </Form.Item>
  )
}
