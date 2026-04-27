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
    tree: css`
      .ant-tree-treenode {
        height: 24px;
      }

      .ant-tree-switcher {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px !important;
        margin-right: 0 !important;
      }

      .ant-tree-switcher-noop {
        width: 0 !important;
      }

      .ant-tree-node-content-wrapper {
        padding-left: 0 !important;
      }
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

    dropdownButton: css`
      padding: 0 ${token.paddingXS}px;
    `
  }
})
