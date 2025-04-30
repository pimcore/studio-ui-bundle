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
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../layout-related/dynamic-type-object-layout-abstract'
import { Form } from '@Pimcore/components/form/form'
import { FieldCollectionContent } from './field-collection-content'

export interface FieldCollectionProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition
  allowedTypes: string[]
  border?: boolean
  collapsed?: boolean
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
}

export const FieldCollection = ({ border = false, ...props }: FieldCollectionProps): React.JSX.Element => {
  return (
    <Form.NumberedList
      onChange={ props.onChange }
      value={ props.value }
    >
      <FieldCollectionContent { ...props } />
    </Form.NumberedList>
  )
}
