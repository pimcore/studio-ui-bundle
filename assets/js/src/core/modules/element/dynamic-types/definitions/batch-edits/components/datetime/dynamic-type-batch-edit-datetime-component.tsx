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
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { type AbstractBatchEditDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { Form } from '@Pimcore/components/form/form'
export interface DynamicTypeBatchEditDatetimeProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditDatetimeComponent = ({ batchEdit }: DynamicTypeBatchEditDatetimeProps): React.JSX.Element => {
  const { key } = batchEdit

  return (
    <Form.Item name={ key }>
      <DatePicker />
    </Form.Item>
  )
}
