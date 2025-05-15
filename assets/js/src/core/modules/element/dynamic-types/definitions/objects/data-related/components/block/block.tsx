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
import { BlockContent } from './block-content'

export interface BlockProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition
  collapsed?: boolean
  collapsible?: boolean
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  inherited?: boolean
  onChange?: (value: any) => void
  value?: any
}

export const Block = (props: BlockProps): React.JSX.Element => {
  return (
    <Form.NumberedList
      onChange={ props.onChange }
      value={ props.value }
    >
      <BlockContent { ...props } />
    </Form.NumberedList>
  )
}
