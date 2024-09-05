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

export const useStyle = createStyles(({ token, css }) => {
  const cardToken = {
    highlightBackgroundColor: '#F6FFED',
    highlightBorderColor: '#B7EB8F',
    highlightColor: '#52C41A',
    signalBackgroundColor: '#E6F4FF',
    signalBorderColor: '#91CAFF',
    signalColor: '#1677FF',
    ...token
  }

  return {
    card: css`
        & .ant-collapse {
            width: 340px;
            border: none;
            background-color: white;
        }

        .ant-collapse {
            > .ant-collapse-item.card__is-active {
                border: 1px solid ${cardToken.colorBorder};
                border-radius: ${cardToken.borderRadiusLG}px;
                background-color: ${cardToken.colorFillAlter};

                > .ant-collapse-content {
                    border-top: 1px solid ${cardToken.colorBorder};
                    background-color: transparent;
                }
            }

           > .ant-collapse-item.card__is-published {
                border: 1px solid ${cardToken.highlightBorderColor};
                border-radius: ${cardToken.borderRadiusLG}px;
                background-color: ${cardToken.highlightBackgroundColor};

                > .ant-collapse-content {
                    border-top: 1px solid ${cardToken.highlightBorderColor};
                    background-color: transparent;
                }
            }
        }
      
            & span, & div, div.anticon, button {
                vertical-align: middle;
            }

            & input.ant-input {
                margin-top: 5px;
            }

            & .ant-checkbox-wrapper {
                margin-right: 6px;
            }

            .ant-card-extra {
                height: 44px;
            }

            .sub-title {
                font-weight: normal;
                margin-right: 4px;
                color: ${cardToken.colorTextDescription};
            }

            .title-tag {
                font-size: 12px;
            }

            .tag-icon {
                position: relative;
                right: 3px;
                bottom: 1px;
            }

            .title-tag__published {
                color: ${cardToken.highlightColor};
                border-color: ${cardToken.highlightBorderColor};
                background-color: ${cardToken.highlightBackgroundColor};
            }

            .title-tag__own-draft {
                color: ${cardToken.signalColor};
                border-color: ${cardToken.signalBorderColor};
                background-color: ${cardToken.signalBackgroundColor};
            }

            .flexbox-start-end {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .id-tag {
                width: 56px;
                height: 22px;

                display: inline-grid;
                justify-content: center;

                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
            }

            .btn-publish {
                margin-right: ${cardToken.marginXXS}px;
                padding-top: ${cardToken.paddingXXS}px;
            }

            .btn-publish > .ant-btn-icon {
                vertical-align: middle;
            }

            .row-margin {
                margin-top: ${cardToken.marginXS}px;
            }

            .date-container {
                margin-top: 3px;
            }

            .scheduled-date {
                margin-left: ${cardToken.marginXXS}px;
                color: ${cardToken.colorTextDescription};
            }
    `
  }
}, { hashPriority: 'low' })
