/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => {
  return {
    popupHeader: css`
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: ${token.colorBgElevated};
      margin-bottom: ${token.paddingXXS}px;
    `,

    tabs: css`
      .ant-tabs-nav {
        margin-bottom: 0;
      }

      .ant-tabs-nav-list {
        justify-content: space-around;
        width: 100%;
      }

      .ant-tabs-ink-bar {
        width: 50% !important;
      }

      .ant-tabs-content-holder {
        display: none;
      }
    `,

    clearOption: css`
      display: flex;
      align-items: center;
      gap: ${token.marginXS}px;
      width: 100%;
      min-height: ${token.controlHeight}px;
      padding: ${(token.controlHeight - token.fontSize * token.lineHeight) / 2}px ${token.controlPaddingHorizontal}px;
      font-size: ${token.fontSize}px;
      line-height: ${token.lineHeight};
      color: ${token.colorTextSecondary};
      cursor: pointer;
      border: none;
      background: none;
      transition: background ${token.motionDurationSlow} ease;

      &:hover {
        background-color: ${token.controlItemBgHover};
      }
    `
  }
})
