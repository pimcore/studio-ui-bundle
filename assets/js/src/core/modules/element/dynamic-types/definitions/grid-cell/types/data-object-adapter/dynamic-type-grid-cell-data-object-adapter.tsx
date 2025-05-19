/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getDefaultGridColumnWidthFromDynamicObjectType } from '@Pimcore/modules/element/dynamic-types/utils/column-helper'
import { type ColumnMeta } from '@tanstack/react-table'
import { injectable } from 'inversify'
import React, { type ReactElement } from 'react'
import { DataObjectAdapterCell } from '../../components/data-object-adapter/data-object-adapter-cell'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../dynamic-type-grid-cell-abstract'

@injectable()
export class DynamicTypeGridCellDataObjectAdapter extends DynamicTypeGridCellAbstract {
  readonly id = 'dataobject.adapter'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <DataObjectAdapterCell { ...props } />
  }

  getDefaultGridColumnWidth (props?: ColumnMeta<any, any>): number | undefined {
    const columnConfig = props?.config

    return getDefaultGridColumnWidthFromDynamicObjectType(
      columnConfig.dataObjectType as string | undefined,
      props
    )
  }
}
