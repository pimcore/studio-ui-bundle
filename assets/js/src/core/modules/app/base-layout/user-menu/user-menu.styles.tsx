/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyle = createStyles(({ token, css }) => {
  return {
    userMenu: css`
      .user-menu__title {
        text-transform: uppercase;
        font-size: ${token.fontSize}px;
        line-height: 22px;
        color: ${token.colorTextDescription};
      }
      .user-menu__title-username {
        text-transform: none;
      }

      .user-menu__item-extra {
        margin-left: auto;
      }

      .ant-dropdown-menu-item-group-title {
        height: ${token.controlHeight}px;
        padding: 5px ${token.controlPaddingHorizontal}px;
        display: flex;
        align-items: center;
      }

      .ant-dropdown-menu-item,
      .ant-dropdown-menu-submenu-title {
        height: ${token.controlHeight}px;
        padding-block: 5px;
        font-size: ${token.fontSize}px;
        line-height: 22px;
      }

      .ant-dropdown-menu-title-content.ant-dropdown-menu-title-content {
        gap: ${token.marginXS}px;
        width: 100%;
        font-size: ${token.fontSize}px;
      }

      .user-menu__item-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
    `
  }
})
