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
    flex: css`
      .pimcore-icon {
        margin-right: 4px;
      }

      &.title--theme-primary .pimcore-icon {
       color: ${token.colorPrimary};
      }

      &.title--theme-secondary .pimcore-icon {
       color: ${token.colorTextSecondary};
      }
    `,
    title: css`
      &.pimcore-title.ant-typography {
        font-weight: 600;
        font-size: 12px;

        &.title--weight-normal {
          font-weight: 400;
        }
      }
      .pimcore-icon {
        margin-right: 4px;
      }

      &.pimcore-title.ant-typography.title--theme-primary {
       color: ${token.colorPrimary};
      }

      &.pimcore-title.ant-typography.title--theme-secondary {
       color: ${token.colorTextSecondary};
      }
    `
  }
}, { hashPriority: 'low' })
