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

import { container } from '@Pimcore/app/depency-injection'
import { type ReactElement } from 'react'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-registry'
import { type AbstractFieldFilterDefinition, type DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-abstract'
import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type AbstractGridCellDefinition, type DynamicTypeGridCellAbstract } from '../grid-cell/dynamic-type-grid-cell-abstract'
import { type DynamicTypeGridCellRegistry } from '../grid-cell/dynamic-type-grid-cell-registry'

// @todo move to corresponding file
export interface DefaultBatchEditComponentProps {
  toBeDefined: true
}

@injectable()
export abstract class DynamicTypeMetadataAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract visibleInTypeSelection: boolean
  protected readonly abstract dynamicTypeGridCellType: InstanceType<typeof DynamicTypeGridCellAbstract>
  protected readonly abstract dynamicTypeFieldFilterType: InstanceType<typeof DynamicTypeFieldFilterAbstract>

  abstract getVersionPreviewComponent (data: unknown): ReactElement<unknown>

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    const GridCellRegistry = container.get<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])
    return GridCellRegistry.getGridCellComponent(this.dynamicTypeGridCellType.id, props)
  }

  getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition> {
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])
    return fieldFilterRegistry.getComponent(this.dynamicTypeFieldFilterType.id, props)
  }
}
