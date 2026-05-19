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
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { type ObjectComponentProps } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'

export interface ComparisonDataComponentProps extends ObjectComponentProps {
  datatype: 'data'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

/**
 * Registry-based field dispatcher for the language comparison modal.
 *
 * Mirrors the structure of the versions DataComponent (registry lookup +
 * ErrorBoundary + fieldWidth enrichment) but calls `getObjectDataComponent`
 * instead of `getVersionObjectDataComponent`, so fields are rendered in their
 * editable form while still being wired to the surrounding Ant Design Form.
 */
export const ComparisonDataComponent = (props: ComparisonDataComponentProps): React.JSX.Element => {
  const { fieldType, fieldtype } = props

  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const fieldWidth = useFieldWidth()

  const currentFieldType = fieldType ?? fieldtype ?? 'unknown'

  if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
    return (
      <Alert
        message={ `Unknown data type: ${currentFieldType}` }
        type="warning"
      />
    )
  }

  const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)
  const enrichedProps = { ...props, defaultFieldWidth: fieldWidth }

  if (objectDataType.getObjectDataFormItemProps(enrichedProps).hidden === true) {
    return <></>
  }

  return (
    <ErrorBoundary>
      {objectDataType.getObjectDataComponent(enrichedProps)}
    </ErrorBoundary>
  )
}
