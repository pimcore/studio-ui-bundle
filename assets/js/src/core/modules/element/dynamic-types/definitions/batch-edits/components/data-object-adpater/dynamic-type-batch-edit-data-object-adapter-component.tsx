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
import {
  type AbstractBatchEditDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '../../../objects/data-related/dynamic-type-object-data-registry'
import { type AbstractDateObjectDataDefinition } from '../../../objects/data-related/types/abstract/dynamic-type-object-data-abstract-date'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { BatchEditFormItem } from '../../helpers/data-object/batch-edit-form-item'

export const DynamicTypeBatchEditDataObjectAdapterComponent = ({ batchEdit }: AbstractBatchEditDefinition): React.JSX.Element => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const { value, ...column } = batchEdit
  const fieldWidth = useFieldWidth()
  const { frontendType, config, key } = column

  const hasType = objectDataRegistry.hasDynamicType(frontendType!)

  if (!hasType) {
    return <>Type {frontendType} not supported</>
  }

  if (!('fieldDefinition' in config)) {
    throw new Error('Field definition is missing in config')
  }

  const dynType = objectDataRegistry.getDynamicType(frontendType!)
  const component = dynType.getObjectDataComponent({
    ...config.fieldDefinition as AbstractDateObjectDataDefinition,
    defaultFieldWidth: fieldWidth
  })

  let formItemKey = [key]

  if (column.localizable) {
    formItemKey = ['localizedfields', key, column.locale!]
  }

  return (
    <BatchEditFormItem
      component={ component }
      name={ formItemKey }
      supportsBatchAppendModes={ dynType.supportsBatchAppendModes }
    />
  )
}
