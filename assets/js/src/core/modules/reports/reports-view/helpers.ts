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

export enum ReportActionType {
  OPEN_OBJECT = 'openObject',
  OPEN_DOCUMENT = 'openDocument',
  OPEN_ASSET = 'openAsset',
  OPEN_URL = 'openUrl'
}

export const getTypeByActionType = (actionType?: ReportActionType): ElementType => {
  switch (actionType) {
    case ReportActionType.OPEN_OBJECT:
      return 'data-object'
    case ReportActionType.OPEN_DOCUMENT:
      return 'document'
    case ReportActionType.OPEN_ASSET:
      return 'asset'

    default:
      return 'data-object'
  }
}
