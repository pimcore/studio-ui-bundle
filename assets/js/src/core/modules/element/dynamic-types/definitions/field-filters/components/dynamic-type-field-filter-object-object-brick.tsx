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
import { Alert } from 'antd'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { useInjection } from '@Pimcore/app/depency-injection'
import type { DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export interface DynamicTypeFieldFilterObjectBrickProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterObjectBrickComponent = (): React.JSX.Element => {
  const { config } = useDynamicFilter()

  if (!('fieldDefinition' in config)) {
    throw new Error('Field definition is missing in config')
  }

  const { fieldDefinition } = config
  const currentFieldType: string = fieldDefinition?.fieldType ?? fieldDefinition?.fieldtype ?? 'unknown'
  const objectDataRegistry = useInjection<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])

  if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
    return (
      <Alert
        message={ `Unknown data type: ${currentFieldType}` }
        type="warning"
      />
    )
  }

  const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

  return objectDataType.getFieldFilterComponent(fieldDefinition as AbstractFieldFilterDefinition)
}
