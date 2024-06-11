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

const cardToken = {
  highlightBackgroundColor: '#F6FFED',
  highlightBorderColor: '#B7EB8F',
  highlightColor: '#52C41A',
  signalBackgroundColor: '#E6F4FF',
  signalBorderColor: '#91CAFF',
  signalColor: '#1677FF'
}

export const useStyle = createStyles(({ token, css }) => {
  return {
    card: css`
      & .ant-card {
        border: none;  
      }
      
      & .ant-card > .ant-card-head {
        border: none;
        padding: ${token.paddingXS}px ${token.paddingSM}px;
      }

      & .ant-card > .ant-card-body {
        padding: ${token.paddingSM}px;
      }
      
      & .ant-card.card-body__expand > .ant-card-body {
        border-top-right-radius: unset;
        border-top-left-radius: unset;
        display: block; 
      }
      
      & .ant-card.card-body__expand > .ant-card-head {
        border-bottom: unset;
        border-bottom-right-radius: unset;
        border-bottom-left-radius: unset;
      }

      
      & .ant-card.card-body__hide > .ant-card-body {
        display: none;
      }

      & .ant-card:is(.card__is-active, .card__is-published) > :where(.ant-card-head, .ant-card-body) {
        display: block;
        border-radius: ${token.borderRadiusLG}px;
      }
      
      & .ant-card.card__is-active > :where(.ant-card-head, .ant-card-body) {
        border: 1px solid ${token.colorBorder};
        background-color: ${token.colorFillAlter};
      }
      
      & .ant-card.card__is-published > :where(.ant-card-head, .ant-card-body) {
        border: 1px solid ${cardToken.highlightBorderColor};
        background-color: ${cardToken.highlightBackgroundColor};
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
        color: ${token.colorTextDescription};
      }
      
      .chevron {
        rotate: 180deg;
        transition-duration: 0.6s;
        transition-property: transform;
      }
      
      .chevron-up {
        transform: rotate(-180deg);
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
        margin-right: ${token.marginXXS}px;
        padding-top: ${token.paddingXXS}px;
      }

      .btn-publish > .ant-btn-icon {
        vertical-align: middle;
      }
      
      .row-margin {
        margin-top: ${token.marginXS}px;
      }
      
      .date-container {
        margin-top: 3px;
      }
      
      .scheduled-date {
        margin-left: ${token.marginXXS}px;
        color: ${token.colorTextDescription};
      }
    `
  }
}, { hashPriority: 'low' })
