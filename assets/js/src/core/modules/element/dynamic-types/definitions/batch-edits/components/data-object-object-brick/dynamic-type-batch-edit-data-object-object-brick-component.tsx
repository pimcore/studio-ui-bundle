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
import {
  type AbstractBatchEditDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '../../../objects/data-related/dynamic-type-object-data-registry'
import { type AbstractDateObjectDataDefinition } from '../../../objects/data-related/types/abstract/dynamic-type-object-data-abstract-date'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { BatchEditFormItem } from '../../helpers/data-object/batch-edit-form-item'

export const DynamicTypeBatchEditDataObjectObjectBrickComponent = ({ batchEdit }: AbstractBatchEditDefinition): React.JSX.Element => {
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

  const splittedKey = key.split('.')
  let formItemKey = [splittedKey[splittedKey.length - 1]]

  if (column.localizable) {
    formItemKey = [...splittedKey.pop()!, 'localizedfields', ...formItemKey, column.locale!]
  } else {
    formItemKey = splittedKey
  }

  return (
    <BatchEditFormItem
      component={ component }
      name={ formItemKey }
      supportsBatchAppendModes={ dynType.supportsBatchAppendModes }
    />
  )
}
