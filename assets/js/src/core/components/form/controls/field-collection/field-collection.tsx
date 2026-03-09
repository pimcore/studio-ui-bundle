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
import { type FieldCollectionRegistry } from './field-collection-registry'
import { Form } from '../../form'
import { FieldCollectionContent } from './field-collection-content'
import { FieldCollectionProvider } from './field-collection-provider'

export interface FieldCollectionProps {
  value?: any[]
  onChange?: (value: any[]) => void
  registry: FieldCollectionRegistry
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  title?: string
  collapsed?: boolean
  addLabel?: string
}

export const FieldCollection = (props: FieldCollectionProps): React.JSX.Element => {
  const { value, onChange } = props

  const defaultValues = {
    collapsed: false
  }

  const finalProps = { ...defaultValues, ...props }

  return (
    <FieldCollectionProvider { ...finalProps }>
      <Form.NumberedList
        onChange={ onChange }
        value={ value }
      >
        <FieldCollectionContent />
      </Form.NumberedList>
    </FieldCollectionProvider>
  )
}
