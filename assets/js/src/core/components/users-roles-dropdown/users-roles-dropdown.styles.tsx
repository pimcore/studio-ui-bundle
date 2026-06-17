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
    dropdown: css`
      position: absolute;
      width: 360px;
      background-color: ${token.colorBgContainer};
      box-shadow: ${token.boxShadowSecondary};
      z-index: 1;
      border-radius: ${token.borderRadius}px;
    `,

    dropdownBottom: css`
      top: 35px;
    `,

    dropdownTop: css`
      bottom: 35px;
    `,

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
        width: 100%;
      }

      .ant-tabs-tab {
        flex: 1;
        justify-content: center;
        margin: 0 !important;
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
      justify-content: flex-start;
      padding: 0 ${token.paddingSM}px;
      margin-top: ${token.paddingXXS}px;
      margin-bottom: ${token.paddingXXS}px;
      width: 100%;
      color: ${token.colorTextSecondary};
      cursor: pointer;
    `
  }
})
