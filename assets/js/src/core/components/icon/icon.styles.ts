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

export const useStyles = createStyles(({ token, css }) => {
  return {
    subIcon: css`
      position: absolute;
      width: 10px;
      height: 10px;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);

      & svg {
        color: ${token.gold7};
        background: ${token.gold1};
        border-radius: ${token.borderRadiusLG}px;
      }

      &.sub-icon-variant--green {
        & svg {
          color: ${token.green7};
        }
      }
    `
  }
})
