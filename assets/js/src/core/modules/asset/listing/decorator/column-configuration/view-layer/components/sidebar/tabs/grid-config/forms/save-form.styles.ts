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
    label: css`
      color: ${token.colorTextLabel};
    `,

    icon: css`
      color: ${token.colorTextLabel};
    `,

    updateButton: css`
      color: ${token.Button.defaultColor};
      
      .pimcore-icon {
        color: ${token.Button.defaultColor};
      }
      
      &:hover {
        cursor: pointer;
      }
    `,

    updateButtonText: css`
      color: ${token.Button.defaultColor};
    `,

    tag: css`
      .ant-tag {
        background-color: ${token.Colors.Neutral.Fill.colorFillTertiary};
      }
    `
  }
})
