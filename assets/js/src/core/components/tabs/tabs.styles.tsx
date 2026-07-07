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
    tabs: css`
      .ant-tabs-nav .ant-tabs-tab {
        padding-left: ${token.paddingXXS}px;
        padding-right: ${token.paddingXXS}px;

        + .ant-tabs-tab {
          margin-left: ${token.marginSM}px;
        }
      }

      .ant-tabs-nav .ant-tabs-tab .ant-tabs-tab-btn {
        display: flex;
        align-items: center;

        & > * {
          display: flex;
          height: 100%;
        }
      }

      .ant-tabs-nav .ant-tabs-tab button {
        color: ${token.itemColor};
      }

      .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn button {
        color: ${token.itemActiveColor} !important;
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

      &.tabs--no-padding .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab {
        margin-left: 0;
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

      &.ant-tabs .ant-tabs-tab-btn .ant-tabs-tab-icon:not(:last-child) {
        margin-inline-end: ${token.marginXS}px;
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
        transition: left ${token.motionDurationMid} ease, right ${token.motionDurationMid} ease, width ${token.motionDurationMid} ease, transform ${token.motionDurationMid} ease;
      }

      &.tabs--full-height {
        display: flex;
        flex-direction: column;
        height: 100%;

        .ant-tabs-content-holder {
          flex: 1;
          min-height: 0;
          position: relative;
          overflow: hidden;
        }

        .ant-tabs-content {
          position: absolute;
          inset: 0;
        }

        .ant-tabs-tabpane {
          position: relative;
          height: 100%;
          overflow: hidden;
        }
      }

      &.tabs--equal-width {
        .ant-tabs-nav-list {
          width: 100%;
          padding-left: 0;
          padding-right: 0;

          .ant-tabs-tab {
            flex: 1;
            justify-content: center;

            + .ant-tabs-tab {
              margin-left: 0;
            }
          }
        }
      }
    `,
    middleClickButton: css`
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      cursor: inherit;
    `
  }
}, { hashPriority: 'high' })
