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
import { Input } from 'antd'
import {
  type AbstractBatchEditDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { Form } from '@Pimcore/components/form/form'
export interface DynamicTypeBatchEditTextProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditTextComponent = ({ batchEdit }: DynamicTypeBatchEditTextProps): React.JSX.Element => {
  const { key } = batchEdit

  return (
    <Form.Item name={ key }>
      <Input
        type='text'
      />
    </Form.Item>
  )
}
