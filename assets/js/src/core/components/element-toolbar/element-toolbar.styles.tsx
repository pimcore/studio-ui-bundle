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
