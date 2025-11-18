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
    grid: css`
      position: relative;
      width: 100%;
      max-height: 500px;
      overflow: auto;
    `,

    permissionLabel: css`
      color: ${token.colorTextLabel};
    `,

    permissionIcon: css`
      color: ${token.colorTextLabel};
    `,

    permissionUpdateButton: css`
      color: ${token.Button.defaultColor};

      .pimcore-icon {
        color: ${token.Button.defaultColor};
      }

      &:hover {
        cursor: pointer;
      }
    `,

    permissionUpdateButtonText: css`
      color: ${token.Button.defaultColor};
    `,

    permissionTag: css`
      .ant-tag {
        background-color: ${token.Colors.Neutral.Fill.colorFillTertiary};
      }
    `
  }
})
