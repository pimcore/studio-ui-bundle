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

import { type ReactElement, useContext } from 'react'
import { type DynamicTypeAbstract, type DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'
import { DynamicTypeResolver, type DynamicTypesResolverTargets } from '../dynamic-type-resolver'
import { DynamicTypeRegistryContext } from '../../registry/provider/dynamic-type-registry-provider'
import { container } from '@Pimcore/app/depency-injection'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface IComponentRenderer {
  ComponentRenderer: ((props: unknown) => ReactElement<unknown>) | null
}

export interface typeProps {
  target: keyof typeof DynamicTypesResolverTargets
  dynamicTypeIds: Array<DynamicTypeAbstract['id']>
}

export interface UseDynamicTypeResolverReturnType {
  getComponentRenderer: (props: typeProps) => IComponentRenderer
  hasType: (props: typeProps) => boolean
}

export const useDynamicTypeResolver = (): UseDynamicTypeResolverReturnType => {
  const context = useContext(DynamicTypeRegistryContext)

  if (context === undefined || context === null) {
    trackError(new GeneralError('useDynamicTypeResolver must be used within a DynamicTypeRegistryProvider'))
  }

  const { serviceIds } = context!
  const registries = serviceIds.map(serviceId => container.get<InstanceType<typeof DynamicTypeRegistryAbstract>>(serviceId))

  function getComponentRenderer <T> (props: typeProps): IComponentRenderer {
    const { target, dynamicTypeIds } = props
    const dynamicTypeResolver = new DynamicTypeResolver()

    for (const dynamicTypeId of dynamicTypeIds) {
      for (const registry of registries) {
        if (registry.hasDynamicType(dynamicTypeId)) {
          const dynamicType = registry.getDynamicType(dynamicTypeId)

          if (dynamicTypeResolver.hasCallable(target, dynamicType)) {
            return {
              ComponentRenderer: dynamicTypeResolver.resolve<T>({ target, dynamicType }) as (props: T) => ReactElement<T>
            }
          }
        }
      }
    }

    return { ComponentRenderer: null }
  }

  function hasType (props: typeProps): boolean {
    const { target, dynamicTypeIds } = props
    const dynamicTypeResolver = new DynamicTypeResolver()

    for (const dynamicTypeId of dynamicTypeIds) {
      for (const registry of registries) {
        if (registry.hasDynamicType(dynamicTypeId)) {
          const dynamicType = registry.getDynamicType(dynamicTypeId)

          if (dynamicTypeResolver.hasCallable(target, dynamicType)) {
            return true
          }
        }
      }
    }

    return false
  }

  return {
    getComponentRenderer,
    hasType
  }
}
