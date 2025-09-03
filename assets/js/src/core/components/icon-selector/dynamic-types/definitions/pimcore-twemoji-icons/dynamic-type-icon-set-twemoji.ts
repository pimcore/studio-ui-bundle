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
import { injectable } from "inversify";
import { TWEMOJI_ICONS_LIST_COMPLETE } from "./twemoji-icons-list-complete";

@injectable()
export class DynamicTypeIconSetTwemoji extends DynamicTypeIconSetAbstract {

  id: string = 'twemoji'

  name: string = 'Twemoji'

  getIcons (): ElementIcon[] {
    const iconsList = TWEMOJI_ICONS_LIST_COMPLETE;
    
    return iconsList.map((iconName) => ({
      type: 'path' as const,
      value: `icons/twemoji/${iconName}.svg`
    }))
  }
  
}
