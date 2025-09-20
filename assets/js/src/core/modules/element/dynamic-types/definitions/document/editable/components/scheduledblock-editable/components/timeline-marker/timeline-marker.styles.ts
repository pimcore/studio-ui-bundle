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
    markerOverlay: css`
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      transform: translateY(-12px);
    `,

    markerCircleBase: css`
      width: 12px;
      height: 12px;
      border: 2px solid ${token.colorBgContainer};
      border-radius: 50%;
      transition: all 0.2s ease;
      box-shadow: ${token.boxShadowSecondary};
    `,

    markerCircle: css`
      background-color: ${token.colorBorder};
      
      &:hover {
        background-color: ${token.colorPrimary};
        transform: scale(1.2);
      }
    `,

    markerCircleActive: css`
      background-color: ${token.colorPrimary} !important;

      &:hover {
        transform: scale(1.2);
      }
    `,

    markerTime: css`
      margin-top: 2px;
      font-size: 11px;
      white-space: nowrap;
      color: ${token.colorTextSecondary};
    `
  }
})
