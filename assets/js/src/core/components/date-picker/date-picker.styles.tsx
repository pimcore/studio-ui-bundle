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
    datePicker: css`
      input {
       color: ${token.colorText} !important;
      }

      .ant-picker-suffix {
        display: none;
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
