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
    userMenu: css`
      .user-menu__title {
        text-transform: uppercase;
      }
      .user-menu__title-username {
        text-transform: none;
      }
      
      .user-menu__item-extra {
        margin-left: auto;
      }

      .ant-dropdown-menu-title-content.ant-dropdown-menu-title-content {
        gap: ${token.marginXXS}px;
        width: 100%;
      }
      
      .user-menu__item-icon {
        width: 20px;
        line-height: 1;
      }
    
      .ant-badge .ant-badge-count {
        background: ${token.colorPrimary};
        width: 20px;
        height: 20px;
        border-radius: 100%;
        font-size: 8px;
        font-weight: ${token.fontWeightStrong};
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  }
})
