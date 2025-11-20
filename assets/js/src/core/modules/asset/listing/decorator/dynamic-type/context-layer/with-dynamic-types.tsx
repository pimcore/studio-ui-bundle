/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { DynamicTypeRegistryProvider } from '@sdk/modules/element'
import React from 'react'

export const withDynamicTypes = (Component: AbstractDecoratorProps['ContextComponent']): AbstractDecoratorProps['ContextComponent'] => {
  const DynamicTypesContextComponent = (): React.JSX.Element => {
    return (
      <DynamicTypeRegistryProvider
        serviceIds={ [
          'DynamicTypes/GridCellRegistry',
          'DynamicTypes/MetadataRegistry',
          'DynamicTypes/ListingRegistry',
          'DynamicTypes/BatchEditRegistry',
          'DynamicTypes/FieldFilterRegistry'
        ] }
      >
        <Component />
      </DynamicTypeRegistryProvider>
    )
  }

  return DynamicTypesContextComponent
}
