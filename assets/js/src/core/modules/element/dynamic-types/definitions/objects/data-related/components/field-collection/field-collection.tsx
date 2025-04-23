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
