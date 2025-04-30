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
    block: css`
      position: relative;
      
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-color: ${token.Divider.colorSplit};
      }
    `,

    blockItemWrapperHighlighted: css`
      background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
    `,

    blockItem: css`
      margin-left: 5px;
    `,

    divider: css`
      width: calc(100% - ${token.marginXS * 2}px);
      min-width: calc(100% - ${token.marginXS * 2}px);
      margin: 10px ${token.marginXS}px;
    `
  }
})
