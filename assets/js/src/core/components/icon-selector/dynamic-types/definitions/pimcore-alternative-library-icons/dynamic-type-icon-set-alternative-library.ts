/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { DynamicTypeIconSetAbstract } from '../dynamic-type-icon-set-abstract'
import { injectable } from 'inversify'
import { ALTERNATIVE_LIBRARY_ICONS_LIST } from './alternative-library-icons-list'

@injectable()
export class DynamicTypeIconSetAlternativeLibrary extends DynamicTypeIconSetAbstract {
  id: string = 'alternative-library'

  name: string = 'AlternativeLibrary'

  getIcons (): ElementIcon[] {
    return ALTERNATIVE_LIBRARY_ICONS_LIST.map((iconName) => ({
      type: 'name' as const,
      value: iconName
    }))
  }
}
