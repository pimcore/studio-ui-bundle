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
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { type TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import { type ComponentType, type ReactElement } from 'react'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-registry'
import { type AbstractFieldFilterDefinition, type DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-abstract'
import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'

// @todo move to corresponding file
export interface DefaultBatchEditComponentProps {
  toBeDefined: true
}

@injectable()
export abstract class DynamicTypeListingAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  protected abstract gridComponentType: string
  protected readonly abstract dynamicTypeFieldFilterType: InstanceType<typeof DynamicTypeFieldFilterAbstract>

  getGridCellComponent (): ComponentType<DefaultCellProps> {
    const gridTypeRegistry = container.get<TypeRegistry>(serviceIds['Grid/TypeRegistry'])
    const component = gridTypeRegistry.getComponentByType(this.gridComponentType)

    if (component === undefined) {
      throw new Error(`Grid component "${this.gridComponentType}" not found`)
    }

    return component
  }

  getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition> {
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])
    return fieldFilterRegistry.getComponent(this.dynamicTypeFieldFilterType.id, props)
  }
}
