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
import { ListContainerInner } from './list-container-inner'
import { ListProvider } from './list-provider'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'

const ListContainer = (): React.JSX.Element => {
  return (
    <ListProvider>
      <DynamicTypeRegistryProvider serviceIds={ [
        'DynamicTypes/MetadataRegistry',
        'DynamicTypes/ListingRegistry'
      ] }
      >
        <ListContainerInner />
      </DynamicTypeRegistryProvider>
    </ListProvider>
  )
}

export { ListContainer }
