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
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { type AbstractFieldFilterDefinition } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-abstract'

export interface DefaultFilterProps {
  column: GridColumnConfiguration
}

export const DefaultFilter = ({ column }: DefaultFilterProps): React.JSX.Element => {
  const { frontendType, type } = column
  const { ComponentRenderer } = useDynamicTypeResolver<AbstractFieldFilterDefinition>({ target: 'FIELD_FILTER', dynamicTypeIds: [type, frontendType!] })

  if (ComponentRenderer === null) {
    // @todo implement error handling
    return <>Dynamic Field Filter not supported</>
  }

  // @todo implement different filter types
  return (
    <>
      { ComponentRenderer({ column }) }
    </>
  )
}
