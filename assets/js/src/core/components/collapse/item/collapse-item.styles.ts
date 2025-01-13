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

export const useStyles = createStyles(({ css, token }) => {
  const themeToken = {
    highlightBackgroundColor: '#F6FFED',
    highlightBorderColor: '#B7EB8F',
    highlightColor: '#52C41A',
    headerBgColor: 'rgba(0, 0, 0, 0.04)',
    ...token
  }

  return {
    'collapse-item': css`
      &.ant-collapse {
        background: transparent;
        border: none;

        &.ant-collapse-small >.ant-collapse-item >.ant-collapse-header {
          display: flex;
          min-height: 38px;
          padding: ${token.paddingXXS}px ${token.paddingSM}px;
          align-items: center;
        }

        &>.ant-collapse-item >.ant-collapse-header {
          .button--type-action {
            margin-bottom: -4px;
          }
        }

        .collapse-header__title-container {
          flex-grow: 0;
        }

        .collapse-header__extra {
          flex-grow: 1;
        }

        .ant-collapse-content {
          border: none;
          background-color: transparent;
          padding: 0;
        }

        .ant-collapse-content>.ant-collapse-content-box {
          padding: 0;
        }

        &.collapse-item--theme-card-with-highlight,
        &.collapse-item--theme-default {
          background-color: ${themeToken.colorBgContainer};

          &.collapse-item--bordered {
            border: 1px solid ${token.colorBorderSecondary};
          }
          
          &.collapse-item--separator .ant-collapse-content {
            border-top: 1px solid ${themeToken.colorBorderSecondary};
          }
        }

        &.collapse-item--theme-card-with-highlight {          
          &.collapse-item--separator .ant-collapse-content {
            border-top: 1px solid ${themeToken.colorPrimaryBorder};
          }
        }

        &.collapse-item--theme-success {
          background-color: ${themeToken.highlightBackgroundColor};

          &.collapse-item--bordered {
            border: 1px solid ${themeToken.highlightBorderColor};
          }
          
          &.collapse-item--separator .ant-collapse-content {
            border-top: 1px solid ${themeToken.highlightBorderColor};
          }
        }

        &.collapse-item--theme-primary {
          background-color: ${themeToken.colorFillAlter};

          &.collapse-item--bordered {
            border: 1px solid ${themeToken.colorBorder};
          }
          
          &.collapse-item--separator .ant-collapse-content {
            border-top: 1px solid ${themeToken.colorBorder};
          }
        }

        &.collapse-item--theme-simple {
          background-color: ${themeToken.headerBgColor};

          &.collapse-item--bordered {
            border: 1px solid ${themeToken.headerBgColor};
          }

          .ant-collapse-content {
            background-color: white;
          }
        }

        &.collapse-item--theme-fieldset {
          // @todo check for tokens
          background-color: rgba(242, 240, 244, 0.52);
          border-left: 3px solid #D5CFDA;
        }
      }
    `
  }
})
