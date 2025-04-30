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
import {
  type AbstractBatchEditDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Form } from '@Pimcore/components/form/form'
export interface DynamicTypeBatchEditTextAreaProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditTextAreaComponent = ({ batchEdit }: DynamicTypeBatchEditTextAreaProps): React.JSX.Element => {
  const { key } = batchEdit

  return (
    <Form.Item name={ key }>
      <TextArea
        autoSize={ { minRows: 2 } }
      />
    </Form.Item>
  )
}
