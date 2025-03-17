/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import {
  type AbstractBatchEditDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/dynamic-type-batch-edit-abstract'
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
