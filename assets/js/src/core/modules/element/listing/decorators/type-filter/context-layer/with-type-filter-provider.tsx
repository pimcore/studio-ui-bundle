/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { TypeSelectProvider } from '@Pimcore/modules/element/components/type-select/provider/type-select-provider'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { type TypeFilterDecoratorConfig } from '../type-filter-decorator'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'

export const withTypeFilterProvider = (Component: AbstractDecoratorProps['ContextComponent'], config?: TypeFilterDecoratorConfig): AbstractDecoratorProps['ContextComponent'] => {
  const TypeFilterContextComponent = (): React.JSX.Element => {
    const registries: Record<ElementType, string> = {
      [elementTypes.dataObject]: serviceIds['DynamicTypes/ObjectRegistry'],
      [elementTypes.asset]: serviceIds['DynamicTypes/AssetRegistry'],
      // @todo map that to the correct registry when we start implementing the documents
      [elementTypes.document]: serviceIds['DynamicTypes/AssetRegistry']
    }

    if (config?.elementType === undefined) {
      throw new Error('Element type is required to use the type filter decorator')
    }

    return (
      <TypeSelectProvider
        initialValue={ config?.restrictedOptions?.[0] ?? null }
        nullable={ config?.restrictedOptions === undefined }
        registryServiceId={ registries[config?.elementType] }
        restrictOptions={ config?.restrictedOptions }
      >
        <Component />
      </TypeSelectProvider>
    )
  }

  return TypeFilterContextComponent
}
