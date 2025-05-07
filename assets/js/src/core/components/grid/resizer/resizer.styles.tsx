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
    resizer: css`
      &.grid__resizer {
        position: absolute;
        right: -4px;
        top: 0;
        bottom: 0;
        width: 8px;
        z-index: 1;
        background-color: transparent;

        &--resizing {
          background-color: ${token.colorPrimary};
          width: 2px;
          right: -1px;
        }

        &--hoverable {
          cursor: col-resize;
        }
      }

      &:focus {
        outline: none;
      }
    `
  }
}, { hashPriority: 'low' })
