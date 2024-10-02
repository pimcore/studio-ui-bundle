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
