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
import { Form } from '@Pimcore/components/form/form'
import { ObjectBrickContent } from './object-brick-content'

export interface ObjectBrickProps extends AbstractObjectDataDefinition {
  border?: boolean
  maxItems?: number
  allowedTypes: string[]
  value: any
  onChange: (value: any) => void
}

export const ObjectBrick = (props: ObjectBrickProps): React.JSX.Element => {
  return (
    <Form.KeyedList
      name={ props.name }
      onChange={ props.onChange }
      value={ props.value }
    >
      <ObjectBrickContent { ...props } />
    </Form.KeyedList>
  )
}
