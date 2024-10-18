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
import { inject, injectable } from 'inversify'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

@injectable()
export class DynamicTypeListingSelect extends DynamicTypeListingAbstract {
  id: string = 'select'

  protected readonly gridComponentType: string = 'input'
  @inject(serviceIds['DynamicTypes/FieldFilter/Select']) protected dynamicTypeFieldFilterType: DynamicTypeListingAbstract['dynamicTypeFieldFilterType']
}
