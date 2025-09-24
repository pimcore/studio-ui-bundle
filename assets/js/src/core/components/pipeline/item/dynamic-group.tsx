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
import React from 'react'
import { DynamicGroupContent } from './dynamic-group/dynamic-group-content'

export interface DynamicGroupProps {
  id: string
  dynamicTypeRegistryId: string
  showTitle?: boolean
}

const PipelineDynamicGroup = ({ id, dynamicTypeRegistryId, showTitle = false }: DynamicGroupProps): React.JSX.Element => {
  return (
    <Form.Item
      initialValue={ [] }
      name={ id }
    >
      <Form.NumberedList>
        <DynamicGroupContent
          dynamicTypeRegistryId={ dynamicTypeRegistryId }
          id={ id }
          showTitle={ showTitle }
        />
      </Form.NumberedList>
    </Form.Item>
  )
}

const memoedPipelineDynamicGroup = React.memo(PipelineDynamicGroup)
export { memoedPipelineDynamicGroup as PipelineDynamicGroup }
