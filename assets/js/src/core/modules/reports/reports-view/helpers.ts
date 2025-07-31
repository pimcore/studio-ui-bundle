/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { ElementType } from '@Pimcore/types/enums/element/element-type'

export const getTypeByActionType = (actionType?: string): ElementType => {
  switch (actionType) {
    case 'openObject':
      return 'data-object'
    case 'openDocument':
      return 'document'
    case 'openAsset':
      return 'asset'

    default:
      return 'data-object'
  }
}
