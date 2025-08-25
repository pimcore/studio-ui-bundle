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
import { Form } from '@Pimcore/components/form/form'
import { BlockContent } from './block-content'

export interface BlockProps {
  children?: React.ReactNode
  collapsed?: boolean
  collapsible?: boolean
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  title?: React.ReactNode
  border?: boolean
  noteditable?: boolean
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
