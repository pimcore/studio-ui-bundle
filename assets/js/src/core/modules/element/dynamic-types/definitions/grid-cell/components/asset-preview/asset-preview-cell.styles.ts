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

export const useStyle = createStyles(({ token, css }) => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
        
      .pimcore-icon {
        color: ${token.Colors.Neutral.Icon.colorIcon};
        cursor: pointer;

        svg * {
            vector-effect: non-scaling-stroke;
        }
      }
    `
  }
})
