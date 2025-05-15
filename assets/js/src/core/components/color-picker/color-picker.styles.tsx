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
    colorPicker: css`
      &.versionFieldItem {
        .ant-color-picker-trigger-text {
          color: ${token.colorText} !important;
        }
      }

      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
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
