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
    dropdownContent: css`
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
      padding: ${token.paddingXS}px;
    `,

    icon: css`
      color: ${token.Colors.Neutral.Icon.colorIcon};
    `,

    label: css`
      color: ${token.colorTextLabel};
    `
  }
})

