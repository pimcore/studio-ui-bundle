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

import { DynamicTypeListingAbstract } from '../dynamic-type-listing-abstract'
import { type DynamicTypeFieldFilterTextProps } from '@Pimcore/modules/element/dynamic-types/field-filters/text/dynamic-type-field-filter-text-component'
import { type ReactElement } from 'react'
import { inject, injectable } from 'inversify'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

@injectable()
export class DynamicTypeListingText extends DynamicTypeListingAbstract {
  id: string = 'text'
  protected gridComponentType: string = 'input'
  @inject(serviceIds['DynamicTypes/FieldFilter/Text']) protected dynamicTypeFieldFilterType: DynamicTypeListingAbstract["dynamicTypeFieldFilterType"]

  getFilterComponent (props: DynamicTypeFieldFilterTextProps): ReactElement<DynamicTypeFieldFilterTextProps> {
    return super.getFilterComponent(props)
  }
}
