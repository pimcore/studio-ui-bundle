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

import { type ReactElement, useContext, useMemo } from 'react'
import { type DynamicTypeAbstract, type DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'
import { DynamicTypeResolver, type DynamicTypesResolverTargets } from '../dynamic-type-resolver'
import { DynamicTypeRegistryContext } from '../../registry/provider/dynamic-type-registry-provider'
import { container } from '@Pimcore/app/depency-injection'

export interface UseDynamicTypeResolverReturnType<T> {
  ComponentRenderer: null | ((props: T) => ReactElement<T>)
}

export interface UseDynamicTypeResolverProps {
  target: keyof typeof DynamicTypesResolverTargets
  dynamicTypeIds: Array<DynamicTypeAbstract['id']>
}

export const useDynamicTypeResolver = <T>({ target, dynamicTypeIds }: UseDynamicTypeResolverProps): UseDynamicTypeResolverReturnType<T> => {
  const context = useContext(DynamicTypeRegistryContext)

  if (context === undefined || context === null) {
    throw new Error('useDynamicTypeResolver must be used within a DynamicTypeRegistryProvider')
  }

  return useMemo(() => {
    const { serviceIds } = context
    const registries = serviceIds.map(serviceId => container.get<InstanceType<typeof DynamicTypeRegistryAbstract>>(serviceId))

    const dynamicTypeResolver = new DynamicTypeResolver()

    for (const dynamicTypeId of dynamicTypeIds) {
      for (const registry of registries) {
        if (registry.hasDynamicType(dynamicTypeId)) {
          const dynamicType = registry.getDynamicType(dynamicTypeId)

          if (dynamicTypeResolver.hasCallable(target, dynamicType)) {
            return {
              ComponentRenderer: dynamicTypeResolver.resolve<T>({ target, dynamicType })
            }
          }
        }
      }
    }

    return {
      ComponentRenderer: null
    }
  }, [context, target, dynamicTypeIds])
}
