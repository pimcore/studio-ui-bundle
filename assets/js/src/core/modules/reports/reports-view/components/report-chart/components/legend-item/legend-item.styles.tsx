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
    legendItem: css`
      padding: 1px ${token.paddingXS}px;
      border: 1px solid ${token.colorBorderTertiary};
      border-radius: ${token.borderRadiusSM}px;
      cursor: pointer;
    `,

    legendItemDisabled: css`
      background-color: ${token.colorBorderTertiary};
      opacity: 0.5;
    `,

    circle: css`
      margin-right: ${token.marginXXS}px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    `
  }
})
