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
  const themeToken = {
    highlightBackgroundColor: '#F6FFED',
    highlightBorderColor: '#B7EB8F',
    highlightColor: '#52C41A',
    signalBackgroundColor: '#E6F4FF',
    signalBorderColor: '#91CAFF',
    signalColor: '#1677FF',
    ...token
  }

  return {
    accordion: css`
        border: none;

        .ant-collapse-item.success {
            border: 1px solid ${themeToken.highlightBorderColor};
            border-radius: ${themeToken.borderRadiusLG}px !important;
            background-color: ${themeToken.highlightBackgroundColor};

            > .ant-collapse-content {
                border-top: 1px solid ${themeToken.highlightBorderColor};
                background-color: transparent;
            }
        }

        .ant-collapse-item.primary {
            border: 1px solid ${themeToken.colorBorder};
            border-radius: ${themeToken.borderRadiusLG}px !important;
            background-color: ${themeToken.colorFillAlter};
          
            > .ant-collapse-content {
                border-top: 1px solid ${themeToken.colorBorder};
                background-color: transparent;
            }
        }

        .ant-collapse-item {
            > .ant-collapse-header {
                display: inline-flex;
                width: 100%;

                > .ant-collapse-header-text {
                    flex: none;
                    margin-inline-end: 0;
                }

                > .ant-collapse-expand-icon {
                    display: none;
                }

            }

            .card-title__chevron-btn {
                display: flex;
                margin: 0 ${token.marginXXS}px;
            }

            .chevron {
                rotate: 180deg;
                transition-duration: 0.6s;
                transition-property: transform;
            }

            .chevron-up {
                transform: rotate(-180deg);
            }
        }

        .ant-collapse-extra {
            order: 1;
            margin-left: auto;
        }

    `,
    spaced: css`
        background: ${token.colorBgContainer};

      .card {
        margin-bottom: 24px;
      }
      
      .ant-collapse-item {
        border-bottom: none;
      }

      &.ant-collapse-borderless > .ant-collapse-item:last-child, &.ant-collapse-borderless > .ant-collapse-item:last-child .ant-collapse-header {
        border-radius: 5px;
      }

      &.ant-collapse-borderless >.ant-collapse-item:last-child .ant-collapse-header[aria-expanded="true"] {
        border: 1px solid ${token.colorBorder};
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .ant-collapse-header[aria-expanded="false"] {
        background-color: ${token.colorBgSelectedTab};

        border: 1px solid ${token.colorBorder};
        border-radius: 5px;
      }

      .ant-collapse-header[aria-expanded="true"] {
        background-color: ${token.colorBgSelectedTab};

        border: 1px solid ${token.colorBorder};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .ant-collapse-content {
        .ant-collapse-content-box {
          border: 1px solid ${token.colorBorder};
          border-top: none;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          background-color: ${token.colorBgSelectedTab};
        }
      }
    `
  }
})
