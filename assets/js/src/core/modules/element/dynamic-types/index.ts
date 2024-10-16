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
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type DynamicTypeFieldFilterRegistry } from './field-filters/dynamic-type-field-filter-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeListingRegistry } from './listing/dynamic-type-listing-registry'
import { type DynamicTypeFieldFilterText } from './field-filters/text/dynamic-type-field-filter-text'
import { type DynamicTypeListingText } from './listing/text/dynamic-type-listing-text'

moduleSystem.registerModule({
  onInit () {
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])

    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterText>(serviceIds['DynamicTypes/FieldFilter/Text']))

    const listingRegistry = container.get<DynamicTypeListingRegistry>(serviceIds['DynamicTypes/ListingRegistry'])

    listingRegistry.registerDynamicType(container.get<DynamicTypeListingText>(serviceIds['DynamicTypes/Listing/Text']))
  }
})
