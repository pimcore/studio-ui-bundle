/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Alert } from 'antd'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeGridCellRegistry } from '../../../dynamic-type-grid-cell-registry'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { isString } from 'lodash'

const typeMapping = {
  text: 'input',
  bool: 'checkbox'
}

export const ValueCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type as string
  const gridCellRegistry = useInjection<DynamicTypeGridCellRegistry>('DynamicTypes/GridCellRegistry')
  const type: string = typeMapping[propertyType] ?? propertyType

  function renderCell (): React.JSX.Element {
    if (!gridCellRegistry.hasDynamicType(type)) {
      return (
        <Alert
          message="cell type not supported"
          style={ { display: 'flex' } }
          type="warning"
        />
      )
    }

    const dynamicType = gridCellRegistry.getDynamicType(type)
    let enrichedProps = props
    if (type === 'select') {
      enrichedProps = addColumnConfig(props, {
        options: isString(props.row.original.config)
          ? props.row.original.config.split(',').map((value: string) => {
            return { value, label: value }
          }
          )
          : undefined
      })
    }
    return dynamicType.getGridCellComponent(enrichedProps)
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
