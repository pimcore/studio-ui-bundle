/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ElementIcon } from "@Pimcore/modules/asset/asset-api-slice.gen";
import { DynamicTypeIconSetAbstract } from "../dynamic-type-icon-set-abstract";
import { injectable, inject } from "inversify";
import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { type IconLibrary } from "@Pimcore/modules/icon-library/services/icon-library";

@injectable()
export class DynamicTypeIconSetPimcoreDefault extends DynamicTypeIconSetAbstract {

  id: string = 'pimcore-default'
  
  name: string = 'Pimcore'

  constructor(
    @inject(serviceIds.iconLibrary) private readonly iconLibrary: IconLibrary
  ) {
    super()
  }

  getIcons (): ElementIcon[] {
    const allIcons = this.iconLibrary.getIcons()
    return Array.from(allIcons).map(([iconName]) => ({
      type: "name",
      value: iconName
    }))
  }
  
}
