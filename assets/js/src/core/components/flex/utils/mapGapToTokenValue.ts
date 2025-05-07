/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GlobalToken } from 'antd'
import type { GapType } from '@Pimcore/types/components/types'

export function mapGapToTokenValue ({ token, gap }: { token: GlobalToken, gap: GapType }): number {
  switch (gap) {
    case 'mini':
      return token.sizeXXS
    case 'extra-small':
      return token.sizeXS
    case 'small':
      return token.sizeSM
    case 'normal':
      return token.size
    case 'medium':
      return token.sizeMD
    case 'large':
      return token.sizeLG
    case 'extra-large':
      return token.sizeXL
    case 'maxi':
      return token.sizeXXL

    default:
      return 0
  }
}
