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

import { type ReactElement } from 'react'
import { type DynamicTypeAbstract } from '../registry/dynamic-type-registry-abstract'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export const DynamicTypesResolverTargets = {
  GRID_CELL: 'GRID_CELL',
  FIELD_FILTER: 'FIELD_FILTER',
  BATCH_EDIT: 'BATCH_EDIT'
}

export const targetCallbackNameMap = {
  [DynamicTypesResolverTargets.GRID_CELL]: 'getGridCellComponent',
  [DynamicTypesResolverTargets.FIELD_FILTER]: 'getFieldFilterComponent',
  [DynamicTypesResolverTargets.BATCH_EDIT]: 'getBatchEditComponent'
}

export type ITargetCallbackNameMap = typeof targetCallbackNameMap

export class DynamicTypeResolver {
  resolve<T>({ target, dynamicType }: { target: keyof ITargetCallbackNameMap, dynamicType: DynamicTypeAbstract }): (props: T) => ReactElement<T> {
    if (!this.hasCallable(target, dynamicType)) {
      trackError(new GeneralError(`DynamicTypeResolver: ${dynamicType.id} does not have a callable ${targetCallbackNameMap[target]}`))
    }

    return (props: T) => dynamicType[targetCallbackNameMap[target]].bind(dynamicType)(props)
  }

  hasCallable (target: keyof ITargetCallbackNameMap, dynamicType: InstanceType<typeof DynamicTypeAbstract>): boolean {
    if (dynamicType[targetCallbackNameMap[target]] === undefined) {
      return false
    }

    return typeof dynamicType[targetCallbackNameMap[target]] === 'function'
  }
}
