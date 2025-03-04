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

import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeGridCellRegistry } from '../../../dynamic-type-grid-cell-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import React, { useMemo } from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Alert } from '@Pimcore/components/alert/alert'
import { type DefaultGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'

export interface DefaultModeCellProps {
  objectCellDefinition: DefaultGridCellDefinition
  cellProps: DefaultCellProps
}

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

    const newCellProps = {
      ...props.cellProps,
      column: {
        ...props.cellProps.column,
        columnDef: {
          ...props.cellProps.column.columnDef,
          meta: {
            ...props.cellProps.column.columnDef.meta,
            type,
            config: {
              ...props?.cellProps?.column?.columnDef?.meta?.config?.dataObjectConfig?.fieldDefinition ?? {}
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
