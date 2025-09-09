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
    sliderContainer: css`
      flex: 1;
      min-width: 200px;
      padding: 0 ${token.paddingSM}px;
    `,

    sliderWrapper: css`
      position: relative;
    `,

    markerOverlay: css`
      position: absolute;
      top: -10px;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      background-color: transparent;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `
  }
})
