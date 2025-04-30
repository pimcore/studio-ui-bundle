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
import { type ColumnMetaGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'

export interface DefaultModeCellProps {
  objectCellDefinition: ColumnMetaGridCellDefinition
  cellProps: DefaultCellProps
}

export const ColumnMetaCell = (props: DefaultModeCellProps): React.JSX.Element => {
  const gridCellRegistry = useInjection<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])
  const { meta } = props.objectCellDefinition

  return useMemo(() => {
    const hasDynType = gridCellRegistry.hasDynamicType(meta.type)

    if (!hasDynType) {
      return (
        <div className={ ['default-cell__content'].join(' ') }>
          <Alert
            message={ `type ${meta.type} not supported` }
            type="warning"
          />
        </div>
      )
    }

    const newCellProps = {
      ...props.cellProps,
      column: {
        ...props.cellProps.column,
        columnDef: {
          ...props.cellProps.column.columnDef,
          meta
        }
      }
    }

    const dynType = gridCellRegistry.getDynamicType(meta.type)
    const component = dynType.getGridCellComponent(newCellProps)

    return (
      <>
        {component}
      </>
    )
  }, [props])
}
