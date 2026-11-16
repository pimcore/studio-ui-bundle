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
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { type DynamicTypeObjectDataRegistry } from '../../objects/data-related/dynamic-type-object-data-registry'
import { type AbstractDateObjectDataDefinition } from '../../objects/data-related/types/abstract/dynamic-type-object-data-abstract-date'
import { BatchEditFormItem } from '../helpers/data-object/batch-edit-form-item'
import { isNil, omit } from 'lodash'
import { keyAddressOf, variantOfColumn } from '@Pimcore/modules/data-object/classification-store/utils/variant-column'
import { type MultiValueObjectDataDefinition } from '../../objects/data-related/types/dynamic-type-object-data-multi-value'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'

export const DynamicTypeBatchEditClassificationStoreComponent = ({ batchEdit }: AbstractBatchEditDefinition): React.JSX.Element => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const { value, ...column } = batchEdit
  const fieldWidth = useFieldWidth()
  const { frontendType, config, key } = column

  const hasType = objectDataRegistry.hasDynamicType(frontendType!)

  if (!hasType) {
    return <>Type {frontendType} not supported</>
  }

  if (!hasFieldDefinition(config)) {
    throw new Error('Field definition is missing in config')
  }

  // A multiValue column addresses one slot, so it is edited with its delegate's own widget.
  const fieldDefinition = config.fieldDefinition as AbstractDateObjectDataDefinition & MultiValueObjectDataDefinition
  const isMultiValue = frontendType === 'multiValue'
  const widgetType = isMultiValue ? fieldDefinition.delegateDatatype! : frontendType!

  if (!objectDataRegistry.hasDynamicType(widgetType)) {
    return <>Type {widgetType} not supported</>
  }

  const dynType = objectDataRegistry.getDynamicType(widgetType)
  const widgetProps = {
    ...(isMultiValue ? { ...omit(fieldDefinition, ['delegateDatatype', 'delegate', 'variants', 'multiValue', 'maximum']), fieldtype: widgetType, ...fieldDefinition.delegate } : fieldDefinition),
    defaultFieldWidth: fieldWidth
  }
  const component = dynType.getObjectDataComponent(widgetProps as AbstractDateObjectDataDefinition)

  if (!('config' in column) || !('groupId' in column.config) || !('keyId' in column.config)) {
    throw new Error('Column config is missing required properties')
  }

  const locale = isNil(column.locale) ? 'default' : column.locale
  const formItemKey = [key, `${column.config.groupId as number}`, locale, keyAddressOf(column.config.keyId as number, variantOfColumn(column))]

  return (
    <BatchEditFormItem
      component={ component }
      name={ formItemKey }
      supportsBatchAppendModes={ dynType.supportsBatchAppendModes }
    />
  )
}
