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

export const useStyles = createStyles(({ css, token }) => {
  return {
    split: css`
      align-items: center;

      .ant-divider {
        margin-inline: 0;
      }

      .ant-space-item:empty + .ant-space-item-split {
        display: none;
      }

      &.split--theme-secondary {
        .ant-divider {
          border-color: #D9D9D9D9;
        }
      }

      &.split--divider-size-small {
        .ant-divider {
          height: 16px;
        }
      }

      &.split--divider-size-large {
        .ant-divider {
          height: 24px;
        }
      }
    `
  }
})
