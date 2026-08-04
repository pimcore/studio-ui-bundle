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
import { type DynamicTypeFieldFilterAbstract, type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { useDynamicTypeResolver } from '../../../resolver/hooks/use-dynamic-type-resolver'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'

export interface DynamicTypeFieldFilterObjectAdapterProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterObjectAdapterComponent = (): React.JSX.Element => {
  const { config } = useDynamicFilter()
  const { getType, hasType, getComponentRenderer } = useDynamicTypeResolver()

  if (!hasFieldDefinition(config)) {
    throw new Error('Field definition is missing in config')
  }

  const { fieldDefinition } = config
  const currentFieldType: string = fieldDefinition?.fieldType ?? fieldDefinition?.fieldtype ?? 'unknown'

  if (!hasType({ target: 'FIELD_FILTER', dynamicTypeIds: [currentFieldType] })) {
    return (
      <Alert
        message={ `Filter for ${fieldDefinition.fieldtype} is not supported` }
        type="error"
      />
    )
  }

  const { ComponentRenderer } = getComponentRenderer({ target: 'FIELD_FILTER', dynamicTypeIds: [currentFieldType] })
  const type = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [currentFieldType] })

  if (ComponentRenderer === null || (type !== null && 'dynamicTypeFieldFilterType' in type && (type.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract).id === 'none')) {
    return (
      <Alert
        message={ `Filter for ${fieldDefinition.fieldtype} is not supported` }
        type="error"
      />
    )
  }

  return (
    <>
      {ComponentRenderer(fieldDefinition as AbstractFieldFilterDefinition)}
    </>
  )
}
