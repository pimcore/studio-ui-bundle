/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    tabs: css`
      .ant-tabs-nav .ant-tabs-tab {
        padding-left: ${token.paddingXXS}px;
        padding-right: ${token.paddingXXS}px;

        + .ant-tabs-tab {
          margin-left: ${token.marginXXS}px;
        }
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
      
      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-remove {
        opacity: 1;
      }
      
      &.ant-tabs-line > .ant-tabs-nav .ant-tabs-ink-bar {
        visibility: visible;
      }
    `
  }
}, { hashPriority: 'high' })
