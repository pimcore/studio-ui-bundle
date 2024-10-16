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

import React, { useMemo } from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeListingRegistry } from '@Pimcore/modules/element/dynamic-types/listing/dynamic-type-listing-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export interface DefaultFilterProps {
  column: GridColumnConfiguration
}

export const DefaultFilter = ({ column }: DefaultFilterProps): React.JSX.Element => {
  const listingRegistry = useInjection<DynamicTypeListingRegistry>(serviceIds['DynamicTypes/ListingRegistry'])
  // @todo connect to frontend type
  // const { frontendType } = column

  const Component = useMemo(() => {
    return listingRegistry.getDynamicType('text').getFilterComponent({ column })
  }, [])

  // @todo implement different filter types
  return (
    <>
      { Component }
    </>
  )
}
