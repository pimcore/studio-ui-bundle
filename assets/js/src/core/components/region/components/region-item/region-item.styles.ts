/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'
import { type RegionItemProps } from './region-item'

export const useStyles = createStyles(({ token, css }, { region }: RegionItemProps) => {
  return {
    regionItem: css`
      grid-area: ${region};
    `
  }
})
