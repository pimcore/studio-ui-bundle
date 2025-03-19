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
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  Table, type TableProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/table/table'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { type TableValue } from '../components/table/hooks/use-table-value'
import { Table as TablePreview } from '../../grid-cell-preview/table/table'

export type TableObjectDataDefinition = AbstractObjectDataDefinition & TableProps

export class DynamicTypeObjectDataTable extends DynamicTypeObjectDataAbstract {
  id: string = 'table'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: TableObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Table
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: TableValue | null = props.cellProps.getValue()

    return (
      <TablePreview
        value={ value }
      />
    )
  }
}
