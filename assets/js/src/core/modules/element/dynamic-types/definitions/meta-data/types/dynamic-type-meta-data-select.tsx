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

import React, { type ReactElement } from 'react'
import { inject, injectable } from 'inversify'
import { DynamicTypeMetadataAbstract } from '../dynamic-type-metadata-abstract'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../grid-cell/dynamic-type-grid-cell-abstract'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterAbstract } from '../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { type DynamicTypeGridCellRegistry } from '../../grid-cell/dynamic-type-grid-cell-registry'
import { useMetadataSelectOptions } from '../hooks/use-metadata-select-options'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { type SelectCellConfig } from '../../grid-cell/components/select/select-cell'

@injectable()
export class DynamicTypeMetaDataSelect extends DynamicTypeMetadataAbstract {
  readonly id = 'metadata.select'
  readonly iconName = 'chevron-down'

  visibleInTypeSelection: boolean = false

  @inject(serviceIds['DynamicTypes/GridCell/Select']) protected dynamicTypeGridCellType: DynamicTypeGridCellAbstract
  @inject(serviceIds['DynamicTypes/FieldFilter/Text']) protected dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    const GridCellRegistry = container.get<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])
    const config: SelectCellConfig = {
      optionsUseHook: useMetadataSelectOptions,
      fieldName: String(props.cell.row.original.name ?? props.column.columnDef.meta?.columnKey)
    }

    return GridCellRegistry.getGridCellComponent(this.dynamicTypeGridCellType.id, addColumnConfig(props, config))
  }

  getVersionPreviewComponent (data: { path: string, key: string }): JSX.Element {
    return <span>{ data.path }{ data.key }</span>
  }
}
