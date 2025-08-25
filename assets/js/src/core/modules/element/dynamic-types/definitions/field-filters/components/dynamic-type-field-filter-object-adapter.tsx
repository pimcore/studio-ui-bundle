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
import { Alert } from 'antd'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { useDynamicTypeResolver } from '../../../resolver/hooks/use-dynamic-type-resolver'

export interface DynamicTypeFieldFilterObjectAdapterProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterObjectAdapterComponent = (): React.JSX.Element => {
  const { config } = useDynamicFilter()
  const { hasType, getComponentRenderer } = useDynamicTypeResolver()

  if (!('fieldDefinition' in config)) {
    throw new Error('Field definition is missing in config')
  }

  const { fieldDefinition } = config
  const currentFieldType: string = fieldDefinition?.fieldType ?? fieldDefinition?.fieldtype ?? 'unknown'

  if (!hasType({ target: 'FIELD_FILTER', dynamicTypeIds: [currentFieldType] })) {
    return (
      <Alert
        message={ `Unknown data type: ${currentFieldType}` }
        type="warning"
      />
    )
  }

  const { ComponentRenderer } = getComponentRenderer({ target: 'FIELD_FILTER', dynamicTypeIds: [currentFieldType] })

  if (ComponentRenderer === null) {
    return <>Dynamic Field Filter not supported</>
  }

  return (
    <>
      {ComponentRenderer(fieldDefinition as AbstractFieldFilterDefinition)}
    </>
  )
}
