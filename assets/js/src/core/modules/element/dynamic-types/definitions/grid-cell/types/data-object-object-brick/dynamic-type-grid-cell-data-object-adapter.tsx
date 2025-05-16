/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { type ColumnMeta } from '@tanstack/react-table'
import { injectable } from 'inversify'
import React, { type ReactElement } from 'react'
import { type DynamicTypeObjectDataRegistry } from 'src/sdk/modules/element'
import { DataObjectAdapterCell } from '../../components/data-object-adapter/data-object-adapter-cell'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../dynamic-type-grid-cell-abstract'

@injectable()
export class DynamicTypeGridCellDataObjectObjectBrick extends DynamicTypeGridCellAbstract {
  readonly id = 'dataobject.objectbrick'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <DataObjectAdapterCell { ...props } />
  }

  getDefaultGridColumnWidth (props: ColumnMeta<any, any>): number | undefined {
    const objectDataRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
    const type = props.config?.dataObjectType as string

    if (type !== undefined) {
      const dynType = objectDataRegistry.getDynamicType(type)
      if (dynType?.getDefaultGridColumnWidth !== undefined) {
        return dynType.getDefaultGridColumnWidth(props)
      }
    }

    return undefined
  }
}
