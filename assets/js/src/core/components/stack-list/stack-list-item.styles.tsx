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
    stackListItem: css`
      border-radius: 4px;
      border: 1px solid ${token.colorBorder};
      background-color: #fff;

      .stack-list-item__title {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 4px;
      }

      .stack-list-item__body {
        padding: 0 4px 4px 4px;
        
        .ant-picker {
          width: 100%;
        }
      }

      .stack-list-item__content {
        flex: 1;
      }
    `
  }
})
