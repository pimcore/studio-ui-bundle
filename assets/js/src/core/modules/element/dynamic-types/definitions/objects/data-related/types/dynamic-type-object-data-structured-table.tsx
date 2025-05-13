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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  StructuredTable, type StructuredTableValue, type StructuredTableProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { StructuredTable as StructuredTablePreview } from '../../grid-cell-preview/structured-table/structured-table'

export type StructuredTableObjectDataDefinition = AbstractObjectDataDefinition & StructuredTableProps

export class DynamicTypeObjectDataStructuredTable extends DynamicTypeObjectDataAbstract {
  id: string = 'structuredTable'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: StructuredTableObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <StructuredTable
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: StructuredTableValue | null = props.cellProps.getValue()
    const objectProps: StructuredTableObjectDataDefinition = props.objectProps as StructuredTableObjectDataDefinition

    return (
      <StructuredTablePreview
        cols={ objectProps.cols }
        rows={ objectProps.rows }
        value={ value }
      />
    )
  }
}
