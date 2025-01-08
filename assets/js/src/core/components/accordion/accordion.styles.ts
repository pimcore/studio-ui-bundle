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
    ...token
  }

  return {
    accordion: css`
        border: none;

        &.ant-collapse-borderless.accordion--spaced {
            > .ant-collapse-item:last-child {
                > .ant-collapse-header[aria-expanded='false'] {
                    border-radius: ${themeToken.borderRadiusLG}px;
                }

                > .ant-collapse-header[aria-expanded='true'] {
                    border-top-left-radius: ${themeToken.borderRadiusLG}px;
                    border-top-right-radius: ${themeToken.borderRadiusLG}px;
                }
            }
        }

        .ant-collapse-item.accordion__item--theme-success {
            border: 1px solid ${themeToken.highlightBorderColor};
            background-color: ${themeToken.highlightBackgroundColor};
            border-radius: ${themeToken.borderRadiusLG}px !important;

            > .ant-collapse-content {
                border-top: 1px solid ${themeToken.highlightBorderColor};
                background-color: transparent;
            }
        }

        .ant-collapse-item.accordion__item--theme-primary {
            border: 1px solid ${themeToken.colorBorder};
            border-radius: ${themeToken.borderRadiusLG}px !important;
            background-color: ${themeToken.colorFillAlter};

            > .ant-collapse-content {
                border-top: 1px solid ${themeToken.colorBorder};
                background-color: transparent;
            }
        }

        .accordion__item {
          + .accordion__item {
            margin-top: ${token.marginXS}px;
          }
          
            > .ant-collapse-header {
                display: inline-flex;
                width: 100%;
                align-items: baseline;

                > .ant-collapse-header-text {
                    margin-inline-end: 0;
                }

                > .ant-collapse-expand-icon {
                    display: none;
                }
            }

            .accordion__chevron-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 ${token.marginXXS}px;
            }

            .accordion__chevron {
                rotate: 180deg;
                transition-duration: 0.6s;
                transition-property: transform;
            }

            .accordion__chevron--up {
                transform: rotate(-180deg);
            }
        }

        .ant-collapse-extra {
            order: 1;
            margin-left: 5px;
        }
    `,
    table: css`
      width: min-content;
      min-width: 100%;

      .ant-collapse-item .ant-collapse-content .ant-collapse-content-box {
        padding: 0;
      }

      .ant-table {
        table {
          border: 0;
          border-radius: 0;

          th {
            padding: ${token.paddingXXS}px ${token.paddingXS}px !important;
          }
        }

        .ant-table-thead {
          th:first-child {
            border-left: 0;
          }
          tr:first-child th:first-child {
            border-top-left-radius: 0;
          }
          tr:first-child th:last-child {
            border-top-right-radius: 0;
          }
        }

        .ant-table-tbody {
          td:first-child {
            border-left: 0;
          }

          .ant-table-row:last-of-type {
            .ant-table-cell:first-of-type {
              border-bottom-left-radius: 0;
            }

            .ant-table-cell:last-of-type {
              border-bottom-right-radius: 0;
            }

            .ant-table-cell {
              border-bottom: 0;
            }
          }
        }
      }
    `,
    bordered: css`
      background: ${token.colorBgContainer};
      
      &.accordion--bordered {
        .ant-collapse-item {
          background: ${token.colorBgContainer};
          border: 1px solid ${token.colorBorderSecondary};
          border-radius: ${token.borderRadius}px;
        }
        
        .ant-collapse-header {
          font-weight: ${token.fontWeightStrong};
        }

        .accordion-item__header-info {
          font-weight: 400;
          color: ${token.colorTextSecondary};
        }

        .ant-collapse-content {
          border-color: ${token.colorBorderSecondary};
        }
        
        &.ant-collapse-small {
          .ant-collapse-item {
            border-radius: ${token.borderRadiusSM}px;
          }
          
          .ant-collapse-header {
            padding: ${token.paddingXXS}px ${token.paddingSM}px;
          }
        }
      }
    `,
    spaced: css`
      background: ${token.colorBgContainer};

      .accordion__item {
        margin-bottom: 24px;
        border-bottom: none;
      }

      .ant-collapse-header[aria-expanded='false'] {
        background-color: ${token.colorBgSelectedTab};
        border: 1px solid ${token.colorBorder};
        border-radius: 5px;
      }

      .ant-collapse-header[aria-expanded='true'] {
        background-color: ${token.colorBgSelectedTab};
        border: 1px solid ${token.colorBorder};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .ant-collapse-content-box {
        border: 1px solid ${token.colorBorder};
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: ${token.colorBgSelectedTab};
      }
    `
  }
})
