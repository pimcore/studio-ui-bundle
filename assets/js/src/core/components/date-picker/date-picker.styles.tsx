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

export const useStyles = createStyles(({ token, css }) => {
  return {
    datePicker: css`
      width: 100%;
      input {
       color: ${token.colorText} !important;
      }

      .ant-picker-suffix {
        display: none;
      }

      &.showSuffixIcon {
        .ant-picker-suffix {
          display: flex;
        }
      }
      
      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
      
      .ant-picker-range-separator {
        color: ${token.colorTextDisabled};
      }
    `,

    datePickerDropdown: css`
      width: inherit !important;

      .ant-picker-today-btn {
        color: ${token.colorPrimary};
      }

      .ant-picker-cell-today .ant-picker-cell-inner::before {
        border-color: ${token.colorPrimary} !important;
      }

      .ant-picker-header-view button:hover,
      .ant-picker-header button:hover {
        color: ${token.colorPrimary};
      }
    `,

    inherited: css`
      background: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      &:focus-within, &:hover {
        background: ${token.colorBgContainerDisabled};
      }
    `
  }
})
