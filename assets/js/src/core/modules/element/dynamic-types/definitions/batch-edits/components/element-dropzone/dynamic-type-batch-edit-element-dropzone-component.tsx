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
import { type AbstractBatchEditDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { Form } from '@Pimcore/components/form/form'
import { ManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'

export interface DynamicTypeBatchEditElementDropzoneProps extends AbstractBatchEditDefinition {}

export const DynamicTypeBatchEditElementDropzoneComponent = ({ batchEdit }: DynamicTypeBatchEditElementDropzoneProps): React.JSX.Element => {
  const { key } = batchEdit

  return (
    <FieldWidthProvider
      fieldWidthValues={ {
        large: 9999,
        medium: 9999,
        small: 9999
      } }
    >
      <Form.Item name={ key }>
        <ManyToOneRelation assetsAllowed />
      </Form.Item>
    </FieldWidthProvider>
  )
}
