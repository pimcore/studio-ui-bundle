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
    stackListItem: css`
      border-radius: 4px;
      border: 1px solid ${token.colorBorderSecondary};
      background-color: ${token.colorBgContainer};

      .stack-list-item__title {
        display: flex;
        align-items: center;
        padding: ${token.paddingXXS}px ${token.paddingXS}px;

        /* the drag handle carries its own inset — keep it flush */
        &:has(> .ant-btn:first-child) {
          padding-left: 0;
        }
      }

      .stack-list-item__body {
        padding: 0 ${token.paddingXS}px ${token.paddingXS}px;
        
        .ant-picker {
          width: 100%;
        }

        > .ant-form-item:last-child,
        > * > .ant-form-item:last-child {
          margin-bottom: 0;
        }
      }

      .stack-list-item__content {
        flex: 1;
        min-width: 0; // allows the content to shrink and enables text ellipsis

        .ant-tag {
          margin-inline-end: 0;
        }
      }

      &.stack-list-item {
        .ant-collapse.ant-collapse-small>.ant-collapse-item>.ant-collapse-header {
          padding: 0 ${token.paddingXS}px 0 0;
        }

        .ant-collapse.collapse-item--theme-card-with-highlight.collapse-item--bordered, .ant-collapse.collapse-item--theme-default.collapse-item--bordered {
          border: none;
        }

        .ant-collapse .ant-collapse-item:last-child {
          border: none;
        }
      }
    `
  }
})
