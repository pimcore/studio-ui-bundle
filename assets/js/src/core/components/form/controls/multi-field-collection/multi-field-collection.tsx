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
import { Form } from '../../form'
import { MultiFieldCollectionContent } from './multi-field-collection-content'
import { MultiFieldCollectionProvider } from './multi-field-collection-provider'
import type { TransformationDynamicTypeRegistry } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-registry'

export interface MultiFieldCollectionProps {
  value?: any[]
  onChange?: (value: any[]) => void
  registry: TransformationDynamicTypeRegistry
  title?: string
  collapsed?: boolean
  maxItems?: number
  disallowReorder?: boolean
  disallowAddRemove?: boolean
}

export const MultiFieldCollection = (props: MultiFieldCollectionProps): React.JSX.Element => {
  const { value, onChange } = props

  const defaultValues = {
    collapsed: false,
    disallowReorder: false,
    disallowAddRemove: false
  }

  const finalProps = { ...defaultValues, ...props }

  return (
    <MultiFieldCollectionProvider {...finalProps}>
      <Form.NumberedList
        onChange={onChange}
        value={value}
      >
        <MultiFieldCollectionContent />
      </Form.NumberedList>
    </MultiFieldCollectionProvider>
  )
}