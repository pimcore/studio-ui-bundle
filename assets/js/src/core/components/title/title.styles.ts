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
        color: ${token.colorPrimary};
        margin-right: 4px;
      }
    `,
    title: css`
      &.pimcore-title.ant-typography {
        font-size: 12px;
        font-weight: 600;
        color: ${token.colorPrimary};
      }
      .pimcore-icon {
        color: ${token.colorPrimary};
        margin-right: 4px;
      }
    `
  }
}, { hashPriority: 'low' })
