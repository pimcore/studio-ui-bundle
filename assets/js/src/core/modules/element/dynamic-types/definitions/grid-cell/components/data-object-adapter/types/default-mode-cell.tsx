/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeGridCellRegistry } from '../../../dynamic-type-grid-cell-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import React, { useMemo } from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Alert } from '@Pimcore/components/alert/alert'
import { delegateDefinitionOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-delegate-props'
import { displayValueOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-slots'
import { type DefaultGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'

export interface DefaultModeCellProps {
  objectCellDefinition: DefaultGridCellDefinition
  cellProps: DefaultCellProps
}

const isMultiValue = (definition: { fieldtype?: string, fieldType?: string }): boolean => (definition.fieldType ?? definition.fieldtype) === 'multiValue'

export const DefaultModeCell = (props: DefaultModeCellProps): React.JSX.Element => {
  const gridCellRegistry = useInjection<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])
  const { type } = props.objectCellDefinition

  return useMemo(() => {
    const hasDynType = gridCellRegistry.hasDynamicType(type)

    if (!hasDynType) {
      return (
        <div className={ ['default-cell__content'].join(' ') }>
          <Alert
            message={ `type ${type} not supported` }
            type="warning"
          />
        </div>
      )
    }

    const rawDefinition: { fieldtype?: string, fieldType?: string } = props?.cellProps?.column?.columnDef?.meta?.config?.dataObjectConfig?.fieldDefinition ?? {}

    const newCellProps = {
      ...props.cellProps,
      // The cell value of a multiValue key is its stored entry list, which a scalar cell would print as JSON.
      ...(isMultiValue(rawDefinition) ? { getValue: (() => displayValueOf(props.cellProps.getValue())) as typeof props.cellProps.getValue } : {}),
      column: {
        ...props.cellProps.column,
        columnDef: {
          ...props.cellProps.column.columnDef,
          meta: {
            ...props.cellProps.column.columnDef.meta,
            type,
            config: {
              ...(isMultiValue(rawDefinition) ? delegateDefinitionOf(rawDefinition) : rawDefinition)
            }
          }
        }
      }
    }

    const dynType = gridCellRegistry.getDynamicType(type)
    const component = dynType.getGridCellComponent(newCellProps)

    return (
      <>
        {component}
      </>
    )
  }, [props])
}
