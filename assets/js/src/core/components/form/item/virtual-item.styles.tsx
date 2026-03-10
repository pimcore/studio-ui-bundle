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
    virtualItem: css`
      .virtual-item__label {
        display: flex;
        padding: ${token.Form.verticalLabelPadding}px;
      }

      .virtual-item__tooltip {
        opacity: 0.6;
      }

      .virtual-item__explain {
        min-height: ${token.controlHeightSM}px;
        padding-top: ${token.paddingXXS}px;
        font-size: ${token.fontSizeSM}px;
        line-height: ${token.lineHeight};
      }

      .virtual-item__explain--error {
        color: ${token.colorError};
      }

      .virtual-item__explain--warning {
        color: ${token.colorWarning};
      }

      &.virtual-item--error {
        .virtual-item__label label {
          color: ${token.colorError};
        }
      }

      &.virtual-item--warning {
        .virtual-item__label label {
          color: ${token.colorWarning};
        }
      }
    `
  }
})
