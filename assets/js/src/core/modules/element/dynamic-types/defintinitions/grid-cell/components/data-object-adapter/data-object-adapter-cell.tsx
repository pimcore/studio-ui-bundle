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
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useInjection } from '@Pimcore/app/depency-injection'
import { isObject, isString } from 'lodash'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Alert } from 'antd'
import { type DynamicTypeObjectDataRegistry } from '../../../objects/data-related/dynamic-type-object-data-registry'
import { DefaultModeCell } from './types/default-mode-cell'
import { EditModalCell } from './types/edit-modal-mode-cell'
import { type AbstractObjectDataDefinition } from '../../../objects/data-related/dynamic-type-object-data-abstract'

export interface DataObjectAdapterCellProps extends DefaultCellProps {}

export const DataObjectAdapterCell = (props: DataObjectAdapterCellProps): React.JSX.Element => {
  const type = props.column.columnDef.meta?.config?.dataObjectType
  const config = props.column.columnDef.meta?.config?.dataObjectConfig
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  if (config !== undefined && !isObject(config)) {
    throw new Error('Invalid data object config')
  }

  if (type === undefined || !isString(type) || ((isString(type) && !objectDataRegistry.hasDynamicType(type)))) {
    return (
      <div className={ ['default-cell__content'].join(' ') }>
        <Alert
          message={ `type ${type} not supported` }
          type="warning"
        />
      </div>
    )
  }

  const fieldDefinition = config?.fieldDefinition ?? {}

  const dynType = objectDataRegistry.getDynamicType(type)
  const cellDefinition = dynType.getGridCellDefinition({
    cellProps: props,
    objectProps: fieldDefinition as unknown as AbstractObjectDataDefinition
  })

  if (cellDefinition.mode === 'default') {
    return (
      <DefaultModeCell
        cellProps={ props }
        objectCellDefinition={ cellDefinition }
      />
    )
  }

  if (cellDefinition.mode === 'edit-modal') {
    return (
      <EditModalCell
        cellProps={ props }
        objectCellDefinition={ cellDefinition }
      />
    )
  }

  throw new Error('Invalid cell definition')
}
