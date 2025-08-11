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

export const useStyles = createStyles(({ token, css }) => {
  return {
    tabs: css`
      .ant-tabs-nav .ant-tabs-tab {
        padding-left: ${token.paddingXXS}px;
        padding-right: ${token.paddingXXS}px;

        + .ant-tabs-tab {
          margin-left: ${token.marginSM}px;
        }
      }

      &.ant-tabs-card.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab {
        padding-left: ${token.paddingXXS}px;
        padding-right: ${token.paddingXXS}px;
      }

      &.tabs--has-sticky-header > .ant-tabs-nav {
        position: sticky;
        top: 0;
        z-index: 99999;
        background: ${token.colorBgContainer};
      }

      &.ant-tabs-top > .ant-tabs-nav {
        margin-bottom: 0;

        & + .ant-tabs-content-holder {
          padding-top: ${token.marginXS}px;
        }
      }

      &.ant-tabs-bottom > .ant-tabs-nav {
        margin-top: 0;

        & + .ant-tabs-content-holder {
          padding-bottom: ${token.marginXS}px;
        }
      }

      .ant-tabs-nav-list {
        padding-left: ${token.paddingXS}px;
        padding-right: ${token.paddingXS}px;
        align-items: center;
      }
      
      &.tabs--no-padding .ant-tabs-nav-list {
        padding-left: 0;
        padding-right: 0;
      }

      &.tabs--no-tab-bar-margin.ant-tabs-top>.ant-tabs-nav+.ant-tabs-content-holder {
        padding-top: 0;
      }

      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab {
        border-radius: 0;
        background: none;
        border: none;
        
        .ant-tabs-tab-remove {
          margin: 0 0 0 ${token.marginXS}px;
          padding: 0;
          opacity: 0;
          font-size: 8px;
        }
      }

      .ant-tabs-tab-active .ant-tabs-tab-btn {
        font-weight: 600;
        text-shadow: none !important;
      }

      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab-remove {
        transition: all ${token.motionDurationSlow};
        width: 0;
        opacity: 0;
      }

      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab:hover .ant-tabs-tab-remove {
        transition-delay: ${token.motionDurationSlow};
      }
      
      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab:hover .ant-tabs-tab-remove,
      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-remove {
        opacity: 1;
        width: 16px;
      }
      
      &.ant-tabs-line > .ant-tabs-nav .ant-tabs-ink-bar {
        visibility: visible;
      }
    `
  }
}, { hashPriority: 'high' })
