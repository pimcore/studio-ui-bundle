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

export const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      &.versionFieldItem {
        .ant-select-disabled,
        .ant-input-number-disabled {
          width: 100%;
          max-width: 100% !important;
        }

        .ant-select-disabled .ant-select-selection-item,
        .ant-input-number-disabled {
          color: ${token.colorText} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-number-disabled {
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-select-disabled .ant-select-selector,
        .ant-input-number-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-number-disabled {
          border-color: ${token.colorBorder} !important;
        }
      }
    `,

    select: css`
       min-width: 100px;
    `,
    input: css`
      min-width: 80px;
    `
  }
})
