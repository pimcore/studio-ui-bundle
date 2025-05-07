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
    toolbar: css`
      display: flex;
      align-items: center;
      gap: 8px;

      .element-toolbar__info-dropdown {
        .ant-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid ${token.colorBorder};
          background: ${token.colorFillTertiary};
          color: ${token.colorText};

          .ant-btn-icon.ant-btn-icon-end {
            margin-left: 0;
          }

          &:hover .pimcore-icon {
            color: ${token.colorIconHover};
          }
        }
      }
        
      .pimcore-icon {
        color: ${token.colorIcon};
      }
    `
  }
})
