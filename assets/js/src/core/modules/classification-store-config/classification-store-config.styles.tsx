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
    sidebarStoreItem: css`
      padding: 2px ${token.paddingXS}px;

      &:hover {
        background-color: ${token.controlItemBgActiveHover};
        cursor: pointer;
      }
    `,

    sidebarStoreItemActive: css`
      background-color: ${token.controlItemBgActive};
    `,

    sidebarStoreItemIcon: css`
      color: ${token.colorIconTree};
    `,

    sidebarStoreItemTitle: css`
      color: ${token.colorTextTreeElement};
    `,

    tabsContainer: css`
      height: 100%;

      .ant-tabs-content,
      .ant-tabs-tabpane {
        height: 100%;
      }
    `,

    tabs: css`
      .ant-tabs-tab {
        padding: ${token.paddingSM}px ${token.paddingXXS}px !important;
      }
    `,

    storeEditorTabsContainer: css`
      height: 100%;
      display: flex;
      flex-direction: column;

      .ant-tabs-content-holder {
        flex: 1;
        overflow: hidden;
      }

      .ant-tabs-content,
      .ant-tabs-tabpane {
        height: 100%;
      }
    `,

    tabContent: css`
      height: 100%;
      overflow: auto;
      padding: ${token.paddingMD}px;
    `
  }
})
