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
    dropdownPanel: css`
      min-width: 200px;
      background: ${token.colorBgElevated};
      border-radius: ${token.borderRadiusLG}px;
      box-shadow: ${token.boxShadowSecondary} !important;

      .ant-dropdown-menu-item-selected {
        color: ${token.colorText} !important;
      }
    `,

    languageSelect: css`
      display: flex;
      gap: 2px;
      align-items: center;
      justify-content: center;
      height: 32px;

      button {
        width: 20px;
        height: 20px;
        color: ${token.colorText};
        padding: 2px;
      }

      .language-select__current-value {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }
    `,

    languageSelectValue: css`
      cursor: pointer;
      min-width: 40px;
    `,

    languageDropdownItem: css`
      width: 100%;
    `,

    inputWrapper: css`
      position: sticky;
      top: 0;
      z-index: 1;
      padding: ${token.paddingXS}px;
      background: ${token.colorBgElevated};
      border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
    `,

    languageList: css`
      border-radius: 0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px !important;
      max-height: 300px !important;
      overflow-y: auto;
      
      .ant-dropdown-menu-title-content,
      .ant-dropdown-menu-title-content > span {
        width: 100% !important;
      }
    `,

    icon: css`
      color: ${token.Colors.Neutral.Icon.colorIcon};
    `,

    label: css`
      color: ${token.colorTextLabel};
    `,

    emptyState: css`
      padding: ${token.paddingSM}px;
      color: ${token.colorTextLabel};
    `
  }
})
